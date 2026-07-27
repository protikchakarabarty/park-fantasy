"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { getProductsByCategory } from "@/data/products"
import Image from "next/image"

const categories = [
  { image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop", name: "Pizzas", count: "12 Items", key: "Pizza" },
  { image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=600&fit=crop", name: "Grills", count: "18 Items", key: "Grills" },
  { image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=600&fit=crop", name: "Seafood", count: "10 Items", key: "Seafood" },
  { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop", name: "Salads", count: "8 Items", key: "Salads" },
  { image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=600&fit=crop", name: "Beverages", count: "15 Items", key: "Beverages" },
  { image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop", name: "Desserts", count: "14 Items", key: "Desserts" },
]

export function FeaturedCategories() {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <section id="featured-categories" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Featured Categories"
          subtitle="Explore our carefully curated selection of culinary delights"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`group overflow-hidden cursor-pointer ${expanded === cat.key ? "ring-2 ring-[#D4AF37]" : ""}`} onClick={() => setExpanded(expanded === cat.key ? null : cat.key)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(expanded === cat.key ? null : cat.key) } }}>
                <div className="relative min-h-[220px] flex flex-col justify-end">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-50% to-transparent" />
                  <CardContent className="relative z-10 p-4 pb-5">
                    <h3 className="text-lg font-bold text-[#D4AF37]">{cat.name}</h3>
                    <p className="text-sm text-white/80">{cat.count}</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-6"
            >
              <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-4">{expanded} Menu</h3>
                <div className="space-y-2">
                  {getProductsByCategory(expanded).map((p) => (
                    <div key={p.id} className="text-fg-primary text-sm py-2 border-b border-glass-border last:border-0">
                      {p.name}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
