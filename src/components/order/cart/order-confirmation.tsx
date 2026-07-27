"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Package, Clock, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import Image from "next/image"

interface OrderConfirmationProps {
  open: boolean
  orderId: string | null
  onClose: () => void
  onTrackOrder: () => void
}

export function OrderConfirmation({ open, orderId, onClose, onTrackOrder }: OrderConfirmationProps) {
  const { state } = useStore()
  const order = state.orders.find((o) => o.id === orderId)

  return (
    <AnimatePresence>
      {open && order && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] bg-primary rounded-2xl border border-glass-border z-50 overflow-y-auto max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Order Confirmed"
          >
            <div className="p-4 sm:p-6 lg:p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-inverse" />
              </motion.div>

              <h2 className="text-2xl font-bold text-fg-primary mb-2">Order Confirmed!</h2>
              <p className="text-fg-dim mb-2">Thank you for your order</p>
              <div className="inline-flex glass rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm text-fg-primary font-mono font-bold">{order.id}</span>
              </div>

              <div className="glass rounded-xl p-4 mb-6 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-fg-primary shrink-0" />
                  <div>
                    <span className="text-fg-dim">Estimated delivery: </span>
                    <span className="text-fg-primary font-medium">
                      {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-fg-primary shrink-0" />
                  <span className="text-fg-primary">{order.address.street}, {order.address.city}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="w-4 h-4 text-fg-primary shrink-0" />
                  <span className="text-fg-primary capitalize">{order.paymentMethod}</span>
                </div>
              </div>

              <div className="glass rounded-xl p-4 mb-6 text-left">
                <h3 className="text-sm font-semibold text-fg-muted mb-2">ORDER ITEMS</h3>
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm py-1">
                    <span className="text-fg-primary flex items-center gap-1.5">
                      <Image src={item.emoji || "/placeholder.svg"} alt={item.name} width={20} height={20} className="w-5 h-5 rounded-full object-cover" />
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-fg-primary font-medium">৳{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-lg font-bold text-fg-primary pt-2 mt-2 border-t border-glass-border">
                  <span>Total</span>
                  <span>৳{order.total.toFixed(0)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Close
                </Button>
                <Button className="flex-1 group" onClick={onTrackOrder}>
                  <Package className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
