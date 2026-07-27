"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, DollarSign, Shield, Bike, ChefHat } from "lucide-react"

const info = [
  {
    icon: MapPin,
    title: "Delivery Area",
    desc: "Serving across all upazilas of Jessore District",
    detail: "8 upazilas covered",
  },
  {
    icon: Clock,
    title: "Delivery Time",
    desc: "15-60 minutes depending on your location",
    detail: "Real-time tracking",
  },
  {
    icon: DollarSign,
    title: "Delivery Fee",
    desc: "Flat ৳40 inside Jessore Municipality, area-based fee outside",
    detail: "Free delivery on orders over ৳1,000",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "Contactless delivery with hygiene protocols",
    detail: "100% satisfaction",
  },
  {
    icon: Bike,
    title: "Express Delivery",
    desc: "Fast delivery within Jessore Municipality area",
    detail: "15-30 minutes",
  },
  {
    icon: ChefHat,
    title: "Chef Quality",
    desc: "Prepared fresh just before delivery",
    detail: "Temperature controlled",
  },
]

export function DeliveryInfo() {
  return (
    <section id="delivery" className="relative section-padding px-4 sm:px-6 lg:px-8 overflow-hidden" aria-label="Delivery Information">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,175,55,0.03)_0%,_transparent_50%)]" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Delivery Information"
          subtitle="Fast, fresh, and reliable — we bring the feast to your door with precision and care"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {info.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="text-center h-full group border-glass-border hover:border-fg-primary/30 transition-all duration-500">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl glass-strong border border-fg-dim/20 flex items-center justify-center mx-auto mb-5 group-hover:gold-glow transition-all duration-500"
                  >
                    <item.icon className="w-8 h-8 text-fg-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-fg-primary mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-fg-dim mb-3 leading-relaxed">{item.desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-fg-primary font-medium tracking-wide uppercase">
                    <span className="w-1 h-1 rounded-full bg-fg-primary" />
                    {item.detail}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
