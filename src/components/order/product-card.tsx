"use client"

import React from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import type { Product } from "@/data/types"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  onShowDetails: (product: Product) => void
}

export const ProductCard = React.memo(function ProductCard({ product, onShowDetails }: ProductCardProps) {
  const { addToCart, toggleFavorite, isFavorite, isHydrated } = useStore()
  const fav = isHydrated && isFavorite(product.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="glass rounded-2xl overflow-hidden group h-full flex flex-col hover:border-fg-primary/20 transition-all duration-300">
          <div
            className="relative aspect-square flex items-center justify-center cursor-pointer bg-primary"
            onClick={() => onShowDetails(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onShowDetails(product) } }}
          >
          <Image
            src={product.emoji || "/placeholder.svg"}
            alt={product.name}
            fill
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            onClick={() => onShowDetails(product)}
          />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="text-xs">{product.badge}</Badge>
            </div>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id) }}
            className="absolute top-3 right-3 w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 ${fav ? "text-fg-primary fill-fg-primary" : "text-fg-dim"}`} />
          </button>
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-fg-muted font-medium">Currently Unavailable</span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold text-fg-primary truncate cursor-pointer hover:text-fg-secondary transition-colors"
                onClick={() => onShowDetails(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onShowDetails(product) } }}
              >
                {product.name}
              </h3>
              <p className="text-xs text-fg-dim mt-0.5">{product.category}</p>
            </div>
            <div className="flex items-center gap-1 ml-2 shrink-0">
              <Star className="w-3 h-3 text-fg-primary fill-fg-primary" />
              <span className="text-xs font-medium text-fg-primary">{product.rating}</span>
              <span className="text-xs text-fg-dim">({product.reviews})</span>
            </div>
          </div>

          <p className="text-xs text-fg-dim mt-1 line-clamp-2 flex-1">{product.description}</p>

          {product.preparationTime && (
            <div className="flex items-center gap-1 mt-2 text-fg-dim text-xs">
              <Clock className="w-3 h-3" />
              <span>{product.preparationTime} min</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-border">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-fg-primary">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-fg-dim line-through">৳{product.originalPrice}</span>
              )}
            </div>
            <Button
              size="sm"
              variant="default"
              onClick={() => addToCart(product.id, product.name, product.price, product.image, product.emoji)}
              disabled={!product.isAvailable}
              className="h-11 px-4 text-sm"
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
})
