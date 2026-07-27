"use client"

import { useState } from "react"
import { Plus, MapPin, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth"
import type { SavedAddress } from "@/data/types"

const emptyAddress = {
  label: "",
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  instructions: "",
  zoneId: "",
  isDefault: false,
}

export function SavedAddresses() {
  const { user, addAddress, updateAddress, deleteAddress } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Omit<SavedAddress, "id">>(emptyAddress)

  if (!user) return null

  const resetForm = () => {
    setForm(emptyAddress)
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = () => {
    if (editingId) {
      updateAddress({ ...form, id: editingId })
    } else {
      addAddress(form)
    }
    resetForm()
  }

  const handleEdit = (addr: SavedAddress) => {
    setForm({
      label: addr.label,
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      instructions: addr.instructions || "",
      zoneId: addr.zoneId || "",
      isDefault: addr.isDefault,
    })
    setEditingId(addr.id)
    setShowForm(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider">Saved Addresses</h3>
        <Button size="sm" variant="outline" onClick={() => { resetForm(); setShowForm(!showForm) }}>
          <Plus className="w-3.5 h-3.5 mr-1" /> {showForm ? "Cancel" : "Add"}
        </Button>
      </div>

      {showForm && (
        <div className="glass rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Label (Home, Office)" aria-label="Address label" />
            <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" aria-label="Full name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" aria-label="Phone" />
            <Input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="Street Address" aria-label="Street address" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" aria-label="City" />
            <Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State" aria-label="State" />
            <Input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="ZIP" aria-label="ZIP code" />
          </div>
          <Textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} placeholder="Delivery instructions (optional)" aria-label="Delivery instructions" />
          <label className="flex items-center gap-2 text-sm text-fg-dim">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} className="accent-fg-primary" />
            Set as default address
          </label>
          <Button size="sm" onClick={handleSave} className="w-full">
            {editingId ? "Update Address" : "Save Address"}
          </Button>
        </div>
      )}

      {user.savedAddresses.length === 0 && !showForm && (
        <div className="text-center py-8">
          <MapPin className="w-10 h-10 text-fg-dim mx-auto mb-2" />
          <p className="text-sm text-fg-dim">No saved addresses yet</p>
        </div>
      )}

      {user.savedAddresses.map((addr) => (
        <div key={addr.id} className="glass rounded-xl p-4 relative group">
          {addr.isDefault && <Star className="absolute top-3 right-3 w-3.5 h-3.5 text-fg-primary fill-fg-primary" />}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-fg-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-fg-primary">{addr.label}</span>
                {addr.isDefault && <span className="text-xs text-fg-dim">Default</span>}
              </div>
              <p className="text-xs text-fg-dim">{addr.fullName}</p>
              <p className="text-xs text-fg-dim">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
              {addr.instructions && <p className="text-xs text-fg-dim mt-1 italic">{addr.instructions}</p>}
            </div>
            <button onClick={() => deleteAddress(addr.id)} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors opacity-0 group-hover:opacity-100 shrink-0" aria-label={`Delete ${addr.label} address`}>
              <Trash2 className="w-3 h-3 text-fg-dim" />
            </button>
          </div>
          <button onClick={() => handleEdit(addr)} className="mt-2 text-xs text-fg-dim hover:text-fg-primary transition-colors">Edit</button>
        </div>
      ))}
    </div>
  )
}
