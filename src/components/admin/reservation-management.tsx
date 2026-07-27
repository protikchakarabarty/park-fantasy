"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, Phone, Users, Check, X, Clock, Trash2 } from "lucide-react"
import { getReservations, updateReservation, deleteReservation } from "@/data/reservations"
import type { Reservation } from "@/data/types"

const statusColors: Record<string, string> = {
  pending: "bg-yellow-400/10 text-yellow-400",
  confirmed: "bg-green-400/10 text-green-400",
  completed: "bg-blue-400/10 text-blue-400",
  cancelled: "bg-red-400/10 text-red-400",
}

export function ReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>(() => getReservations())
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Reservation["status"] | "all">("all")
  const [detail, setDetail] = useState<Reservation | null>(null)

  const refresh = () => setReservations(getReservations())

  const filtered = reservations.filter((r) => {
    const matchesSearch = r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || r.status === filter
    return matchesSearch && matchesFilter
  })

  const handleStatus = (id: string, status: Reservation["status"]) => {
    updateReservation(id, { status })
    refresh()
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this reservation?")) {
      deleteReservation(id)
      refresh()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Reservation Management</h1>
        <div className="text-sm text-fg-dim">{reservations.length} total</div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reservations..."
            aria-label="Search reservations"
            className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
        </div>
        <div className="flex rounded-xl border border-glass-border overflow-hidden">
          {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-medium capitalize transition-all ${
                filter === f ? "gold-gradient-bg text-inverse" : "text-fg-muted hover:text-fg-primary"
              }`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((res) => (
          <motion.div key={res.id} layout
            className="glass rounded-xl border border-glass-border p-4 cursor-pointer hover:border-fg-primary/30 transition-all"
            onClick={() => setDetail(res)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-sm text-inverse font-bold">
                  {res.customerName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-fg-primary">{res.customerName}</h3>
                  <p className="text-xs text-fg-dim font-mono">{res.id}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[res.status] || ""}`}>
                {res.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-fg-muted">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" /> {res.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> {res.time}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3" /> {res.guests} guests
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3" /> {res.customerPhone}
              </div>
            </div>
            {res.specialRequests && (
              <p className="text-xs text-fg-dim mt-2 italic">&quot;{res.specialRequests}&quot;</p>
            )}
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
            className="fixed inset-4 md:inset-auto md:top-[15%] md:bottom-[15%] md:left-[25%] md:right-[25%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Reservation Details">
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <h2 className="text-lg font-bold text-fg-primary">Reservation Details</h2>
              <button onClick={() => setDetail(null)} aria-label="Close reservation details" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                <X className="w-4 h-4 text-fg-primary" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full gold-gradient-bg flex items-center justify-center text-xl text-inverse font-bold">
                  {detail.customerName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-fg-primary">{detail.customerName}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[detail.status]}`}>{detail.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1">DATE & TIME</p>
                  <p className="text-fg-primary font-medium">{detail.date} at {detail.time}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1">GUESTS</p>
                  <p className="text-fg-primary font-medium">{detail.guests} guests</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1">PHONE</p>
                  <p className="text-fg-primary font-medium">{detail.customerPhone}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1">EMAIL</p>
                  <p className="text-fg-primary font-medium">{detail.customerEmail}</p>
                </div>
              </div>
              {detail.tablePreference && (
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1">TABLE PREFERENCE</p>
                  <p className="text-fg-primary font-medium">{detail.tablePreference}</p>
                </div>
              )}
              {detail.specialRequests && (
                <div className="glass rounded-xl p-3">
                  <p className="text-xs text-fg-muted mb-1">SPECIAL REQUESTS</p>
                  <p className="text-fg-primary italic">{detail.specialRequests}</p>
                </div>
              )}
            </div>
            <div className="border-t border-glass-border p-4 flex flex-wrap gap-2">
              {detail.status === "pending" && (
                <button onClick={() => { handleStatus(detail.id, "confirmed"); setDetail(null) }}
                  className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-xs font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Confirm
                </button>
              )}
              {detail.status !== "cancelled" && detail.status !== "completed" && (
                <button onClick={() => { handleStatus(detail.id, "cancelled"); setDetail(null) }}
                  className="h-10 px-4 border border-red-400/30 text-red-400 rounded-full text-xs font-medium flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              )}
              {detail.status === "confirmed" && (
                <button onClick={() => { handleStatus(detail.id, "completed"); setDetail(null) }}
                  className="h-10 px-4 border border-green-400/30 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                  Mark Completed
                </button>
              )}
              <button onClick={() => { handleDelete(detail.id); setDetail(null) }}
                className="h-10 px-4 border border-glass-border text-fg-dim rounded-full text-xs font-medium flex items-center gap-1 ml-auto">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
