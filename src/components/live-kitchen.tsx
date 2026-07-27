"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Play, Eye, Radio, X } from "lucide-react"
import Image from "next/image"

const videos = [
  { id: "sv3TXMSv6Lw", title: "Art of Pizza Making", chef: "Chef Marco" },
  { id: "wpQjnc0O3eM", title: "Pasta Perfection", chef: "Chef Antonio" },
  { id: "5C1H3Rz5gCg", title: "Steak Mastery", chef: "Chef Pierre" },
  { id: "1ISBNdNHEus", title: "Exquisite Desserts", chef: "Chef Tanaka" },
]

export function LiveKitchen() {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <section className="relative section-padding px-4 sm:px-6 lg:px-8" aria-label="Live Kitchen">
      <div className="absolute inset-0 bg-secondary" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          title="Live Kitchen"
          subtitle="Get a behind-the-scenes look at our chefs in action — watch culinary magic unfold in real time"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer bg-primary"
              onClick={() => setPlaying(video.id)}
            >
              {playing === video.id ? (
                <>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={video.title}
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); setPlaying(null) }}
                    className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors z-10"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <>
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center gold-glow-strong shadow-xl"
                    >
                      <Play className="w-7 h-7 text-inverse ml-0.5" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-semibold text-sm">{video.title}</h3>
                    <p className="text-white/70 text-xs mt-0.5">{video.chef}</p>
                  </div>
                </>
              )}
              {index === 0 && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 glass rounded-full px-2.5 py-1 z-10">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-red-500"
                  />
                  <span className="text-xs text-fg-primary font-semibold tracking-wider">LIVE</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
            <Eye className="w-4 h-4 text-fg-primary" />
            <span className="text-sm text-fg-muted">2.4K watching</span>
          </div>
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
            <Radio className="w-4 h-4 text-fg-primary animate-pulse" />
            <span className="text-sm text-fg-muted">Kitchen Cam</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
