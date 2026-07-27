"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Send, ExternalLink } from "lucide-react"
import { useSiteSettings, getGoogleBusinessUrls } from "@/data/site-settings"

export function Contact() {
  const { settings } = useSiteSettings()
  const h = settings.openingHours[0]
  const google = getGoogleBusinessUrls(settings.googleMapsUrl, settings.googleLatitude, settings.googleLongitude)
  const contactInfo = [
    { icon: MapPin, title: "Address", desc: settings.address, href: google.mapsUrl },
    { icon: Phone, title: "Phone", desc: settings.phone, href: `tel:${settings.phone}` },
    { icon: Mail, title: "Email", desc: settings.email, href: `mailto:${settings.email}` },
    { icon: Clock, title: "Hours", desc: h ? `${h.day}: ${h.open} - ${h.close}` : "", href: undefined },
  ]
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Contact Us"
          subtitle="We'd love to hear from you. Get in touch with us!"
        />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-6">
                  <Input placeholder="Your Name" aria-label="Your Name" />
                  <Input type="email" placeholder="Your Email" aria-label="Your Email" />
                  <Input placeholder="Subject" aria-label="Subject" />
                  <Textarea placeholder="Your Message..." aria-label="Your Message" />
                  <Button size="lg" className="w-full group">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => {
              const isAddress = info.title === "Address"
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {info.href ? (
                    <motion.a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className={`group cursor-pointer ${isAddress ? "gold-glow border-fg-primary/40" : ""}`}>
                        <CardContent className={`flex items-center gap-4 ${isAddress ? "p-6" : "p-6"}`}>
                          <div className={`rounded-full glass border border-fg-dim flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${isAddress ? "w-12 h-12 gold-gradient-bg border-0" : "w-12 h-12"}`}>
                            <info.icon className={`w-6 h-6 ${isAddress ? "text-inverse" : "text-fg-primary"}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-fg-primary">{info.title}</h3>
                            <p className="text-sm text-fg-dim">{info.desc}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardContent>
                      </Card>
                    </motion.a>
                  ) : (
                    <Card className="group">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full glass border border-fg-dim flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <info.icon className="w-6 h-6 text-fg-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-fg-primary">{info.title}</h3>
                          <p className="text-sm text-fg-dim">{info.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
