"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"

const categories = ["All", "Appetizers", "Main Course", "Seafood", "Desserts", "Beverages"]

const menuItems = [
  { name: "Truffle Mushroom Risotto", desc: "Arborio rice, wild mushrooms, truffle oil, parmesan", price: "৳26", category: "Main Course", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop" },
  { name: "Crispy Calamari", desc: "Lightly battered squid, marinara sauce, lemon aioli", price: "৳16", category: "Appetizers", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop" },
  { name: "Grilled Atlantic Salmon", desc: "Norwegian salmon, herb crust, lemon butter sauce", price: "৳34", category: "Seafood", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop" },
  { name: "Classic Tiramisu", desc: "Coffee-soaked ladyfingers, mascarpone cream, cocoa", price: "৳14", category: "Desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop" },
  { name: "Artisan Flatbread", desc: "Sourdough base, heirloom tomatoes, fresh basil", price: "৳18", category: "Appetizers", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop" },
  { name: "Wagyu Beef Steak", desc: "Prime wagyu, truffle mashed potatoes, red wine jus", price: "৳52", category: "Main Course", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop" },
  { name: "Lobster Bisque", desc: "Atlantic lobster, cognac, crème fraîche", price: "৳22", category: "Appetizers", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=400&fit=crop" },
  { name: "Grilled Prawns", desc: "Jumbo prawns, garlic butter, lemon herb seasoning", price: "৳28", category: "Seafood", image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=400&fit=crop" },
  { name: "Chocolate Lava Cake", desc: "Dark chocolate, vanilla ice cream, berry compote", price: "৳16", category: "Desserts", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=400&fit=crop" },
  { name: "Signature Mocktail", desc: "Fresh fruits, mint, sparkling water", price: "৳10", category: "Beverages", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=400&fit=crop" },
  { name: "Berry Smoothie Bowl", desc: "Mixed berries, granola, honey, chia seeds", price: "৳12", category: "Beverages", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop" },
  { name: "Crème Brûlée", desc: "Vanilla custard, caramelized sugar, fresh berries", price: "৳14", category: "Desserts", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=400&fit=crop" },
]

export function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Restaurant Menu"
          subtitle="Discover our exquisite selection of culinary masterpieces"
        />
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "gold-gradient-bg text-inverse"
                  : "glass text-fg-muted hover:text-fg-primary border border-glass-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
              <Card className="group overflow-hidden h-full">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-fg-primary leading-tight mb-1">{item.name}</h3>
                  <p className="text-xs text-fg-dim line-clamp-2 flex-1 mb-3">{item.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold gold-gradient">{item.price}</span>
                    <Button size="sm" variant="ghost" className="group/btn h-11 w-11">
                      <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
