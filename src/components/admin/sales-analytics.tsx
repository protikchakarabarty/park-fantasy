"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, DollarSign, ShoppingBag, ArrowUp, ArrowDown } from "lucide-react"
import { getSalesSummary, generateSampleOrders } from "@/data/analytics"
import type { SalesSummary } from "@/data/types"

export function SalesAnalytics() {
  const [data, setData] = useState<SalesSummary | null>(() => {
    generateSampleOrders()
    return getSalesSummary()
  })

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-fg-primary/30 border-t-fg-primary rounded-full animate-spin" />
      </div>
    )
  }

  const cards = [
    {
      title: "Today's Revenue",
      value: `$${data.todayRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: "+12%",
      positive: true,
    },
    {
      title: "Weekly Revenue",
      value: `$${data.weeklyRevenue.toFixed(2)}`,
      icon: TrendingUp,
      change: "+8%",
      positive: true,
    },
    {
      title: "Monthly Revenue",
      value: `$${data.monthlyRevenue.toFixed(2)}`,
      icon: TrendingUp,
      change: "+15%",
      positive: true,
    },
    {
      title: "Total Orders",
      value: data.totalOrders.toString(),
      icon: ShoppingBag,
      change: "+5%",
      positive: true,
    },
    {
      title: "Avg Order Value",
      value: `$${data.averageOrderValue.toFixed(2)}`,
      icon: ShoppingBag,
      change: "+3%",
      positive: true,
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Sales Analytics</h1>
        <button onClick={() => { generateSampleOrders(); setData(getSalesSummary()) }}
          className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium">
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl border border-glass-border p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl glass flex items-center justify-center">
                  <Icon className="w-4 h-4 text-fg-primary" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs ${
                  card.positive ? "text-green-400" : "text-red-400"
                }`}>
                  {card.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-fg-primary">{card.value}</p>
              <p className="text-xs text-fg-dim mt-1">{card.title}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Revenue (Last 7 Days)</h2>
          <div className="space-y-2">
            {data.revenueByDay.map((day) => {
              const maxRevenue = Math.max(...data.revenueByDay.map((d) => d.revenue), 1)
              const percentage = (day.revenue / maxRevenue) * 100
              return (
                <div key={day.date}>
                  <div className="flex justify-between text-xs text-fg-muted mb-1">
                    <span>{new Date(day.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
                    <span>${day.revenue.toFixed(2)} ({day.orders} orders)</span>
                  </div>
                  <div className="w-full h-2 rounded-full glass overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="h-full gold-gradient-bg rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Popular Items</h2>
          <div className="space-y-3">
            {data.popularItems.map((item, i) => (
              <div key={item.productId} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full glass flex items-center justify-center text-xs text-fg-muted font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-fg-primary truncate">{item.name}</p>
                  <p className="text-xs text-fg-dim">{item.count} orders</p>
                </div>
                <span className="text-sm font-medium text-fg-primary">${item.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {data.categoryBreakdown.map((cat) => (
              <div key={cat.category}>
                <div className="flex justify-between text-xs text-fg-muted mb-1">
                  <span>{cat.category}</span>
                  <span>${cat.revenue.toFixed(2)} ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full glass overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    className="h-full gold-gradient-bg rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl border border-glass-border p-4">
          <h2 className="text-sm font-semibold text-fg-primary mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-fg-primary">{data.totalOrders}</p>
              <p className="text-xs text-fg-dim">All Time Orders</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-fg-primary">${data.averageOrderValue.toFixed(2)}</p>
              <p className="text-xs text-fg-dim">Avg Order Value</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-fg-primary">${data.monthlyRevenue.toFixed(2)}</p>
              <p className="text-xs text-fg-dim">Monthly Revenue</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-fg-primary">{data.popularItems.length}</p>
              <p className="text-xs text-fg-dim">Popular Items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
