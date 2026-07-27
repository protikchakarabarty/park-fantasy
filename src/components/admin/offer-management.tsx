"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, X, Search, Power } from "lucide-react"
import { getAllCoupons, addCoupon, updateCoupon, deleteCoupon } from "@/data/coupons"
import type { Coupon } from "@/data/types"

export function OfferManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>(() => getAllCoupons())
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [form, setForm] = useState<Coupon>({
    code: "", type: "percentage", value: 10, minOrder: 0,
    maxDiscount: undefined, description: "", isActive: true,
  })

  const refresh = () => setCoupons(getAllCoupons())

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditingCoupon(null)
    setForm({ code: "", type: "percentage", value: 10, minOrder: 0, maxDiscount: undefined, description: "", isActive: true })
    setShowForm(true)
  }

  const openEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setForm({
      code: coupon.code, type: coupon.type, value: coupon.value,
      minOrder: coupon.minOrder, maxDiscount: coupon.maxDiscount,
      description: coupon.description, isActive: coupon.isActive,
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.code || !form.value) return
    if (editingCoupon) {
      updateCoupon(editingCoupon.code, form)
    } else {
      addCoupon(form)
    }
    setShowForm(false)
    refresh()
  }

  const handleDelete = (code: string) => {
    if (confirm(`Delete coupon "${code}"?`)) {
      deleteCoupon(code)
      refresh()
    }
  }

  const toggleActive = (coupon: Coupon) => {
    updateCoupon(coupon.code, { isActive: !coupon.isActive })
    refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Offer & Coupon Management</h1>
        <button onClick={openAdd} className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Coupon
        </button>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coupons..."
          className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
      </div>

      <div className="space-y-3">
        {filtered.map((coupon) => (
          <motion.div key={coupon.code} layout className="glass rounded-xl border border-glass-border p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shrink-0">
              <span className="text-xs text-inverse font-bold">{coupon.type === "percentage" ? "%" : "$"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-fg-primary font-mono">{coupon.code}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  coupon.isActive ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
                }`}>
                  {coupon.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-fg-dim mt-0.5">{coupon.description}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-fg-muted">
                <span>{coupon.type === "percentage" ? `${coupon.value}% off` : `$${coupon.value} off`}</span>
                <span>Min: ${coupon.minOrder}</span>
                {coupon.maxDiscount && <span>Max: ${coupon.maxDiscount}</span>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => toggleActive(coupon)} aria-label="Toggle offer" className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                coupon.isActive ? "glass text-green-400" : "glass text-red-400"
              }`}>
                <Power className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => openEdit(coupon)} aria-label="Edit offer" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                <Pencil className="w-3.5 h-3.5 text-fg-muted" />
              </button>
              <button onClick={() => handleDelete(coupon.code)} aria-label="Delete offer" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
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
              className="fixed inset-4 md:inset-auto md:top-[20%] md:bottom-[20%] md:left-[25%] md:right-[25%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Coupon Form">
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <h2 className="text-lg font-bold text-fg-primary">{editingCoupon ? "Edit Coupon" : "Add Coupon"}</h2>
                <button onClick={() => setShowForm(false)} aria-label="Close modal" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Code *</label>
                    <input aria-label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary font-mono focus:outline-none focus:border-fg-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Type</label>
                    <select aria-label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "percentage" | "fixed" })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50">
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Value *</label>
                    <input aria-label="Value" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: parseFloat(e.target.value) || 0 })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Min Order</label>
                    <input aria-label="Min Order" type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: parseFloat(e.target.value) || 0 })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Max Discount</label>
                    <input aria-label="Max Discount" type="number" value={form.maxDiscount || ""} onChange={(e) => setForm({ ...form, maxDiscount: parseFloat(e.target.value) || undefined })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Description</label>
                  <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
                </div>
                <label className="flex items-center gap-2 text-sm text-fg-muted">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-fg-primary" /> Active
                </label>
              </div>
              <div className="border-t border-glass-border p-4 flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 h-11 rounded-xl border border-glass-border text-fg-muted text-sm">Cancel</button>
                <button onClick={handleSave} className="flex-1 h-11 gold-gradient-bg text-inverse rounded-full text-sm font-medium">
                  {editingCoupon ? "Save Changes" : "Add Coupon"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
