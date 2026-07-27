export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  emoji: string
  category: string
  rating: number
  reviews: number
  isAvailable: boolean
  isFeatured: boolean
  isBestSeller: boolean
  ingredients?: string[]
  preparationTime?: number
  calories?: number
  badge?: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  emoji: string
  quantity: number
}

export interface Coupon {
  code: string
  type: "percentage" | "fixed"
  value: number
  minOrder: number
  maxDiscount?: number
  description: string
  isActive: boolean
}

export interface DeliveryAddress {
  fullName: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
  instructions?: string
  zoneId?: string
  label?: string
  upazila?: string
  area?: string
}

export type PaymentMethod = "bkash" | "nagad" | "rocket" | "visa" | "mastercard" | "cod"

export type OrderStatus = "confirmed" | "preparing" | "cooking" | "packed" | "out_for_delivery" | "delivered" | "cancelled"

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "confirmed",
  "preparing",
  "cooking",
  "packed",
  "out_for_delivery",
  "delivered",
]

export const ORDER_STATUS_LABELS: Record<string, string> = {
  confirmed: "Order Confirmed",
  preparing: "Preparing",
  cooking: "Cooking",
  packed: "Packed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  deliveryFee: number
  total: number
  couponCode?: string
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  status: OrderStatus
  createdAt: string
  estimatedDelivery: string
  deliveredAt?: string
  statusHistory: { status: string; time: string }[]
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  zoneId?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  password: string
  avatar?: string
  createdAt: string
  savedAddresses: SavedAddress[]
  favoriteProductIds: string[]
  notificationToken?: string
}

export interface SavedAddress {
  id: string
  label: string
  fullName: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
  instructions?: string
  zoneId?: string
  isDefault: boolean
}

export interface DeliveryArea {
  id: string
  name: string
  upazila: string
  fee: number
  isActive: boolean
  insideMunicipality: boolean
}

export const JESSORE_UPAZILAS = [
  "Jessore Sadar",
  "Jhikargachha",
  "Chaugachha",
  "Abhaynagar",
  "Bagherpara",
  "Sharsha",
  "Manirampur",
  "Keshabpur",
] as const

export type JessoreUpazila = (typeof JESSORE_UPAZILAS)[number]

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "order" | "promo" | "system"
  read: boolean
  createdAt: string
  link?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: Customer | null
  isLoading: boolean
}

// --- Admin Types ---

export interface AdminUser {
  id: string
  username: string
  password: string
  name: string
  role: "admin" | "manager" | "staff"
}

export interface AdminAuthState {
  isAuthenticated: boolean
  admin: AdminUser | null
}

// --- Combo Types ---

export interface Combo {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  emoji: string
  items: string[]
  category: string
  isAvailable: boolean
  isFeatured: boolean
  savings: number
  badge?: string
}

// --- Review Types ---

export interface Review {
  id: string
  customerId?: string
  customerName: string
  customerEmail: string
  rating: number
  comment: string
  productId?: string
  productName?: string
  createdAt: string
  isApproved: boolean
  isFeatured: boolean
  reply?: string
}

// --- Reservation Types ---

export interface Reservation {
  id: string
  customerId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  guests: number
  tablePreference?: string
  specialRequests?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
  updatedAt: string
}

// --- Analytics Types ---

export interface SalesSummary {
  todayRevenue: number
  weeklyRevenue: number
  monthlyRevenue: number
  totalOrders: number
  averageOrderValue: number
  popularItems: { productId: string; name: string; count: number; revenue: number }[]
  revenueByDay: { date: string; revenue: number; orders: number }[]
  categoryBreakdown: { category: string; revenue: number; percentage: number }[]
}

// --- Website Settings Types ---

export interface SiteSettings {
  restaurantName: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  openingHours: { day: string; open: string; close: string }[]
  socialLinks: { platform: string; url: string }[]
  heroTitle: string
  heroSubtitle: string
  deliveryRadius: number
  freeDeliveryThreshold: number
  taxRate: number
  currency: string
  isOpen: boolean
  maintenanceMode: boolean
  googlePlaceId: string
  googleLatitude: number
  googleLongitude: number
  googleMapsUrl: string
  settingsVersion?: number
}

// --- Live Kitchen Types ---

export interface KitchenVideo {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  isHomepage: boolean
  isActive: boolean
  createdAt: string
  duration: string
}

export interface LiveKitchenState {
  videos: KitchenVideo[]
  isLive: boolean
  currentViewers: number
}
