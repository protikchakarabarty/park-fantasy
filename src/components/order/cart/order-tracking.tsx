"use client"

import { useStore } from "@/lib/store"
import { LiveDeliveryTracking } from "@/components/delivery/live-delivery-tracking"

interface OrderTrackingProps {
  open: boolean
  orderId: string | null
  onClose: () => void
}

export function OrderTracking({ open, orderId, onClose }: OrderTrackingProps) {
  const { state } = useStore()
  const order = state.orders.find((o) => o.id === orderId)
  if (!order) return null
  return (
    <LiveDeliveryTracking
      open={open}
      order={order}
      onClose={onClose}
    />
  )
}
