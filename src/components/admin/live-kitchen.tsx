"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Pencil, Trash2, X, Video, Upload, Star, StarOff,
  FileVideo,
} from "lucide-react"
import {
  addKitchenVideo, updateKitchenVideo,
  deleteKitchenVideo, setHomepageVideo, kitchenVideosSubscribe,
} from "@/data/live-kitchen"
import type { KitchenVideo } from "@/data/types"

export function LiveKitchen() {
  const [videos, setVideos] = useState<KitchenVideo[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState<KitchenVideo | null>(null)
  const [form, setForm] = useState({
    title: "", description: "", videoUrl: "", thumbnail: "",
    isHomepage: false, isActive: true, duration: "",
  })

  useEffect(() => {
    const unsub = kitchenVideosSubscribe((updated) => {
      setVideos(updated)
    })
    return unsub
  }, [])

  const openAdd = () => {
    setEditingVideo(null)
    setForm({ title: "", description: "", videoUrl: "", thumbnail: "", isHomepage: false, isActive: true, duration: "" })
    setShowForm(true)
  }

  const openEdit = (video: KitchenVideo) => {
    setEditingVideo(video)
    setForm({
      title: video.title, description: video.description,
      videoUrl: video.videoUrl, thumbnail: video.thumbnail,
      isHomepage: video.isHomepage, isActive: video.isActive,
      duration: video.duration,
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.title) return
    if (editingVideo) {
      updateKitchenVideo(editingVideo.id, form)
    } else {
      addKitchenVideo(form)
    }
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this video?")) {
      deleteKitchenVideo(id)
    }
  }

  const handleSetHomepage = (id: string) => {
    setHomepageVideo(id)
  }

  const handleUploadClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "video/*"
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement)?.files?.[0]
      if (file) {
        setForm({ ...form, videoUrl: URL.createObjectURL(file), title: form.title || file.name.replace(/\.[^/.]+$/, "") })
      }
    }
    input.click()
  }

  const homepageVideo = videos.find((v) => v.isHomepage)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-fg-primary">Live Kitchen</h1>
          <p className="text-xs text-fg-dim mt-1">
            {videos.length} video{videos.length !== 1 ? "s" : ""}
            {homepageVideo && ` · Homepage: ${homepageVideo.title}`}
          </p>
        </div>
        <button onClick={openAdd}
          className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Video
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="glass rounded-xl border border-glass-border p-6 sm:p-8 lg:p-12 text-center">
          <Video className="w-16 h-16 text-fg-dim mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-fg-primary mb-2">No Videos Yet</h3>
          <p className="text-sm text-fg-dim mb-6">Upload your first kitchen video to showcase the live cooking experience.</p>
          <button onClick={openAdd}
            className="h-12 px-6 gold-gradient-bg text-inverse rounded-full text-sm font-medium inline-flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              layout
              className={`glass rounded-xl border overflow-hidden ${
                video.isHomepage ? "border-fg-primary" : "border-glass-border"
              }`}
            >
              <div className="relative aspect-video bg-primary-darker flex items-center justify-center">
                {video.videoUrl ? (
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    poster={video.thumbnail || undefined}
                  />
                ) : (
                  <div className="text-center">
                    <FileVideo className="w-12 h-12 text-fg-dim mx-auto mb-2" />
                    <p className="text-xs text-fg-dim">Video placeholder</p>
                    <p className="text-xs text-fg-dim mt-1">Upload video to preview</p>
                  </div>
                )}
                {video.isHomepage && (
                  <div className="absolute top-2 left-2 px-2 py-1 gold-gradient-bg rounded-lg text-xs text-inverse font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Homepage
                  </div>
                )}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 glass rounded-lg text-xs text-fg-primary">
                    {video.duration}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-fg-primary">{video.title}</h3>
                    {video.description && (
                      <p className="text-xs text-fg-dim mt-0.5">{video.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!video.isHomepage && (
                      <button onClick={() => handleSetHomepage(video.id)}
                        className="w-11 h-11 rounded-lg glass flex items-center justify-center"
                        title="Set as homepage video"
                        aria-label="Set as homepage video">
                        <StarOff className="w-3.5 h-3.5 text-fg-dim" />
                      </button>
                    )}
                    <button onClick={() => openEdit(video)}
                      className="w-11 h-11 rounded-lg glass flex items-center justify-center"
                      aria-label="Edit video">
                      <Pencil className="w-3.5 h-3.5 text-fg-muted" />
                    </button>
                    <button onClick={() => handleDelete(video.id)}
                      className="w-11 h-11 rounded-lg glass flex items-center justify-center"
                      aria-label="Delete video">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-fg-dim">
                  Added {new Date(video.createdAt).toLocaleDateString()}
                  {video.isActive ? " · Active" : " · Inactive"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              aria-hidden="true"
              tabIndex={-1}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setShowForm(false)}
              onKeyDown={(e) => { if (e.key === "Escape") setShowForm(false) }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-[15%] md:bottom-[15%] md:left-[25%] md:right-[25%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Kitchen Video">
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <h2 className="text-lg font-bold text-fg-primary">
                  {editingVideo ? "Edit Video" : "Add Kitchen Video"}
                </h2>
                <button onClick={() => setShowForm(false)} aria-label="Close modal" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="glass rounded-xl p-6 text-center border-2 border-dashed border-glass-border">
                  <Upload className="w-10 h-10 text-fg-dim mx-auto mb-3" />
                  <p className="text-sm text-fg-primary font-medium mb-1">Upload Video</p>
                  <p className="text-xs text-fg-dim mb-3">Click to browse or drag and drop</p>
                  <button onClick={handleUploadClick}
                    className="h-9 px-4 gold-gradient-bg text-inverse rounded-full text-xs font-medium inline-flex items-center gap-1">
                    <Upload className="w-3 h-3" /> Choose File
                  </button>
                  {form.videoUrl && (
                    <p className="text-xs text-green-400 mt-2">Video selected ✓</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Chef's Special Preparation"
                    aria-label="Title"
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe what's happening in this video..."
                    aria-label="Description"
                    className="w-full rounded-xl border border-glass-border bg-glass px-3 py-2 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50 resize-none h-20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Duration</label>
                    <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      placeholder="e.g. 2:30"
                      aria-label="Duration"
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Thumbnail URL</label>
                    <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                      placeholder="/images/thumbnail.jpg"
                      aria-label="Thumbnail URL"
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={form.isHomepage}
                      onChange={(e) => setForm({ ...form, isHomepage: e.target.checked })}
                      className="accent-fg-primary" /> Set as homepage video
                  </label>
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="accent-fg-primary" /> Active
                  </label>
                </div>
              </div>
              <div className="border-t border-glass-border p-4 flex gap-3">
                <button onClick={() => setShowForm(false)}
                  className="flex-1 h-11 rounded-xl border border-glass-border text-fg-muted text-sm">Cancel</button>
                <button onClick={handleSave}
                  className="flex-1 h-11 gold-gradient-bg text-inverse rounded-full text-sm font-medium">
                  {editingVideo ? "Save Changes" : "Add Video"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
