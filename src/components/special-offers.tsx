"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight, Gift } from "lucide-react"

const offers = [
  {
    title: "Happy Hours",
    description: "Enjoy 30% off on all beverages between 4-7 PM",
    code: "HAPPY30",
    color: "from-fg-primary/10 to-fg-secondary/5",
    icon: Clock,
  },
  {
    title: "Weekend Special",
    description: "Buy 2 main courses, get 1 dessert free",
    code: "WEEKEND",
    color: "from-fg-primary/10 to-fg-secondary/5",
    icon: Gift,
  },
  {
    title: "Family Feast",
    description: "Special combo for 4 people at just $89",
    code: "FAMILY",
    color: "from-fg-primary/10 to-fg-secondary/5",
    icon: Gift,
  },
]

export function SpecialOffers() {
  return (
    <section id="offers" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Special Offers"
          subtitle="Unlock exclusive deals and make your dining experience even more memorable"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${offer.color} border border-glass-border p-6 group h-full`}>
                <div className="absolute top-4 right-4">
                  <offer.icon className="w-8 h-8 text-fg-dim" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-fg-primary mb-3">{offer.title}</h3>
                  <p className="text-fg-muted mb-4">{offer.description}</p>
                  <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
                    <span className="text-xs text-fg-primary font-mono">USE CODE</span>
                    <span className="text-sm font-bold text-fg-primary">{offer.code}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="group/btn mt-2 h-11">
                  Claim Offer <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
