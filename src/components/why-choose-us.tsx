"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Shield, Leaf, Award, Truck, Headphones } from "lucide-react"

const reasons = [
  { icon: ChefHat, title: "Expert Chefs", desc: "Michelin-star trained chefs crafting each dish" },
  { icon: Leaf, title: "Fresh Ingredients", desc: "Locally sourced, organic ingredients daily" },
  { icon: Award, title: "Premium Quality", desc: "Uncompromising quality in every bite" },
  { icon: Shield, title: "Hygiene First", desc: "Top-tier sanitation and safety standards" },
  { icon: Truck, title: "Fast Delivery", desc: "Free delivery within 30 minutes" },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer service" },
]

export function WhyChooseUs() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Why Choose Us"
          subtitle="What sets Park Fantasy apart from the rest"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="text-center h-full group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full glass border border-fg-dim flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <reason.icon className="w-6 h-6 text-fg-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-fg-primary mb-2">{reason.title}</h3>
                  <p className="text-xs text-fg-dim">{reason.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
