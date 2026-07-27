import { useState } from "react"
import type { SiteSettings } from "./types"

const STORAGE_KEY = "park-fantasy-settings"
const SETTINGS_VERSION = 1

export const defaultSettings: SiteSettings = {
  restaurantName: "Park Fantasy",
  tagline: "Premium Dining Experience",
  description: "Indulge in an extraordinary culinary journey at Park Fantasy. Fine dining with premium dishes, expert chefs, and unforgettable experiences.",
  address: "Jessore, Bangladesh",
  phone: "01986640177",
  email: "infoparkfantasy@gmail.com",
  openingHours: [
    { day: "Saturday - Thursday", open: "11:00 AM", close: "9:00 PM" },
    { day: "Friday", open: "4:00 PM", close: "10:00 PM" },
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/parkfantasy" },
    { platform: "Facebook", url: "https://facebook.com/parkfantasy" },
    { platform: "Twitter", url: "https://twitter.com/parkfantasy" },
  ],
  heroTitle: "Where Every Meal Is a Masterpiece",
  heroSubtitle: "Indulge in premium flavors crafted by world-class chefs in an unforgettable setting.",
  deliveryRadius: 15,
  freeDeliveryThreshold: 30,
  taxRate: 8,
  currency: "$",
  isOpen: true,
  maintenanceMode: false,
  googlePlaceId: "0x39ff1145054abb63:0x2ed699279e1910a5",
  googleLatitude: 23.163852,
  googleLongitude: 89.2024485,
  googleMapsUrl: "https://www.google.com/maps/place/Park+Fantasy/@23.163852,89.2024485,17z/data=!4m14!1m7!3m6!1s0x39ff1145054abb63:0x2ed699279e1910a5!2sPark+Fantasy!8m2!3d23.1638471!4d89.2050234!16s%2Fg%2F11qp2vcglb!3m5!1s0x39ff1145054abb63:0x2ed699279e1910a5!8m2!3d23.1638471!4d89.2050234!16s%2Fg%2F11qp2vcglb",
  settingsVersion: SETTINGS_VERSION,
}

export function getSiteSettings(): SiteSettings {
  return { ...defaultSettings }
}

export function loadSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return { ...defaultSettings }
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      if (parsed.settingsVersion === SETTINGS_VERSION) {
        return { ...defaultSettings, ...parsed }
      }
    }
  } catch {}
  const fresh = { ...defaultSettings, settingsVersion: SETTINGS_VERSION }
  saveSiteSettings(fresh)
  return fresh
}

export function saveSiteSettings(settings: SiteSettings): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  const current = loadSiteSettings()
  const next = { ...current, ...updates }
  saveSiteSettings(next)
  return next
}

export function resetSiteSettings(): SiteSettings {
  saveSiteSettings(defaultSettings)
  return { ...defaultSettings }
}

export function toggleRestaurantStatus(): SiteSettings {
  const current = loadSiteSettings()
  current.isOpen = !current.isOpen
  saveSiteSettings(current)
  return current
}

export function getGoogleBusinessUrls(mapsUrl: string, lat: number, lng: number) {
  return {
    mapsUrl,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    reviewsUrl: mapsUrl,
    embedUrl: `https://www.google.com/maps/embed?q=${lat},${lng}&z=17`,
  }
}

export function useSiteSettings(): { settings: SiteSettings; loaded: boolean } {
  const [settings] = useState<SiteSettings>(() => loadSiteSettings())
  const [loaded] = useState(true)

  return { settings, loaded }
}
