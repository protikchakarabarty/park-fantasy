"use client"

import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from "react"
import type { CartItem, Coupon, DeliveryAddress, Order, PaymentMethod } from "@/data/types"
import { validateCoupon, calculateDiscount } from "@/data/coupons"
import { calculateDeliveryFee, getEstimatedTimeRange } from "@/data/delivery-zones"

interface StoreState {
  cart: CartItem[]
  favorites: string[]
  orders: Order[]
  appliedCoupon: Coupon | null
  couponCode: string
  discount: number
}

type StoreAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "APPLY_COUPON"; payload: { code: string; subtotal: number } }
  | { type: "REMOVE_COUPON" }
  | { type: "PLACE_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { orderId: string; status: Order["status"] } }
  | { type: "LOAD_STATE"; payload: Partial<StoreState> }

const initialState: StoreState = {
  cart: [],
  favorites: [],
  orders: [],
  appliedCoupon: null,
  couponCode: "",
  discount: 0,
}

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.productId === action.payload.productId)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }
      return { ...state, cart: [...state.cart, action.payload] }
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.productId !== action.payload) }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return { ...state, cart: state.cart.filter((item) => item.productId !== action.payload.productId) }
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }
    case "CLEAR_CART":
      return { ...state, cart: [], appliedCoupon: null, couponCode: "", discount: 0 }
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.includes(action.payload)
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      }
    }
    case "APPLY_COUPON": {
      const result = validateCoupon(action.payload.code, action.payload.subtotal)
      if (result.valid && result.coupon) {
        const discount = calculateDiscount(action.payload.subtotal, result.coupon)
        return { ...state, appliedCoupon: result.coupon, couponCode: action.payload.code, discount }
      }
      return state
    }
    case "REMOVE_COUPON":
      return { ...state, appliedCoupon: null, couponCode: "", discount: 0 }
    case "PLACE_ORDER":
      return { ...state, orders: [action.payload, ...state.orders], cart: [] }
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      }
    case "LOAD_STATE":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

interface StoreContextType {
  state: StoreState
  dispatch: React.Dispatch<StoreAction>
  addToCart: (productId: string, name: string, price: number, image: string, emoji: string, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  applyCoupon: (code: string) => void
  removeCoupon: () => void
  cartCount: number
  cartSubtotal: number
  cartTotal: number
  deliveryFee: number
  placeOrder: (address: DeliveryAddress, paymentMethod: PaymentMethod) => Order | null
  isHydrated: boolean
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState, () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("park-fantasy-store")
        if (saved) {
          const parsed = JSON.parse(saved)
          return { ...initialState, ...parsed }
        }
      } catch {}
    }
    return initialState
  })
  const [hydrated] = useState(true)

  useEffect(() => {
    localStorage.setItem("park-fantasy-store", JSON.stringify({ cart: state.cart, favorites: state.favorites, orders: state.orders }))
  }, [state.cart, state.favorites, state.orders])

  const addToCart = (productId: string, name: string, price: number, image: string, emoji: string, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { productId, name, price, image, emoji, quantity } })
  }

  const removeFromCart = (productId: string) => dispatch({ type: "REMOVE_FROM_CART", payload: productId })

  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })

  const clearCart = () => dispatch({ type: "CLEAR_CART" })

  const toggleFavorite = (productId: string) => dispatch({ type: "TOGGLE_FAVORITE", payload: productId })

  const isFavorite = (productId: string) => state.favorites.includes(productId)

  const applyCoupon = (code: string) => {
    dispatch({ type: "APPLY_COUPON", payload: { code, subtotal: cartSubtotal } })
  }

  const removeCoupon = () => dispatch({ type: "REMOVE_COUPON" })

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  const cartSubtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const deliveryFee = 0

  const cartTotal = Math.max(0, cartSubtotal - state.discount + deliveryFee)

  const placeOrder = (address: DeliveryAddress, paymentMethod: PaymentMethod): Order | null => {
    if (state.cart.length === 0) return null
    const now = new Date()
    const areaId = address.zoneId || ""
    const feeResult = areaId ? calculateDeliveryFee(areaId, cartSubtotal) : { fee: 0, label: "N/A" }
    const fee = feeResult.fee
    const total = Math.max(0, cartSubtotal - state.discount + fee)
    const etaRange = areaId ? getEstimatedTimeRange(areaId) : { min: 30, max: 60, label: "30-60 min" }
    const eta = new Date(now.getTime() + ((etaRange.min + etaRange.max) / 2) * 60000)
    const order: Order = {
      id: `PF-${Date.now().toString(36).toUpperCase()}`,
      items: [...state.cart],
      subtotal: cartSubtotal,
      discount: state.discount,
      deliveryFee: fee,
      total,
      couponCode: state.couponCode || undefined,
      address,
      paymentMethod,
      status: "confirmed",
      createdAt: now.toISOString(),
      estimatedDelivery: eta.toISOString(),
      statusHistory: [{ status: "confirmed", time: now.toISOString() }],
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      zoneId: areaId,
    }
    dispatch({ type: "PLACE_ORDER", payload: order })
    return order
  }

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        applyCoupon,
        removeCoupon,
        cartCount,
        cartSubtotal,
        cartTotal,
        deliveryFee,
        placeOrder,
        isHydrated: hydrated,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
