import type { Reservation } from "./types"

let reservations: Reservation[] = [
  {
    id: "res-1",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    customerPhone: "+1 (555) 123-4567",
    date: "2025-12-25",
    time: "19:00",
    guests: 4,
    tablePreference: "Window",
    specialRequests: "Anniversary celebration",
    status: "confirmed",
    createdAt: "2025-12-20T10:00:00Z",
    updatedAt: "2025-12-20T10:00:00Z",
  },
  {
    id: "res-2",
    customerName: "Alice Wang",
    customerEmail: "alice@example.com",
    customerPhone: "+1 (555) 234-5678",
    date: "2025-12-24",
    time: "20:00",
    guests: 6,
    tablePreference: "VIP Room",
    status: "confirmed",
    createdAt: "2025-12-18T14:30:00Z",
    updatedAt: "2025-12-18T14:30:00Z",
  },
  {
    id: "res-3",
    customerName: "Robert Brown",
    customerEmail: "robert@example.com",
    customerPhone: "+1 (555) 345-6789",
    date: "2025-12-26",
    time: "18:30",
    guests: 2,
    specialRequests: "Vegetarian options needed",
    status: "pending",
    createdAt: "2025-12-22T09:15:00Z",
    updatedAt: "2025-12-22T09:15:00Z",
  },
  {
    id: "res-4",
    customerName: "Maria Garcia",
    customerEmail: "maria@example.com",
    customerPhone: "+1 (555) 456-7890",
    date: "2025-12-23",
    time: "19:30",
    guests: 8,
    tablePreference: "Private Dining",
    status: "completed",
    createdAt: "2025-12-15T11:00:00Z",
    updatedAt: "2025-12-23T22:00:00Z",
  },
  {
    id: "res-5",
    customerName: "James Wilson",
    customerEmail: "james@example.com",
    customerPhone: "+1 (555) 567-8901",
    date: "2025-12-27",
    time: "20:00",
    guests: 3,
    status: "cancelled",
    createdAt: "2025-12-21T16:45:00Z",
    updatedAt: "2025-12-22T10:00:00Z",
  },
]

const STORAGE_KEY = "park-fantasy-reservations"

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      reservations = JSON.parse(data)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
    }
  } catch {}
}

function saveReservations(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
}

initData()

export function getReservations(): Reservation[] {
  return reservations
}

export function getReservationById(id: string): Reservation | undefined {
  return reservations.find((r) => r.id === id)
}

export function addReservation(reservation: Omit<Reservation, "id" | "createdAt" | "updatedAt">): Reservation {
  const newReservation: Reservation = {
    ...reservation,
    id: `res-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  reservations.push(newReservation)
  saveReservations()
  return newReservation
}

export function updateReservation(id: string, updates: Partial<Reservation>): Reservation | undefined {
  const idx = reservations.findIndex((r) => r.id === id)
  if (idx === -1) return undefined
  reservations[idx] = { ...reservations[idx], ...updates, updatedAt: new Date().toISOString() }
  saveReservations()
  return reservations[idx]
}

export function deleteReservation(id: string): boolean {
  const idx = reservations.findIndex((r) => r.id === id)
  if (idx === -1) return false
  reservations.splice(idx, 1)
  saveReservations()
  return true
}
