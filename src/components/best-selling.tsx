"use client"

import React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

const products = [
  { name: "Chicken Pizza 8in", price: "৳400", rating: 4.9, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop" },
  { name: "Cheese Pasta", price: "৳100", rating: 4.8, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop" },
  { name: "Chocolate Cold Coffee Big", price: "৳80", rating: 4.7, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=600&fit=crop" },
  { name: "Mojito", price: "৳40", rating: 4.8, image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&h=600&fit=crop" },
]

export const BestSelling = React.memo(function BestSelling() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Best Selling"
          subtitle="Our most loved dishes that keep our guests coming back for more"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden h-full cursor-pointer">
                <div className="relative min-h-[300px] flex flex-col justify-end">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-50% to-transparent" />
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="default" className="text-xs px-2 py-0.5 shadow-lg">Best Seller</Badge>
                  </div>
                  <CardContent className="relative z-10 p-4 pb-5">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                      <span className="text-sm font-bold text-[#D4AF37]">{product.rating}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#D4AF37] leading-tight mb-1">{product.name}</h3>
                    <span className="text-3xl font-black text-[#D4AF37]">{product.price}</span>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})
