"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, X, MapPin, Power, Search } from "lucide-react"
import { getDeliveryAreas, addDeliveryArea, updateDeliveryArea, deleteDeliveryArea, toggleAreaActive } from "@/data/delivery-zones"
import { JESSORE_UPAZILAS } from "@/data/types"
import type { DeliveryArea } from "@/data/types"

export function DeliveryManagement() {
  const [areas, setAreas] = useState<DeliveryArea[]>(() => getDeliveryAreas())
  const [search, setSearch] = useState("")
  const [filterUpazila, setFilterUpazila] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<DeliveryArea | null>(null)
  const [form, setForm] = useState({ name: "", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: false })

  const refresh = useCallback(() => setAreas(getDeliveryAreas()), [])

  const filtered = useMemo(() =>
    areas.filter((a) => {
      const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.upazila.toLowerCase().includes(search.toLowerCase())
      const matchUpazila = !filterUpazila || a.upazila === filterUpazila
      return matchSearch && matchUpazila
    }), [areas, search, filterUpazila])

  const openAdd = () => {
    setEditing(null)
    setForm({ name: "", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: false })
    setShowForm(true)
  }

  const openEdit = (area: DeliveryArea) => {
    setEditing(area)
    setForm({ name: area.name, upazila: area.upazila, fee: area.fee, isActive: area.isActive, insideMunicipality: area.insideMunicipality })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.upazila) return
    if (editing) {
      updateDeliveryArea(editing.id, form)
    } else {
      addDeliveryArea(form)
    }
    setShowForm(false)
    refresh()
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this delivery area?")) {
      deleteDeliveryArea(id)
      refresh()
    }
  }

  const handleToggle = (id: string) => {
    toggleAreaActive(id)
    refresh()
  }

  const stats = useMemo(() => {
    const active = areas.filter((a) => a.isActive)
    const municipality = areas.filter((a) => a.insideMunicipality)
    return { total: areas.length, active: active.length, municipality: municipality.length }
  }, [areas])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Delivery Areas</h1>
        <button onClick={openAdd} className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Area
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-xl border border-glass-border p-4">
          <p className="text-2xl font-bold text-fg-primary">{stats.total}</p>
          <p className="text-xs text-fg-dim">Total Areas</p>
        </div>
        <div className="glass rounded-xl border border-glass-border p-4">
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          <p className="text-xs text-fg-dim">Active Areas</p>
        </div>
        <div className="glass rounded-xl border border-glass-border p-4">
          <p className="text-2xl font-bold text-fg-primary">{stats.municipality}</p>
          <p className="text-xs text-fg-dim">Municipality Areas</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search areas..."
            className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
        </div>
        <select aria-label="Filter by upazila" value={filterUpazila} onChange={(e) => setFilterUpazila(e.target.value)}
          className="h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50">
          <option value="">All Upazilas</option>
          {JESSORE_UPAZILAS.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        {filterUpazila && (
          <button onClick={() => setFilterUpazila("")} className="h-10 px-3 rounded-xl border border-glass-border text-xs text-fg-dim hover:text-fg-primary flex items-center gap-1">
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-fg-dim mx-auto mb-3" />
            <p className="text-sm text-fg-dim">No areas found</p>
          </div>
        )}
        {filtered.map((area, i) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className={`glass rounded-xl border p-4 flex items-center gap-4 ${area.isActive ? "border-glass-border" : "border-red-400/20 opacity-60"}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${area.insideMunicipality ? "gold-gradient-bg" : "glass"}`}>
              <MapPin className={`w-5 h-5 ${area.insideMunicipality ? "text-inverse" : "text-fg-primary"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-fg-primary">{area.name}</h3>
                {area.insideMunicipality && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/10 text-green-400">Municipality</span>
                )}
                {!area.isActive && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-400/10 text-red-400">Disabled</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-fg-muted mt-0.5">
                <span>{area.upazila}</span>
                <span>Fee: ৳{area.fee}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => handleToggle(area.id)}
                aria-label="Toggle delivery zone"
                className={`w-11 h-11 rounded-lg flex items-center justify-center ${area.isActive ? "glass text-green-400" : "glass text-red-400"}`}>
                <Power className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => openEdit(area)} aria-label="Edit zone" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                <Pencil className="w-3.5 h-3.5 text-fg-muted" />
              </button>
              <button onClick={() => handleDelete(area.id)} aria-label="Delete zone" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

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
              className="fixed inset-4 md:inset-auto md:top-[20%] md:bottom-[20%] md:left-[30%] md:right-[30%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Delivery Zone Form">
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <h2 className="text-lg font-bold text-fg-primary">{editing ? "Edit Area" : "Add Delivery Area"}</h2>
                <button onClick={() => setShowForm(false)} aria-label="Close modal" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Area Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Upazila *</label>
                  <select aria-label="Upazila" value={form.upazila} onChange={(e) => setForm({ ...form, upazila: e.target.value })}
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50">
                    {JESSORE_UPAZILAS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Delivery Fee (৳)</label>
                  <input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: parseInt(e.target.value) || 0 })}
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                </div>
                <label className="flex items-center gap-2 text-sm text-fg-muted">
                  <input type="checkbox" checked={form.insideMunicipality}
                    onChange={(e) => setForm({ ...form, insideMunicipality: e.target.checked })}
                    className="accent-fg-primary" />
                  Inside Jessore Municipality (flat ৳40 rate)
                </label>
                <label className="flex items-center gap-2 text-sm text-fg-muted">
                  <input type="checkbox" checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="accent-fg-primary" /> Active
                </label>
              </div>
              <div className="border-t border-glass-border p-4 flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 h-11 rounded-xl border border-glass-border text-fg-muted text-sm">Cancel</button>
                <button onClick={handleSave} className="flex-1 h-11 gold-gradient-bg text-inverse rounded-full text-sm font-medium">
                  {editing ? "Save Changes" : "Add Area"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
