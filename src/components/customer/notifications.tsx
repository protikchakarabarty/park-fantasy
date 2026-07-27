"use client"

import { useState, useEffect } from "react"
import { Bell, CheckCheck, Package, Tag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getNotificationsForUser, markAllRead, markNotificationRead } from "@/data/notifications"
import type { Notification } from "@/data/types"

interface NotificationsPanelProps {
  userId: string
}

const typeIcons = {
  order: Package,
  promo: Tag,
  system: Info,
}

export function NotificationsPanel({ userId }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>(() => getNotificationsForUser(userId))

  useEffect(() => {
    const interval = setInterval(() => setNotifications(getNotificationsForUser(userId)), 5000)
    return () => clearInterval(interval)
  }, [userId])

  const handleMarkRead = (id: string) => {
    markNotificationRead(id)
    setNotifications(getNotificationsForUser(userId))
  }

  const handleMarkAllRead = () => {
    markAllRead(userId)
    setNotifications(getNotificationsForUser(userId))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider">Notifications</h3>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-xs h-7">
            <CheckCheck className="w-3 h-3 mr-1" /> Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12" aria-live="polite">
          <Bell className="w-10 h-10 text-fg-dim mx-auto mb-2" />
          <p className="text-sm text-fg-dim">No notifications yet</p>
        </div>
      ) : (
        <div aria-live="polite" aria-atomic="false">
        {notifications.map((notif) => {
          const Icon = typeIcons[notif.type]
          return (
            <div
              key={notif.id}
              className={`glass rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                !notif.read ? "border-fg-primary/20" : ""
              }`}
              onClick={() => handleMarkRead(notif.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleMarkRead(notif.id) } }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  notif.type === "order" ? "gold-gradient-bg" : notif.type === "promo" ? "bg-fg-primary/20" : "bg-glass"
                }`}>
                  <Icon className={`w-4 h-4 ${notif.type === "order" ? "text-inverse" : "text-fg-primary"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm ${!notif.read ? "text-fg-primary font-semibold" : "text-fg-muted"}`}>
                      {notif.title}
                    </p>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-fg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-fg-dim mt-0.5">{notif.message}</p>
                  <p className="text-xs text-fg-dim mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        </div>
      )}
    </div>
  )
}
