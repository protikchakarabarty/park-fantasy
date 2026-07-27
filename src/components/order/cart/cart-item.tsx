"use client"

import React from "react"
import { Trash2 } from "lucide-react"
import { QuantitySelector } from "@/components/order/quantity-selector"
import { useStore } from "@/lib/store"
import type { CartItem as CartItemType } from "@/data/types"
import Image from "next/image"

export const CartItemRow = React.memo(function CartItemRow({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useStore()

  return (
    <div className="flex items-center gap-3 py-3 border-b border-glass-border last:border-0">
      <Image src={item.emoji || "/placeholder.svg"} alt={item.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-fg-primary/20" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-fg-primary truncate">{item.name}</p>
        <p className="text-sm text-fg-primary font-semibold">৳{(item.price * item.quantity).toFixed(0)}</p>
      </div>
      <QuantitySelector
        quantity={item.quantity}
        onChange={(q) => updateQuantity(item.productId, q)}
        size="sm"
      />
      <button
        onClick={() => removeFromCart(item.productId)}
        className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors shrink-0"
        aria-label={`Remove ${item.name} from cart`}
      >
        <Trash2 className="w-4 h-4 text-fg-dim" />
      </button>
    </div>
  )
})
