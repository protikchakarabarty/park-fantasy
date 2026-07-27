"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin } from "lucide-react"
import type { DeliveryAddress } from "@/data/types"

interface DeliveryAddressProps {
  address: DeliveryAddress
  onChange: (address: DeliveryAddress) => void
}

export function DeliveryAddressForm({ address, onChange }: DeliveryAddressProps) {
  const update = (key: keyof DeliveryAddress, value: string) => {
    onChange({ ...address, [key]: value })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-fg-primary">Delivery Address</h3>

      <div className="glass rounded-xl border border-glass-border p-3 space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-fg-primary" />
          <span className="text-fg-muted">District:</span>
          <span className="text-fg-primary font-medium">Jessore</span>
        </div>
        {address.upazila && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-fg-dim" />
            <span className="text-fg-muted">Upazila:</span>
            <span className="text-fg-primary">{address.upazila}</span>
          </div>
        )}
        {address.area && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-fg-dim" />
            <span className="text-fg-muted">Area:</span>
            <span className="text-fg-primary">{address.area}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-fg-muted">Full Name</label>
          <Input aria-label="Full Name" value={address.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-fg-muted">Phone</label>
          <Input aria-label="Phone" value={address.phone} onChange={(e) => update("phone", e.target.value)} placeholder="01XXXXXXXXX" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-fg-muted">Street / Village / Road</label>
        <Input aria-label="Street / Village / Road" value={address.street} onChange={(e) => update("street", e.target.value)} placeholder="House #, Road #, Village name" />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-fg-muted">Delivery Instructions (optional)</label>
        <Textarea aria-label="Delivery Instructions" value={address.instructions || ""} onChange={(e) => update("instructions", e.target.value)} placeholder="Landmarks, special directions, etc." />
      </div>
    </div>
  )
}
