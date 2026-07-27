"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartItemRow } from "./cart-item"
import { useStore } from "@/lib/store"
import { useState } from "react"

interface CartSidebarProps {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export function CartSidebar({ open, onClose, onCheckout }: CartSidebarProps) {
  const { state, cartSubtotal, cartTotal, deliveryFee, applyCoupon, removeCoupon, clearCart } = useStore()
  const [couponInput, setCouponInput] = useState("")

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return
    applyCoupon(couponInput.trim())
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-primary border-l border-glass-border z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-fg-primary" />
                <h2 className="text-lg font-bold text-fg-primary">Your Cart</h2>
                <span className="text-sm text-fg-dim">({state.cart.length} items)</span>
              </div>
              <div className="flex items-center gap-2">
                {state.cart.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-fg-dim hover:text-fg-primary transition-colors">
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>
            </div>

            {state.cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8">
                <ShoppingBag className="w-16 h-16 text-fg-dim mb-4" />
                <h3 className="text-lg font-semibold text-fg-primary mb-2">Your cart is empty</h3>
                <p className="text-sm text-fg-dim mb-6">Add some delicious items from our menu!</p>
                <Button variant="outline" onClick={onClose}>Browse Menu</Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {state.cart.map((item) => (
                    <CartItemRow key={item.productId} item={item} />
                  ))}
                </div>

                <div className="border-t border-glass-border p-4 space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 h-10 text-sm"
                      aria-label="Coupon code"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyCoupon}
                      className="h-10"
                    >
                      <Tag className="w-3.5 h-3.5 mr-1" />
                      Apply
                    </Button>
                  </div>

                  {state.couponCode && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-fg-primary">
                        Coupon: <strong>{state.couponCode}</strong>
                      </span>
                      <button onClick={removeCoupon} className="text-fg-dim hover:text-fg-primary text-xs">
                        Remove
                      </button>
                    </div>
                  )}

                      <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-fg-dim">
                      <span>Subtotal</span>
                      <span>৳{cartSubtotal.toFixed(0)}</span>
                    </div>
                    {state.discount > 0 && (
                      <div className="flex justify-between text-fg-primary">
                        <span>Discount</span>
                        <span>-৳{state.discount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-fg-dim">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? <span className="text-fg-primary">FREE</span> : `৳${deliveryFee.toFixed(0)}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-fg-primary pt-2 border-t border-glass-border">
                      <span>Total</span>
                      <span>৳{cartTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full group" onClick={onCheckout}>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
