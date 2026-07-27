import type { Notification } from "./types"

let notifications: Notification[] = []

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const data = localStorage.getItem("park-fantasy-notifications")
    if (data) {
      notifications = JSON.parse(data)
    }
  } catch {}
}

function saveNotifications() {
  if (typeof window === "undefined") return
  localStorage.setItem("park-fantasy-notifications", JSON.stringify(notifications))
}

initData()

export function getNotificationsForUser(userId: string): Notification[] {
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getUnreadCount(userId: string): number {
  return notifications.filter((n) => n.userId === userId && !n.read).length
}

export function addNotification(
  notification: Omit<Notification, "id" | "createdAt">
): Notification {
  const newNotif: Notification = {
    ...notification,
    id: `notif-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }
  notifications.push(newNotif)
  saveNotifications()
  return newNotif
}

export function markNotificationRead(notificationId: string): boolean {
  const idx = notifications.findIndex((n) => n.id === notificationId)
  if (idx === -1) return false
  notifications[idx].read = true
  saveNotifications()
  return true
}

export function markAllRead(userId: string): boolean {
  let changed = false
  notifications = notifications.map((n) => {
    if (n.userId === userId && !n.read) {
      changed = true
      return { ...n, read: true }
    }
    return n
  })
  if (changed) saveNotifications()
  return changed
}

export function createOrderNotification(
  userId: string,
  orderId: string,
  status: string
): Notification {
  const messages: Record<string, string> = {
    confirmed: "Your order has been confirmed and is being processed.",
    preparing: "We're getting fresh ingredients ready for your order.",
    cooking: "Your food is being cooked by our expert chefs!",
    packed: "Your order has been carefully packed and is ready for pickup.",
    out_for_delivery: "Your order is on its way! Our delivery partner is heading to you.",
    delivered: "Your order has been delivered! Enjoy your meal!",
    cancelled: "Your order has been cancelled. Contact us for details.",
  }

  const titles: Record<string, string> = {
    confirmed: "Order Confirmed 🎉",
    preparing: "Preparing Your Order",
    cooking: "Cooking in Progress 👨‍🍳",
    packed: "Order Packed 📦",
    out_for_delivery: "Out for Delivery 🚗",
    delivered: "Delivered! ✅",
    cancelled: "Order Cancelled",
  }

  return addNotification({
    userId,
    title: titles[status] || "Order Update",
    message: messages[status] || `Your order ${orderId} has been updated to: ${status}`,
    type: "order",
    read: false,
    link: `#order-${orderId}`,
  })
}
