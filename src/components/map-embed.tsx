"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"
import type { Map as LeafletMap } from "leaflet"

interface MapEmbedProps {
  lat: number
  lng: number
  name: string
}

export function MapEmbed({ lat, lng, name }: MapEmbedProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<LeafletMap | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (instanceRef.current || !mapRef.current) return

    let cancelled = false

    const initMap = async () => {
      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")

      if (cancelled || !mapRef.current) return

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 17,
        zoomControl: false,
        scrollWheelZoom: false,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
      }).addTo(map)

      const icon = L.divIcon({
        html: `<div style="width:24px;height:24px;background:#D4AF37;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        className: "",
      })

      L.marker([lat, lng], { icon }).addTo(map).bindPopup(`<b>${name}</b>`)

      instanceRef.current = map
      if (!cancelled) setLoaded(true)
    }

    initMap()

    return () => {
      cancelled = true
      if (instanceRef.current) {
        instanceRef.current.remove()
        instanceRef.current = null
      }
    }
  }, [lat, lng, name])

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary rounded-2xl z-10">
          <MapPin className="w-10 h-10 text-fg-dim mb-3 animate-gold-shimmer" />
          <p className="text-sm text-fg-dim">Loading map...</p>
        </div>
      )}
      <div
        ref={mapRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "#1a1a2e" }}
        aria-label={`Map showing ${name} location`}
      />
    </div>
  )
}
