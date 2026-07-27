"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, ShoppingCart } from "lucide-react"

const combos = [
  {
    name: "Royal Feast",
    price: "$89",
    original: "$124",
    items: ["2 Premium Burgers", "1 Large Pizza", "4 Beverages", "2 Desserts", "1 Side"],
    badge: "Most Popular",
  },
  {
    name: "Family Paradise",
    price: "$149",
    original: "$210",
    items: ["3 Grilled Steaks", "2 Seafood Platters", "6 Beverages", "4 Desserts", "3 Sides"],
    badge: "Best Value",
  },
  {
    name: "Date Night",
    price: "$59",
    original: "$85",
    items: ["2 Main Courses", "1 Bottle of Wine", "1 Dessert", "2 Beverages"],
    badge: "Romantic",
  },
]

export function ComboMeals() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Combo Meals"
          subtitle="Specially curated combinations for every occasion"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {combos.map((combo, index) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full relative ${index === 1 ? "border-fg-primary/30 shadow-lg shadow-fg-primary/10" : ""}`}>
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="text-xs px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-fg-primary mb-2">{combo.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold gold-gradient">{combo.price}</span>
                      <span className="text-lg text-fg-dim line-through">{combo.original}</span>
                    </div>
                    <span className="text-sm text-fg-primary">Save ${parseInt(combo.original.slice(1)) - parseInt(combo.price.slice(1))}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {combo.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-fg-muted">
                        <Check className="w-4 h-4 text-fg-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full group">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
