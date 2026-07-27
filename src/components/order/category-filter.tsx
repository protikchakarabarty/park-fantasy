"use client"

import React from "react"
import { motion } from "framer-motion"

interface CategoryFilterProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export const CategoryFilter = React.memo(function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === cat
              ? "gold-gradient-bg text-inverse"
              : "glass text-fg-muted hover:text-fg-primary border border-glass-border"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  )
})
