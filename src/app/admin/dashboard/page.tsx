"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAdminSession } from "@/data/admin"

const AdminLayout = dynamic(() => import("@/components/admin/admin-layout").then((m) => ({ default: m.AdminLayout })), { ssr: false })
const FoodManagement = dynamic(() => import("@/components/admin/food-management").then((m) => ({ default: m.FoodManagement })))
const ComboManagement = dynamic(() => import("@/components/admin/combo-management").then((m) => ({ default: m.ComboManagement })))
const OfferManagement = dynamic(() => import("@/components/admin/offer-management").then((m) => ({ default: m.OfferManagement })))
const ReviewManagement = dynamic(() => import("@/components/admin/review-management").then((m) => ({ default: m.ReviewManagement })))
const ReservationManagement = dynamic(() => import("@/components/admin/reservation-management").then((m) => ({ default: m.ReservationManagement })))
const CustomerManagement = dynamic(() => import("@/components/admin/customer-management").then((m) => ({ default: m.CustomerManagement })))
const OrderManagement = dynamic(() => import("@/components/admin/order-management").then((m) => ({ default: m.OrderManagement })))
const DeliveryManagement = dynamic(() => import("@/components/admin/delivery-management").then((m) => ({ default: m.DeliveryManagement })))
const SalesAnalytics = dynamic(() => import("@/components/admin/sales-analytics").then((m) => ({ default: m.SalesAnalytics })))
const SiteSettings = dynamic(() => import("@/components/admin/site-settings").then((m) => ({ default: m.SiteSettings })))
const LiveKitchen = dynamic(() => import("@/components/admin/live-kitchen").then((m) => ({ default: m.LiveKitchen })))

export type AdminTab =
  | "food"
  | "combos"
  | "offers"
  | "reviews"
  | "reservations"
  | "customers"
  | "orders"
  | "delivery"
  | "analytics"
  | "settings"
  | "kitchen"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics")
  const [authorized] = useState(() => {
    if (typeof window !== "undefined") return getAdminSession() !== null
    return false
  })

  useEffect(() => {
    if (!authorized) router.replace("/admin")
  }, [authorized, router])

  if (!authorized) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-fg-primary/30 border-t-fg-primary rounded-full animate-spin" />
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "food": return <FoodManagement />
      case "combos": return <ComboManagement />
      case "offers": return <OfferManagement />
      case "reviews": return <ReviewManagement />
      case "reservations": return <ReservationManagement />
      case "customers": return <CustomerManagement />
      case "orders": return <OrderManagement />
      case "delivery": return <DeliveryManagement />
      case "analytics": return <SalesAnalytics />
      case "settings": return <SiteSettings />
      case "kitchen": return <LiveKitchen />
      default: return <SalesAnalytics />
    }
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  )
}
