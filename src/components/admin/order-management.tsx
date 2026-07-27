"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Clock, MapPin, ChevronRight, Phone, DollarSign, X } from "lucide-react"
import type { Order, OrderStatus } from "@/data/types"
import { ORDER_STATUS_LABELS, ORDER_STATUS_STEPS } from "@/data/types"

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-400/10 text-blue-400",
  preparing: "bg-yellow-400/10 text-yellow-400",
  cooking: "bg-orange-400/10 text-orange-400",
  packed: "bg-purple-400/10 text-purple-400",
  out_for_delivery: "bg-cyan-400/10 text-cyan-400",
  delivered: "bg-green-400/10 text-green-400",
  cancelled: "bg-red-400/10 text-red-400",
}

const STORAGE_KEY = "park-fantasy-orders"

function getAllOrders(): Order[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(() => getAllOrders())
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<OrderStatus | "all">("all")
  const [detail, setDetail] = useState<Order | null>(null)

  const filtered = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.address.fullName.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || o.status === filter
    return matchesSearch && matchesFilter
  })

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const idx = orders.findIndex((o) => o.id === orderId)
    if (idx === -1) return
    const updated = {
      ...orders[idx],
      status: newStatus,
      statusHistory: [...orders[idx].statusHistory, { status: newStatus, time: new Date().toISOString() }],
      ...(newStatus === "delivered" ? { deliveredAt: new Date().toISOString() } : {}),
    }
    const updatedOrders = [...orders]
    updatedOrders[idx] = updated
    setOrders(updatedOrders)
    if (detail?.id === orderId) setDetail(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders))
  }

  const cancelOrder = (orderId: string) => {
    if (confirm("Cancel this order?")) {
      updateOrderStatus(orderId, "cancelled")
    }
  }

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    if (status === "cancelled" || status === "delivered") return null
    const idx = ORDER_STATUS_STEPS.indexOf(status)
    if (idx === -1 || idx >= ORDER_STATUS_STEPS.length - 1) return null
    return ORDER_STATUS_STEPS[idx + 1]
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Order Management</h1>
        <div className="text-sm text-fg-dim">{orders.length} total</div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
        </div>
        <div className="flex rounded-xl border border-glass-border overflow-hidden flex-wrap">
          {(["all", ...ORDER_STATUS_STEPS, "cancelled"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 py-2 text-xs font-medium transition-all ${
                filter === f ? "gold-gradient-bg text-inverse" : "text-fg-muted hover:text-fg-primary"
              }`}>
              {f === "all" ? "All" : ORDER_STATUS_LABELS[f] || f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <motion.div key={order.id} layout
            className="glass rounded-xl border border-glass-border p-4 cursor-pointer hover:border-fg-primary/30 transition-all"
            onClick={() => setDetail(order)}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-fg-primary font-mono">{order.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[order.status] || ""}`}>
                  {ORDER_STATUS_LABELS[order.status] || order.status}
                </span>
              </div>
              <span className="text-sm font-bold text-fg-primary">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-fg-muted">
              <span>{order.address.fullName}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleString()}</span>
              <span className="capitalize">{order.paymentMethod}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {detail && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setDetail(null)}
            onKeyDown={(e) => { if (e.key === "Escape") setDetail(null) }} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-4 md:inset-auto md:top-[5%] md:bottom-[5%] md:left-[20%] md:right-[20%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Order Details">
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <div>
                <h2 className="text-lg font-bold text-fg-primary font-mono">{detail.id}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[detail.status]}`}>
                  {ORDER_STATUS_LABELS[detail.status]}
                </span>
              </div>
              <button onClick={() => setDetail(null)} aria-label="Close order details" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                <X className="w-4 h-4 text-fg-primary" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1">CUSTOMER</p>
                  <p className="text-sm text-fg-primary font-medium">{detail.address.fullName}</p>
                  <p className="text-xs text-fg-dim">{detail.address.phone}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3" /> TOTAL</p>
                  <p className="text-lg text-fg-primary font-bold">${detail.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="glass rounded-xl p-3">
                <p className="text-xs text-fg-muted mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> DELIVERY ADDRESS</p>
                <p className="text-sm text-fg-primary">{detail.address.street}</p>
                <p className="text-xs text-fg-dim">{detail.address.city}, {detail.address.state} {detail.address.zip}</p>
              </div>

              <div className="glass rounded-xl p-3">
                <p className="text-xs text-fg-muted mb-1">ITEMS</p>
                <div className="space-y-1">
                  {detail.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-fg-primary">{item.emoji} {item.name} × {item.quantity}</span>
                      <span className="text-fg-primary font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-glass-border mt-2 pt-2 space-y-1 text-xs">
                  <div className="flex justify-between text-fg-dim"><span>Subtotal</span><span>${detail.subtotal.toFixed(2)}</span></div>
                  {detail.discount > 0 && <div className="flex justify-between text-fg-primary"><span>Discount</span><span>-${detail.discount.toFixed(2)}</span></div>}
                  <div className="flex justify-between text-fg-dim"><span>Delivery Fee</span><span>{detail.deliveryFee === 0 ? "FREE" : `$${detail.deliveryFee.toFixed(2)}`}</span></div>
                </div>
              </div>

              <div className="glass rounded-xl p-3">
                <p className="text-xs text-fg-muted mb-1">TIMELINE</p>
                <div className="space-y-1">
                  {detail.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full gold-gradient-bg" />
                      <span className="text-fg-muted capitalize">{ORDER_STATUS_LABELS[h.status] || h.status}</span>
                      <span className="text-fg-dim ml-auto">{new Date(h.time).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-3">
                <p className="text-xs text-fg-muted mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> CONTACT</p>
                <p className="text-sm text-fg-primary">{detail.address.phone}</p>
              </div>

              {detail.zoneId && (
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> DELIVERY ZONE</p>
                  <p className="text-sm text-fg-primary font-mono">{detail.zoneId}</p>
                </div>
              )}
            </div>
            <div className="border-t border-glass-border p-4 flex gap-2">
              {getNextStatus(detail.status) && (
                <button onClick={() => updateOrderStatus(detail.id, getNextStatus(detail.status)!)}
                  className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-xs font-medium flex items-center gap-1">
                  Advance to {ORDER_STATUS_LABELS[getNextStatus(detail.status)!]}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
              {detail.status !== "cancelled" && detail.status !== "delivered" && (
                <button onClick={() => { cancelOrder(detail.id); setDetail(null) }}
                  className="h-10 px-4 border border-red-400/30 text-red-400 rounded-full text-xs font-medium">
                  Cancel Order
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
