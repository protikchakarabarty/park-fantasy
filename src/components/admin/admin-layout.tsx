"use client"

import { useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, UtensilsCrossed, Combine, Tag, Star, Calendar, Users,
  ShoppingBag, Bike, Settings, Video, LogOut, Menu, type LucideIcon,
} from "lucide-react"
import { logoutAdmin } from "@/data/admin"
import type { AdminTab } from "@/app/admin/dashboard/page"

interface AdminLayoutProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  children: ReactNode
}

interface NavItem {
  id: AdminTab
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: "analytics", label: "Analytics", icon: LayoutDashboard },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "combos", label: "Combos", icon: Combine },
  { id: "offers", label: "Offers", icon: Tag },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "reservations", label: "Reservations", icon: Calendar },
  { id: "customers", label: "Customers", icon: Users },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "delivery", label: "Delivery", icon: Bike },
  { id: "kitchen", label: "Live Kitchen", icon: Video },
  { id: "settings", label: "Settings", icon: Settings },
]

export function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logoutAdmin()
    router.replace("/admin")
  }

  return (
    <div className="min-h-screen bg-primary flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => { if (e.key === "Escape") setSidebarOpen(false) }}
          />
        )}
      </AnimatePresence>

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-primary/95 backdrop-blur-xl border-r border-glass-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-glass-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center text-sm text-inverse font-bold">
                PF
              </div>
              <div>
                <h2 className="text-sm font-bold text-fg-primary">Park Fantasy</h2>
                <p className="text-xs text-fg-dim">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "gold-gradient-bg text-inverse font-medium"
                      : "text-fg-muted hover:text-fg-primary hover:bg-glass"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="p-3 border-t border-glass-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-fg-dim hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-h-screen overflow-x-hidden">
        <header className="sticky top-0 z-30 bg-primary/80 backdrop-blur-xl border-b border-glass-border">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Toggle sidebar"
              className="lg:hidden w-11 h-11 rounded-xl glass flex items-center justify-center"
            >
              <Menu className="w-4 h-4 text-fg-primary" />
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
              <span className="text-xs text-fg-dim">
                {navItems.find((n) => n.id === activeTab)?.label || "Dashboard"}
              </span>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
