"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, MapPin, Package, Bell, LogOut, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { SavedAddresses } from "./saved-addresses"
import { OrderHistory } from "./order-history"
import { NotificationsPanel } from "./notifications"

interface ProfileSectionProps {
  open: boolean
  onClose: () => void
}

type Tab = "profile" | "addresses" | "orders" | "notifications"

export function ProfileSection({ open, onClose }: ProfileSectionProps) {
  const { user, updateProfile, logout, changeUserPassword } = useAuth()
  const { state } = useStore()
  const [tab, setTab] = useState<Tab>("profile")
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [currentPw, setCurrentPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [pwMsg, setPwMsg] = useState("")

  if (!user) return null

  const tabs = [
    { id: "profile" as Tab, label: "Profile", icon: User },
    { id: "addresses" as Tab, label: "Addresses", icon: MapPin, count: user.savedAddresses.length },
    { id: "orders" as Tab, label: "Orders", icon: Package, count: state.orders.filter((o) => o.address.fullName === user.name).length },
    { id: "notifications" as Tab, label: "Notifications", icon: Bell },
  ]

  const handleSaveProfile = () => {
    updateProfile({ name, phone })
  }

  const handleChangePassword = async () => {
    if (!currentPw || !newPw) return
    const result = await changeUserPassword(currentPw, newPw)
    setPwMsg(result.success ? "Password changed successfully!" : result.error || "Failed")
    if (result.success) {
      setCurrentPw("")
      setNewPw("")
    }
    setTimeout(() => setPwMsg(""), 3000)
  }

  const userOrders = state.orders.filter((o) => o.address.fullName === user.name)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" aria-hidden="true" tabIndex={-1} onClick={onClose} onKeyDown={(e) => { if (e.key === "Escape") onClose() }} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-primary border-l border-glass-border z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="My Account"
          >
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <h2 className="text-lg font-bold text-fg-primary">My Account</h2>
              <button onClick={onClose} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Close profile">
                <X className="w-4 h-4 text-fg-primary" />
              </button>
            </div>

            <div className="flex border-b border-glass-border">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors relative flex-1 justify-center ${
                    tab === t.id ? "text-fg-primary" : "text-fg-dim hover:text-fg-muted"
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label}
                  {t.count ? <span className="text-xs gold-gradient-bg text-inverse rounded-full px-1.5 py-0.5">{t.count}</span> : null}
                  {tab === t.id && <span className="absolute bottom-0 left-2 right-2 h-0.5 gold-gradient-bg rounded-full" />}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {tab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-2xl text-inverse font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-fg-primary">{user.name}</h3>
                      <p className="text-sm text-fg-dim">{user.email}</p>
                      <p className="text-xs text-fg-dim">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-fg-muted uppercase tracking-wider">Personal Information</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label htmlFor="profile-name" className="text-xs text-fg-dim">Full Name</label>
                        <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="profile-email" className="text-xs text-fg-dim">Email</label>
                        <Input id="profile-email" value={user.email} disabled className="opacity-50" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="profile-phone" className="text-xs text-fg-dim">Phone</label>
                        <Input id="profile-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      <Button size="sm" onClick={handleSaveProfile} className="w-full">
                        <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-glass-border">
                    <h4 className="text-sm font-semibold text-fg-muted uppercase tracking-wider">Change Password</h4>
                    <div className="space-y-3">
                      <Input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Current password" />
                      <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password" />
                      <Button size="sm" variant="outline" onClick={handleChangePassword} className="w-full">Update Password</Button>
                      {pwMsg && <p className={`text-xs ${pwMsg.includes("success") ? "text-fg-primary" : "text-fg-dim"}`}>{pwMsg}</p>}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-glass-border">
                    <Button variant="ghost" size="sm" onClick={() => { logout(); onClose(); }} className="w-full text-fg-dim hover:text-fg-primary">
                      <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sign Out
                    </Button>
                  </div>
                </div>
              )}

              {tab === "addresses" && <SavedAddresses />}
              {tab === "orders" && <OrderHistory orders={userOrders} />}
              {tab === "notifications" && <NotificationsPanel userId={user.id} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
