"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Navigation, Star, MapPin, Clock, Phone, Mail, ChevronRight, Search } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { useSiteSettings, getGoogleBusinessUrls } from "@/data/site-settings"
import { MapEmbed } from "@/components/map-embed"

function isOpenNow(hours: { open: string; close: string }[]): boolean {
  const now = new Date()
  const cur = now.getHours() * 60 + now.getMinutes()
  for (const h of hours) {
    const [oH, oM] = h.open.match(/\d+/g)!.map(Number)
    const [cH, cM] = h.close.match(/\d+/g)!.map(Number)
    const openMin = (h.open.includes("PM") && oH !== 12 ? oH + 12 : h.open.includes("AM") && oH === 12 ? 0 : oH) * 60 + (oM ?? 0)
    const closeMin = (h.close.includes("PM") && cH !== 12 ? cH + 12 : h.close.includes("AM") && cH === 12 ? 0 : cH) * 60 + (cM ?? 0)
    if (cur >= openMin && cur < closeMin) return true
  }
  return false
}

export function GoogleBusiness() {
  const { settings } = useSiteSettings()
  const google = useMemo(
    () => getGoogleBusinessUrls(settings.googleMapsUrl, settings.googleLatitude, settings.googleLongitude),
    [settings.googleMapsUrl, settings.googleLatitude, settings.googleLongitude]
  )
  const openNow = useMemo(() => isOpenNow(settings.openingHours), [settings.openingHours])

  const businessInfo = [
    { icon: MapPin, label: "Address", value: settings.address },
    { icon: Phone, label: "Phone", value: settings.phone },
    { icon: Mail, label: "Email", value: settings.email },
    {
      icon: Clock,
      label: "Hours Today",
      value: settings.openingHours[0] ? `${settings.openingHours[0].open} - ${settings.openingHours[0].close}` : "",
    },
  ]

  return (
    <section id="find-us" className="relative section-padding px-4 sm:px-6 lg:px-8 overflow-hidden" aria-label="Find us on Google Maps">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.04)_0%,_transparent_60%)]" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Find Us on Google Maps"
          subtitle="Visit our Google Business Profile to get directions, read reviews, and learn more"
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl overflow-hidden border border-glass-border gold-glow">
              <div className="aspect-[4/3] relative bg-secondary">
                <MapEmbed lat={settings.googleLatitude} lng={settings.googleLongitude} name={settings.restaurantName} />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 rounded-3xl" />
              </div>
              <div className="absolute top-4 left-4">
                <div className="glass rounded-xl px-3 py-1.5 flex items-center gap-2 backdrop-blur-2xl">
                  <div className={`w-2 h-2 rounded-full ${openNow ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                  <span className="text-xs font-medium text-fg-primary">{openNow ? "Open now" : "Closed"}</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="glass rounded-xl px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-2xl">
                  <Search className="w-3 h-3 text-fg-muted" />
                  <span className="text-xs text-fg-muted">Google Maps</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="glass rounded-3xl border border-glass-border p-4 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-fg-primary mb-1">{settings.restaurantName}</h3>
                  <p className="text-sm text-fg-dim">{settings.tagline}</p>
                </div>
                <motion.a
                  href={google.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center shrink-0 gold-glow"
                  aria-label="Open in Google Maps"
                >
                  <ExternalLink className="w-5 h-5 text-inverse" />
                </motion.a>
              </div>

              <div className="space-y-3 mb-6">
                {businessInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl glass flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-fg-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-fg-muted uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-fg-primary font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="glass-strong rounded-2xl p-4 mb-6">
                <p className="text-xs text-fg-muted uppercase tracking-wider mb-3">Opening Hours</p>
                <div className="space-y-1.5">
                  {settings.openingHours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm text-fg-dim">
                      <span>{h.day}</span>
                      <span>{h.open} - {h.close}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={google.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button className="w-full gold-gradient-bg shadow-lg shadow-fg-primary/20 group" size="default">
                    <Navigation className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                    Get Directions
                  </Button>
                </motion.a>
                <motion.a
                  href={google.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full border-fg-primary/30 group" size="default">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </Button>
                </motion.a>
              </div>

              <motion.a
                href={google.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block mt-3"
              >
                <Button variant="outline" className="w-full border-fg-primary/30 group" size="default">
                  <Star className="w-4 h-4 mr-2 fill-fg-primary text-fg-primary" />
                  View All Reviews on Google
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
            <MapPin className="w-3.5 h-3.5 text-fg-primary" />
            <span className="text-xs text-fg-muted">
              {settings.restaurantName} &middot; {settings.address}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
