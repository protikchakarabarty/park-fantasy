"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, CreditCard, Bike, Clock, ArrowRight } from "lucide-react"

const steps = [
  { icon: Smartphone, title: "Browse Menu", desc: "Explore our extensive menu with HD photos" },
  { icon: CreditCard, title: "Easy Payment", desc: "Secure payments via cards, wallets or cash" },
  { icon: Clock, title: "Fast Preparation", desc: "Our chefs prepare your order with care" },
  { icon: Bike, title: "Quick Delivery", desc: "Track your order in real-time to your door" },
]

export function OnlineOrder() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Online Order"
          subtitle="Order your favorite dishes in just a few taps"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-inverse" />
                    </div>
                    <h3 className="font-semibold text-fg-primary mb-2">{step.title}</h3>
                    <p className="text-sm text-fg-dim">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left lg:pl-8"
          >
            <h3 className="text-3xl font-bold text-fg-primary mb-4">
              Hungry? We&apos;ve Got You
            </h3>
            <p className="text-fg-dim mb-6">
              Experience the convenience of ordering your favorite meals from Park Fantasy. 
              Fast delivery, easy tracking, and the same great taste at your doorstep.
            </p>
            <div className="glass inline-flex items-center gap-4 rounded-2xl p-4 mb-6">
              <Clock className="w-8 h-8 text-fg-primary" />
              <div>
                <div className="text-sm text-fg-dim">Average Delivery Time</div>
                <div className="text-xl font-bold text-fg-primary">25-35 min</div>
              </div>
            </div>
            <Button size="lg" className="group">
              Order Online Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
