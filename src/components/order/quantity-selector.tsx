"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onChange: (q: number) => void
  min?: number
  max?: number
  size?: "sm" | "md"
}

export function QuantitySelector({ quantity, onChange, min = 0, max = 99, size = "md" }: QuantitySelectorProps) {
  const btnSize = size === "sm" ? "w-11 h-11" : "w-11 h-11"
  const iconSize = size === "sm" ? "w-4 h-4" : "w-4 h-4"
  const textSize = size === "sm" ? "text-sm" : "text-base"

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`${btnSize} rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <Minus className={`${iconSize} text-fg-primary`} />
      </button>
      <span className={`${textSize} font-semibold text-fg-primary w-8 text-center`}>{quantity}</span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`${btnSize} rounded-full gold-gradient-bg flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <Plus className={`${iconSize} text-inverse`} />
      </button>
    </div>
  )
}
