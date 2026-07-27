import type { SalesSummary, Order, CartItem } from "./types"
import { getProducts } from "./products"

const STORAGE_KEY = "park-fantasy-orders"

function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function getSalesSummary(): SalesSummary {
  const orders = getStoredOrders()
  const now = new Date()
  const today = now.toDateString()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const todayOrders = orders.filter((o: Order) => new Date(o.createdAt).toDateString() === today)
  const weekOrders = orders.filter((o: Order) => new Date(o.createdAt) >= weekAgo)
  const monthOrders = orders.filter((o: Order) => new Date(o.createdAt) >= monthAgo)

  const todayRevenue = todayOrders.reduce((sum: number, o: Order) => sum + o.total, 0)
  const weeklyRevenue = weekOrders.reduce((sum: number, o: Order) => sum + o.total, 0)
  const monthlyRevenue = monthOrders.reduce((sum: number, o: Order) => sum + o.total, 0)

  const totalOrders = orders.length
  const averageOrderValue = totalOrders > 0 ? orders.reduce((sum: number, o: Order) => sum + o.total, 0) / totalOrders : 0

  const itemCounts: Record<string, { name: string; count: number; revenue: number }> = {}
  orders.forEach((o: Order) => {
    ;(o.items || []).forEach((item: CartItem) => {
      if (!itemCounts[item.productId]) {
        itemCounts[item.productId] = { name: item.name, count: 0, revenue: 0 }
      }
      itemCounts[item.productId].count += item.quantity
      itemCounts[item.productId].revenue += item.price * item.quantity
    })
  })

  const popularItems = Object.entries(itemCounts)
    .map(([productId, data]) => ({ productId, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const revenueByDayMap: Record<string, { revenue: number; orders: number }> = {}
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const key = d.toDateString()
    revenueByDayMap[key] = { revenue: 0, orders: 0 }
  }
  weekOrders.forEach((o: Order) => {
    const key = new Date(o.createdAt).toDateString()
    if (revenueByDayMap[key]) {
      revenueByDayMap[key].revenue += o.total
      revenueByDayMap[key].orders += 1
    }
  })

  const revenueByDay = Object.entries(revenueByDayMap).map(([date, data]) => ({
    date,
    revenue: data.revenue,
    orders: data.orders,
  }))

  const categoryRevenue: Record<string, number> = {}
  const products = getProducts()
  monthOrders.forEach((o: Order) => {
    ;(o.items || []).forEach((item: CartItem) => {
      const product = products.find((p) => p.id === item.productId)
      const cat = product?.category || "Other"
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + item.price * item.quantity
    })
  })

  const totalCatRevenue = Object.values(categoryRevenue).reduce((a, b) => a + b, 0)
  const categoryBreakdown = Object.entries(categoryRevenue)
    .map(([category, revenue]) => ({
      category,
      revenue,
      percentage: totalCatRevenue > 0 ? Math.round((revenue / totalCatRevenue) * 100) : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)

  return {
    todayRevenue,
    weeklyRevenue,
    monthlyRevenue,
    totalOrders,
    averageOrderValue,
    popularItems,
    revenueByDay,
    categoryBreakdown,
  }
}

export function generateSampleOrders(): void {
  if (typeof window === "undefined") return
  const existing = localStorage.getItem(STORAGE_KEY)
  if (existing && JSON.parse(existing).length > 0) return

  const products = getProducts()
  const sampleOrders = [
    { day: 0, items: [products[0], products[10]], hour: 19 },
    { day: 1, items: [products[1], products[11], products[14]], hour: 20 },
    { day: 2, items: [products[3], products[5]], hour: 18 },
    { day: 3, items: [products[6], products[8], products[12]], hour: 19 },
    { day: 4, items: [products[2], products[13]], hour: 20 },
    { day: 5, items: [products[4], products[7]], hour: 18 },
    { day: 6, items: [products[0], products[9], products[14]], hour: 19 },
  ]

  const now = new Date()
  const orders = sampleOrders.map((sample) => {
    const date = new Date(now.getTime() - sample.day * 24 * 60 * 60 * 1000)
    date.setHours(sample.hour, Math.floor(Math.random() * 60), 0, 0)
    const items = sample.items.map((p) => ({
      productId: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      emoji: p.emoji,
      quantity: Math.floor(Math.random() * 2) + 1,
    }))
    const subtotal = items.reduce((s: number, i: CartItem) => s + i.price * i.quantity, 0)
    const deliveryFee = subtotal >= 1000 ? 0 : 40
    return {
      id: `PF-SAMPLE-${Date.now().toString(36).toUpperCase()}-${sample.day}`,
      items,
      subtotal,
      discount: 0,
      deliveryFee,
      total: subtotal + deliveryFee,
      address: {
        fullName: "Sample Customer",
        phone: "01XXXXXXXXX",
        street: "Kalur Road",
        city: "Jessore",
        state: "Jessore",
        zip: "7400",
      },
      paymentMethod: "cod",
      status: "delivered",
      createdAt: date.toISOString(),
      estimatedDelivery: new Date(date.getTime() + 35 * 60000).toISOString(),
      deliveredAt: new Date(date.getTime() + 50 * 60000).toISOString(),
      statusHistory: [{ status: "confirmed", time: date.toISOString() }],
      paymentStatus: "paid",
    }
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}
