"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, CookingPot, Package, Bike, Home, Clock, MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ORDER_STATUS_LABELS, ORDER_STATUS_STEPS } from "@/data/types"
import type { Order, OrderStatus } from "@/data/types"
import { getEstimatedTimeRange } from "@/data/delivery-zones"

interface LiveDeliveryTrackingProps {
  open: boolean
  order: Order | null
  onClose: () => void
}

const statusIcons: Record<string, typeof CheckCircle> = {
  confirmed: CheckCircle,
  preparing: CookingPot,
  cooking: CookingPot,
  packed: Package,
  out_for_delivery: Bike,
  delivered: Home,
}

export function LiveDeliveryTracking({ open, order, onClose }: LiveDeliveryTrackingProps) {
  if (!order) return null

  const currentIndex = ORDER_STATUS_STEPS.indexOf(order.status as OrderStatus)
  const areaId = order.zoneId || order.address.zoneId || ""
  const eta = areaId ? getEstimatedTimeRange(areaId) : { min: 30, max: 60, label: "30-60 min" }

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px] bg-primary rounded-2xl border border-glass-border z-50 overflow-y-auto max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Live Tracking"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-fg-primary">Live Tracking</h2>
                  <p className="text-xs font-mono text-fg-dim mt-0.5">{order.id}</p>
                </div>
                <button onClick={onClose} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Close tracking">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>

              <div className="glass rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-fg-primary" />
                    <div>
                      <p className="text-xs text-fg-dim">Estimated Delivery</p>
                      <p className="text-sm font-semibold text-fg-primary">
                        {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                  <Badge variant="default" className="text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-inverse animate-pulse mr-1.5" />
                    {ORDER_STATUS_LABELS[order.status]}
                  </Badge>
                </div>

                {order.zoneId && (
                  <div className="flex items-center gap-2 text-xs text-fg-dim">
                    <Bike className="w-3.5 h-3.5" />
                    <span>Delivery time: {eta.label}</span>
                  </div>
                )}
              </div>

              <div className="relative space-y-0 mb-6">
                {ORDER_STATUS_STEPS.map((status, i) => {
                  const Icon = statusIcons[status] || CheckCircle
                  const isCompleted = i <= currentIndex
                  const isCurrent = i === currentIndex

                  return (
                    <div key={status} className="flex items-start gap-4 pb-8 last:pb-0 relative">
                      {i < ORDER_STATUS_STEPS.length - 1 && (
                        <div className={`absolute left-[15px] top-8 w-0.5 h-full -z-0 ${
                          i < currentIndex ? "bg-fg-primary" : "bg-glass-border"
                        }`} />
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        isCompleted ? "gold-gradient-bg" : "glass border border-glass-border"
                      }`}>
                        <Icon className={`w-4 h-4 ${isCompleted ? "text-inverse" : "text-fg-dim"}`} />
                      </div>
                      <div className="pt-1">
                        <p className={`text-sm font-medium ${
                          isCurrent ? "text-fg-primary" : isCompleted ? "text-fg-primary/70" : "text-fg-dim"
                        }`}>
                          {ORDER_STATUS_LABELS[status]}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-fg-dim mt-0.5">Current status</p>
                        )}
                        {order.status === "out_for_delivery" && status === "out_for_delivery" && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-fg-primary mt-1"
                          >
                            Your delivery partner is on the way!
                          </motion.p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="glass rounded-xl p-4 space-y-2">
                <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-2">Delivery Details</h3>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-fg-primary shrink-0 mt-0.5" />
                  <div className="text-fg-primary">
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-fg-primary shrink-0" />
                  <span className="text-fg-primary">{order.address.phone}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Close
                </Button>
                <Button className="flex-1" onClick={() => {
                  const el = document.getElementById("contact")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                  onClose()
                }}>
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
