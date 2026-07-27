"use client"

import React from "react"
import { ShoppingCart } from "lucide-react"
import { useStore } from "@/lib/store"

export const CartIcon = React.memo(function CartIcon() {
  const { cartCount, isHydrated } = useStore()

  return (
    <div className="relative">
      <ShoppingCart className="w-5 h-5" />
      {isHydrated && cartCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full gold-gradient-bg text-inverse text-xs font-bold flex items-center justify-center leading-none" aria-live="polite" aria-atomic="true">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </div>
  )
})
