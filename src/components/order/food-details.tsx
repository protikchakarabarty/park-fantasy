"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Clock, Flame, ShoppingCart, Heart, Minus, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import type { Product } from "@/data/types"
import React, { useState } from "react"

interface FoodDetailsProps {
  product: Product | null
  onClose: () => void
}

export const FoodDetails = React.memo(function FoodDetails({ product, onClose }: FoodDetailsProps) {
  const { addToCart, toggleFavorite, isFavorite, isHydrated } = useStore()
  const [qty, setQty] = useState(1)

  if (!product) return null

  const fav = isHydrated && isFavorite(product.id)

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
          tabIndex={-1}
          onClick={onClose}
          onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glass rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-glass-border"
            role="dialog"
            aria-modal="true"
            aria-label={product?.name || "Food details"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="aspect-video flex items-center justify-center bg-primary">
                <span className="text-8xl">{product.emoji}</span>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5 text-fg-primary" />
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 left-4 w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-5 h-5 ${fav ? "text-fg-primary fill-fg-primary" : "text-fg-dim"}`} />
              </button>
              {product.badge && (
                <div className="absolute bottom-4 left-4">
                  <Badge>{product.badge}</Badge>
                </div>
              )}
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-fg-primary">{product.name}</h2>
                    <p className="text-sm text-fg-dim mt-1">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-fg-primary fill-fg-primary" />
                    <span className="font-semibold text-fg-primary">{product.rating}</span>
                    <span className="text-sm text-fg-dim">({product.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-fg-muted mt-3 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                {product.preparationTime && (
                  <div className="flex items-center gap-2 text-fg-dim">
                    <Clock className="w-4 h-4 text-fg-primary" />
                    <span>{product.preparationTime} min prep time</span>
                  </div>
                )}
                {product.calories && (
                  <div className="flex items-center gap-2 text-fg-dim">
                    <Flame className="w-4 h-4 text-fg-primary" />
                    <span>{product.calories} cal</span>
                  </div>
                )}
              </div>

              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-fg-primary mb-2">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <span key={ing} className="text-xs px-3 py-1 rounded-full glass text-fg-dim border border-glass-border">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                <div>
                  <span className="text-3xl font-bold text-fg-primary">৳{product.price}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-fg-dim line-through">৳{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-fg-primary" />
                    </button>
                    <span className="text-lg font-semibold text-fg-primary w-8 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(99, qty + 1))}
                      className="w-11 h-11 rounded-full gold-gradient-bg flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      <Plus className="w-4 h-4 text-inverse" />
                    </button>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => { addToCart(product.id, product.name, product.price, product.image, product.emoji, qty); onClose() }}
                    disabled={!product.isAvailable}
                    className="whitespace-nowrap"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart — ৳{(product.price * qty).toFixed(0)}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
