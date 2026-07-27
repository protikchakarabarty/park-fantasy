"use client"

import { useState } from "react"
import { Save, RotateCcw, Power, Globe, Phone, Mail, MapPin, Clock } from "lucide-react"
import { loadSiteSettings, updateSiteSettings, toggleRestaurantStatus, resetSiteSettings } from "@/data/site-settings"
import type { SiteSettings } from "@/data/types"

export function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(() => loadSiteSettings())
  const [saved, setSaved] = useState(false)

  if (!settings) return null

  const handleSave = () => {
    if (settings) {
      updateSiteSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const handleReset = () => {
    if (confirm("Reset all settings to defaults?")) {
      setSettings(resetSiteSettings())
    }
  }

  const handleToggle = () => {
    setSettings(toggleRestaurantStatus())
  }

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings({ ...settings, [key]: value } as SiteSettings)
  }

  const updateHour = (idx: number, field: "open" | "close", value: string) => {
    const hours = [...settings.openingHours]
    hours[idx] = { ...hours[idx], [field]: value }
    update("openingHours", hours)
  }

  const updateSocial = (idx: number, field: "platform" | "url", value: string) => {
    const links = [...settings.socialLinks]
    links[idx] = { ...links[idx], [field]: value }
    update("socialLinks", links)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Website Settings</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="h-10 px-4 rounded-xl border border-glass-border text-fg-muted text-sm flex items-center gap-2 hover:text-fg-primary">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button onClick={handleSave} className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90">
            <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> General</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Restaurant Name</label>
              <input aria-label="Restaurant Name" value={settings.restaurantName} onChange={(e) => update("restaurantName", e.target.value)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Tagline</label>
              <input aria-label="Tagline" value={settings.tagline} onChange={(e) => update("tagline", e.target.value)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Description</label>
              <textarea aria-label="Description" value={settings.description} onChange={(e) => update("description", e.target.value)}
                className="w-full rounded-xl border border-glass-border bg-glass px-3 py-2 text-sm text-fg-primary resize-none h-20" />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Contact & Address</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-fg-muted mb-1 block flex items-center gap-1"><MapPin className="w-3 h-3" /> Address</label>
              <input aria-label="Address" value={settings.address} onChange={(e) => update("address", e.target.value)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-fg-muted mb-1 block flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</label>
                <input aria-label="Phone" value={settings.phone} onChange={(e) => update("phone", e.target.value)}
                  className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
              </div>
              <div>
                <label className="text-xs text-fg-muted mb-1 block flex items-center gap-1"><Mail className="w-3 h-3" /> Email</label>
                <input aria-label="Email" value={settings.email} onChange={(e) => update("email", e.target.value)}
                  className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Opening Hours</h2>
          <div className="space-y-3">
            {settings.openingHours.map((hour, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-fg-muted w-32">{hour.day}</span>
                <input aria-label={`${hour.day} open time`} value={hour.open} onChange={(e) => updateHour(i, "open", e.target.value)}
                  className="w-24 h-9 rounded-xl border border-glass-border bg-glass px-3 text-xs text-fg-primary text-center" />
                <span className="text-xs text-fg-dim">to</span>
                <input aria-label={`${hour.day} close time`} value={hour.close} onChange={(e) => updateHour(i, "close", e.target.value)}
                  className="w-24 h-9 rounded-xl border border-glass-border bg-glass px-3 text-xs text-fg-primary text-center" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Social Links</h2>
          <div className="space-y-3">
            {settings.socialLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <input aria-label={`Social platform ${i + 1}`} value={link.platform} onChange={(e) => updateSocial(i, "platform", e.target.value)}
                  className="w-28 h-9 rounded-xl border border-glass-border bg-glass px-3 text-xs text-fg-primary" />
                <input aria-label={`Social URL ${i + 1}`} value={link.url} onChange={(e) => updateSocial(i, "url", e.target.value)}
                  className="flex-1 h-9 rounded-xl border border-glass-border bg-glass px-3 text-xs text-fg-primary" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Delivery Settings</h2>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Delivery Radius (km)</label>
              <input aria-label="Delivery Radius" type="number" value={settings.deliveryRadius} onChange={(e) => update("deliveryRadius", parseFloat(e.target.value) || 0)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Free Delivery ($)</label>
              <input aria-label="Free Delivery" type="number" value={settings.freeDeliveryThreshold} onChange={(e) => update("freeDeliveryThreshold", parseFloat(e.target.value) || 0)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Tax Rate (%)</label>
              <input aria-label="Tax Rate" type="number" value={settings.taxRate} onChange={(e) => update("taxRate", parseFloat(e.target.value) || 0)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Hero Section</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Hero Title</label>
              <input aria-label="Hero Title" value={settings.heroTitle} onChange={(e) => update("heroTitle", e.target.value)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
            <div>
              <label className="text-xs text-fg-muted mb-1 block">Hero Subtitle</label>
              <input aria-label="Hero Subtitle" value={settings.heroSubtitle} onChange={(e) => update("heroSubtitle", e.target.value)}
                className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary" />
            </div>
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Status Controls</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-fg-primary font-medium">Restaurant Status</p>
                <p className="text-xs text-fg-dim">{settings.isOpen ? "Open for business" : "Closed"}</p>
              </div>
              <button onClick={handleToggle}
                className={`h-10 px-4 rounded-full text-sm font-medium flex items-center gap-2 ${
                  settings.isOpen
                    ? "bg-green-400/10 text-green-400 border border-green-400/30"
                    : "bg-red-400/10 text-red-400 border border-red-400/30"
                }`}>
                <Power className="w-4 h-4" />
                {settings.isOpen ? "Open" : "Closed"}
              </button>
            </div>
            <label className="flex items-center justify-between text-sm text-fg-muted">
              <span>Maintenance Mode</span>
              <input type="checkbox" checked={settings.maintenanceMode}
                onChange={(e) => update("maintenanceMode", e.target.checked)}
                className="accent-fg-primary" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
