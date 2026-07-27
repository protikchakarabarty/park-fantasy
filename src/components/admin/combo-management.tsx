"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, X, Search } from "lucide-react"
import { getCombos, addCombo, updateCombo, deleteCombo } from "@/data/combos"
import { getProducts } from "@/data/products"
import type { Combo } from "@/data/types"

export function ComboManagement() {
  const [combos, setCombos] = useState<Combo[]>(() => getCombos())
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null)
  const [form, setForm] = useState<Omit<Combo, "id">>({
    name: "", description: "", price: 0, originalPrice: undefined,
    emoji: "🍽️", image: "/images/combo-default.jpg",
    items: [], category: "Family Deals", isAvailable: true, isFeatured: false,
    savings: 0, badge: "",
  })
  const allProducts = getProducts()

  const refresh = () => setCombos(getCombos())

  const filtered = combos.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditingCombo(null)
    setForm({
      name: "", description: "", price: 0, originalPrice: undefined,
      emoji: "🍽️", image: "/images/combo-default.jpg",
      items: [], category: "Family Deals", isAvailable: true, isFeatured: false,
      savings: 0, badge: "",
    })
    setShowForm(true)
  }

  const openEdit = (combo: Combo) => {
    setEditingCombo(combo)
    setForm({
      name: combo.name, description: combo.description, price: combo.price,
      originalPrice: combo.originalPrice, emoji: combo.emoji, image: combo.image,
      items: [...combo.items], category: combo.category, isAvailable: combo.isAvailable,
      isFeatured: combo.isFeatured, savings: combo.savings, badge: combo.badge || "",
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    if (editingCombo) {
      updateCombo(editingCombo.id, form)
    } else {
      addCombo(form)
    }
    setShowForm(false)
    refresh()
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this combo?")) {
      deleteCombo(id)
      refresh()
    }
  }

  const toggleItem = (productId: string) => {
    setForm({
      ...form,
      items: form.items.includes(productId)
        ? form.items.filter((id: string) => id !== productId)
        : [...form.items, productId],
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Combo Management</h1>
        <button onClick={openAdd} className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Combo
        </button>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search combos..."
          className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((combo) => (
          <motion.div key={combo.id} layout className="glass rounded-xl border border-glass-border p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl shrink-0">{combo.emoji}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-fg-primary truncate">{combo.name}</h3>
                <p className="text-xs text-fg-dim">{combo.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(combo)} aria-label="Edit combo" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                  <Pencil className="w-3.5 h-3.5 text-fg-muted" />
                </button>
                <button onClick={() => handleDelete(combo.id)} aria-label="Delete combo" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-fg-muted mb-1">
              <span className="font-semibold text-fg-primary">${combo.price.toFixed(2)}</span>
              {combo.originalPrice && <span className="line-through">${combo.originalPrice.toFixed(2)}</span>}
              {combo.savings > 0 && <span className="text-fg-primary ml-auto">Save ${combo.savings}</span>}
            </div>
            <p className="text-xs text-fg-dim line-clamp-2">{combo.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {combo.items.map((itemId) => {
                const product = allProducts.find((p) => p.id === itemId)
                return product ? (
                  <span key={itemId} className="text-xs px-2 py-0.5 rounded-full glass text-fg-dim">
                    {product.emoji} {product.name}
                  </span>
                ) : null
              })}
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
              className="fixed inset-4 md:inset-auto md:top-[5%] md:bottom-[5%] md:left-[20%] md:right-[20%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Combo Form">
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <h2 className="text-lg font-bold text-fg-primary">{editingCombo ? "Edit Combo" : "Add Combo"}</h2>
                <button onClick={() => setShowForm(false)} aria-label="Close modal" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Name *</label>
                    <input aria-label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Emoji</label>
                    <input aria-label="Emoji" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Description</label>
                  <textarea aria-label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-xl border border-glass-border bg-glass px-3 py-2 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50 resize-none h-20" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Price *</label>
                    <input aria-label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Original Price</label>
                    <input aria-label="Original Price" type="number" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: parseFloat(e.target.value) || undefined })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Category</label>
                    <input aria-label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} className="accent-fg-primary" /> Available
                  </label>
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-fg-primary" /> Featured
                  </label>
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Badge</label>
                  <input aria-label="Badge" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-2 block">Select Items</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {allProducts.map((p) => (
                      <button key={p.id} onClick={() => toggleItem(p.id)}
                        className={`text-left px-3 py-2 rounded-xl text-xs border transition-all ${
                          form.items.includes(p.id)
                            ? "border-fg-primary bg-fg-primary/10 text-fg-primary"
                            : "border-glass-border glass text-fg-muted hover:text-fg-primary"
                        }`}>
                        {p.emoji} {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-glass-border p-4 flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 h-11 rounded-xl border border-glass-border text-fg-muted text-sm">Cancel</button>
                <button onClick={handleSave} className="flex-1 h-11 gold-gradient-bg text-inverse rounded-full text-sm font-medium">
                  {editingCombo ? "Save Changes" : "Add Combo"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
