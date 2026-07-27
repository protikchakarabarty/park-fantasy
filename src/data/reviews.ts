import type { Review } from "./types"

let reviews: Review[] = [
  {
    id: "rev-1",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    rating: 5,
    comment: "Absolutely incredible dining experience! The Wagyu steak was cooked to perfection and the service was outstanding.",
    productId: "wagyu-steak",
    productName: "Wagyu Beef Steak",
    createdAt: "2025-12-15T19:30:00Z",
    isApproved: true,
    isFeatured: true,
    reply: "Thank you, Sarah! We're thrilled you enjoyed the Wagyu experience.",
  },
  {
    id: "rev-2",
    customerName: "Michael Chen",
    customerEmail: "michael@example.com",
    rating: 4,
    comment: "Great ambiance and delicious food. The truffle mushroom risotto was amazing!",
    productId: "truffle-mushroom-risotto",
    productName: "Truffle Mushroom Risotto",
    createdAt: "2025-12-10T20:15:00Z",
    isApproved: true,
    isFeatured: false,
  },
  {
    id: "rev-3",
    customerName: "Emily Rodriguez",
    customerEmail: "emily@example.com",
    rating: 5,
    comment: "Best sushi in town! The Gold Leaf Sushi Roll is a work of art. Will definitely come back.",
    productId: "gold-sushi-roll",
    productName: "Gold Leaf Sushi Roll",
    createdAt: "2025-12-05T18:45:00Z",
    isApproved: true,
    isFeatured: true,
    reply: "We appreciate your kind words, Emily! See you soon.",
  },
  {
    id: "rev-4",
    customerName: "David Kim",
    customerEmail: "david@example.com",
    rating: 3,
    comment: "Food was good but the wait time was a bit long. The lobster thermidor made up for it though!",
    productId: "lobster-thermidor",
    productName: "Lobster Thermidor",
    createdAt: "2025-11-28T20:00:00Z",
    isApproved: true,
    isFeatured: false,
  },
  {
    id: "rev-5",
    customerName: "Lisa Thompson",
    customerEmail: "lisa@example.com",
    rating: 5,
    comment: "The BBQ Ribs Platter is to die for! Perfect for meat lovers. Great portion size too.",
    productId: "bbq-ribs",
    productName: "BBQ Ribs Platter",
    createdAt: "2025-11-20T19:00:00Z",
    isApproved: false,
    isFeatured: false,
  },
]

const STORAGE_KEY = "park-fantasy-reviews"

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      reviews = JSON.parse(data)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
    }
  } catch {}
}

function saveReviews(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
}

initData()

export function getReviews(): Review[] {
  return reviews
}

export function getApprovedReviews(): Review[] {
  return reviews.filter((r) => r.isApproved)
}

export function addReview(review: Omit<Review, "id" | "createdAt">): Review {
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }
  reviews.push(newReview)
  saveReviews()
  return newReview
}

export function updateReview(id: string, updates: Partial<Review>): Review | undefined {
  const idx = reviews.findIndex((r) => r.id === id)
  if (idx === -1) return undefined
  reviews[idx] = { ...reviews[idx], ...updates }
  saveReviews()
  return reviews[idx]
}

export function deleteReview(id: string): boolean {
  const idx = reviews.findIndex((r) => r.id === id)
  if (idx === -1) return false
  reviews.splice(idx, 1)
  saveReviews()
  return true
}

export function approveReview(id: string): Review | undefined {
  return updateReview(id, { isApproved: true })
}

export function featureReview(id: string): Review | undefined {
  return updateReview(id, { isFeatured: true })
}
