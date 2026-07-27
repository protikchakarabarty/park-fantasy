"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Phone, Star, ShoppingBag, X } from "lucide-react"
import type { Customer } from "@/data/types"

function getAllCustomers(): Customer[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem("park-fantasy-customers")
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

export function CustomerManagement() {
  const [customers] = useState<Customer[]>(() => getAllCustomers())
  const [search, setSearch] = useState("")
  const [detail, setDetail] = useState<Customer | null>(null)

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Customer Management</h1>
        <div className="text-sm text-fg-dim">{customers.length} registered</div>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((customer) => (
          <motion.div key={customer.id} layout
            className="glass rounded-xl border border-glass-border p-4 cursor-pointer hover:border-fg-primary/30 transition-all"
            onClick={() => setDetail(customer)}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-lg text-inverse font-bold shrink-0">
                {customer.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-fg-primary">{customer.name}</h3>
                <p className="text-xs text-fg-dim">{customer.email}</p>
                <p className="text-xs text-fg-dim">{customer.phone}</p>
              </div>
              <div className="text-right text-xs text-fg-dim">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-fg-primary" />
                  <span>{customer.favoriteProductIds.length}</span>
                </div>
                <p>{customer.savedAddresses.length} addresses</p>
              </div>
            </div>
            <p className="text-xs text-fg-dim mt-2">
              Joined {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12">
            <ShoppingBag className="w-12 h-12 text-fg-dim mx-auto mb-3" />
            <p className="text-fg-dim text-sm">No customers found</p>
          </div>
        )}
      </div>

      {detail && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setDetail(null)}
            onKeyDown={(e) => { if (e.key === "Escape") setDetail(null) }} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-4 md:inset-auto md:top-[10%] md:bottom-[10%] md:left-[25%] md:right-[25%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Customer Details">
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <h2 className="text-lg font-bold text-fg-primary">Customer Details</h2>
              <button onClick={() => setDetail(null)} aria-label="Close customer details" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                <X className="w-4 h-4 text-fg-primary" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-2xl text-inverse font-bold">
                  {detail.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fg-primary">{detail.name}</h3>
                  <p className="text-sm text-fg-dim">Customer since {new Date(detail.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1 flex items-center gap-1"><Mail className="w-3 h-3" /> EMAIL</p>
                  <p className="text-sm text-fg-primary">{detail.email}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> PHONE</p>
                  <p className="text-sm text-fg-primary">{detail.phone}</p>
                </div>
              </div>
              <div className="glass rounded-xl p-3">
                <p className="text-xs text-fg-muted mb-1 flex items-center gap-1"><Star className="w-3 h-3" /> FAVORITES</p>
                <p className="text-sm text-fg-primary">{detail.favoriteProductIds.length} products</p>
                {detail.favoriteProductIds.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {detail.favoriteProductIds.map((id) => (
                      <span key={id} className="text-xs px-2 py-0.5 rounded-full glass text-fg-dim">{id}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="glass rounded-xl p-3">
                <p className="text-xs text-fg-muted mb-1">SAVED ADDRESSES</p>
                {detail.savedAddresses.length === 0 ? (
                  <p className="text-sm text-fg-dim">No saved addresses</p>
                ) : (
                  <div className="space-y-2">
                    {detail.savedAddresses.map((addr) => (
                      <div key={addr.id} className="text-xs text-fg-primary border-b border-glass-border pb-1 last:border-0">
                        <span className="font-medium">{addr.label}</span> — {addr.street}, {addr.city}
                        {addr.isDefault && <span className="text-fg-primary ml-1">● Default</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
