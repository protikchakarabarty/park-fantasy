"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Flame } from "lucide-react"
import Image from "next/image"

const dishes = [
  { name: "Chicken Sub Burger", price: "৳70", rating: 4.8, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop", chefPick: true },
  { name: "Chicken Cheese Pasta", price: "৳100", rating: 4.9, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop", chefPick: true },
  { name: "Tandoori with Naan", price: "৳100", rating: 4.7, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=600&fit=crop", chefPick: false },
  { name: "Sub Sandwich Cheese Big", price: "৳70", rating: 4.6, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=600&fit=crop", chefPick: false },
  { name: "BBQ Pizza", price: "৳350", rating: 4.9, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop", chefPick: true },
]

export function PopularDishes() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Popular Dishes"
          subtitle="Our most-loved menu items crafted to perfection"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="group overflow-hidden h-full cursor-pointer">
                <div className="relative min-h-[220px] md:min-h-[300px] flex flex-col justify-end">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-50% to-transparent" />
                  {dish.chefPick && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="glass rounded-full p-1.5">
                        <Flame className="w-4 h-4 text-fg-primary" />
                      </div>
                    </div>
                  )}
                  <CardContent className="relative z-10 p-4 pb-5">
                    <h3 className="text-base font-bold text-[#D4AF37] leading-tight mb-1">{dish.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                      <span className="text-sm font-bold text-[#D4AF37]">{dish.rating}</span>
                    </div>
                    <span className="text-3xl font-black text-[#D4AF37]">{dish.price}</span>
                    <div className="mt-3">
                      <Badge variant={dish.chefPick ? "default" : "secondary"} className="text-xs px-3 py-0.5 shadow-lg">
                        {dish.chefPick ? "Chef's Pick" : "Popular"}
                      </Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
