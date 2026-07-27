"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Clock, MapPin, CreditCard, ChevronRight, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ORDER_STATUS_LABELS } from "@/data/types"
import type { Order } from "@/data/types"

interface OrderHistoryProps {
  orders: Order[]
}

const statusColor: Record<string, "default" | "secondary" | "outline" | "success"> = {
  confirmed: "outline",
  preparing: "secondary",
  cooking: "secondary",
  packed: "default",
  out_for_delivery: "default",
  delivered: "success",
  cancelled: "outline",
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-fg-dim mx-auto mb-3" />
        <p className="text-sm text-fg-dim">No orders yet</p>
        <p className="text-xs text-fg-dim mt-1">Your order history will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider">Order History</h3>
      {orders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 cursor-pointer hover:border-fg-primary/20 transition-all duration-300"
          onClick={() => setSelectedOrder(order)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedOrder(order) } }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-fg-primary font-bold">{order.id}</span>
                <Badge variant={statusColor[order.status] || "secondary"} className="text-xs">
                  {ORDER_STATUS_LABELS[order.status] || order.status}
                </Badge>
              </div>
              <p className="text-xs text-fg-dim mt-1">
                {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} items
              </p>
              <p className="text-xs text-fg-dim">{order.address.street}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-fg-primary">${order.total.toFixed(2)}</p>
              <ChevronRight className="w-4 h-4 text-fg-dim ml-auto mt-1" />
            </div>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => setSelectedOrder(null)}
              onKeyDown={(e) => { if (e.key === "Escape") setSelectedOrder(null) }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] bg-primary rounded-2xl border border-glass-border z-50 overflow-y-auto max-h-[90vh]"
              role="dialog"
              aria-modal="true"
              aria-label="Order Details"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-fg-primary">Order Details</h3>
                    <p className="text-xs font-mono text-fg-dim">{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Close order details">
                    <X className="w-4 h-4 text-fg-primary" />
                  </button>
                </div>

                <div className="glass rounded-xl p-4 mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-fg-primary" />
                    <span className="text-fg-dim">Status:</span>
                    <Badge variant={statusColor[selectedOrder.status] || "secondary"} className="text-xs">
                      {ORDER_STATUS_LABELS[selectedOrder.status]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-fg-primary" />
                    <span className="text-fg-dim">Ordered:</span>
                    <span className="text-fg-primary">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-fg-primary" />
                    <span className="text-fg-dim">Deliver to:</span>
                    <span className="text-fg-primary">{selectedOrder.address.street}, {selectedOrder.address.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-fg-primary" />
                    <span className="text-fg-dim">Payment:</span>
                    <span className="text-fg-primary capitalize">{selectedOrder.paymentMethod}</span>
                  </div>
                </div>

                <div className="glass rounded-xl p-4 mb-4">
                  <h4 className="text-xs font-semibold text-fg-muted mb-2 uppercase tracking-wider">Items</h4>
                  {selectedOrder.items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm py-1">
                      <span className="text-fg-primary">{item.emoji} {item.name} × {item.quantity}</span>
                      <span className="text-fg-primary font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs text-fg-dim pt-2 mt-2 border-t border-glass-border">
                    <span>Subtotal</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-xs text-fg-primary">
                      <span>Discount</span>
                      <span>-${selectedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-fg-dim">
                    <span>Delivery</span>
                    <span>{selectedOrder.deliveryFee === 0 ? "FREE" : `$${selectedOrder.deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-fg-primary pt-2 mt-2 border-t border-glass-border">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => setSelectedOrder(null)}>Close</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
