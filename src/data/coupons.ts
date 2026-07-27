import type { Coupon } from "./types"

const coupons: Coupon[] = [
  {
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    minOrder: 30,
    maxDiscount: 15,
    description: "20% off your first order (max $15)",
    isActive: true,
  },
  {
    code: "FREEDELIVERY",
    type: "fixed",
    value: 5,
    minOrder: 25,
    description: "Free delivery on orders above $25",
    isActive: true,
  },
  {
    code: "FEAST10",
    type: "percentage",
    value: 10,
    minOrder: 50,
    maxDiscount: 20,
    description: "10% off on orders above $50",
    isActive: true,
  },
  {
    code: "HALFOFF",
    type: "percentage",
    value: 50,
    minOrder: 80,
    maxDiscount: 30,
    description: "50% off on orders above $80 (max $30)",
    isActive: true,
  },
  {
    code: "FLAT15",
    type: "fixed",
    value: 15,
    minOrder: 60,
    description: "Flat $15 off on orders above $60",
    isActive: true,
  },
  {
    code: "HAPPY30",
    type: "percentage",
    value: 30,
    minOrder: 40,
    maxDiscount: 12,
    description: "Happy Hours! 30% off on beverages (min $40)",
    isActive: true,
  },
]

export function getCouponByCode(code: string): Coupon | undefined {
  return mutableCoupons.find(
    (c) => c.code.toLowerCase() === code.toLowerCase() && c.isActive
  )
}

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; coupon?: Coupon; message: string } {
  const coupon = getCouponByCode(code)
  if (!coupon) {
    return { valid: false, message: "Invalid or expired coupon code" }
  }
  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      message: `Minimum order of $${coupon.minOrder} required for this coupon`,
    }
  }
  return { valid: true, coupon, message: "Coupon applied successfully!" }
}

// --- Admin mutation functions ---

const COUPON_STORAGE_KEY = "park-fantasy-coupons"

let mutableCoupons: Coupon[] = [...coupons]

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const data = localStorage.getItem(COUPON_STORAGE_KEY)
    if (data) {
      mutableCoupons = JSON.parse(data)
    } else {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(mutableCoupons))
    }
  } catch {}
}

function saveCoupons(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(mutableCoupons))
}

initData()

export function getAllCoupons(): Coupon[] {
  return mutableCoupons
}

export function addCoupon(coupon: Omit<Coupon, "code"> & { code: string }): Coupon {
  const newCoupon: Coupon = { ...coupon }
  mutableCoupons.push(newCoupon)
  saveCoupons()
  return newCoupon
}

export function updateCoupon(code: string, updates: Partial<Coupon>): Coupon | undefined {
  const idx = mutableCoupons.findIndex((c) => c.code === code)
  if (idx === -1) return undefined
  mutableCoupons[idx] = { ...mutableCoupons[idx], ...updates }
  saveCoupons()
  return mutableCoupons[idx]
}

export function deleteCoupon(code: string): boolean {
  const idx = mutableCoupons.findIndex((c) => c.code === code)
  if (idx === -1) return false
  mutableCoupons.splice(idx, 1)
  saveCoupons()
  return true
}

export function calculateDiscount(
  subtotal: number,
  coupon: Coupon
): number {
  let discount = 0
  if (coupon.type === "percentage") {
    discount = (subtotal * coupon.value) / 100
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount)
    }
  } else {
    discount = coupon.value
  }
  return Math.min(discount, subtotal)
}
