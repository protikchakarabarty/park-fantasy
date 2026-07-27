import type { Combo } from "./types"

let combos: Combo[] = [
  {
    id: "combo-1",
    name: "Family Feast",
    description: "Perfect for 4-6 people. Includes 2 large pizzas, 1 pasta, 4 drinks, and garlic bread.",
    price: 79,
    originalPrice: 98,
    emoji: "👨‍👩‍👧‍👦",
    image: "/images/combo-family.jpg",
    items: ["pizza-margherita", "pasta-carbonara", "mango-lassi"],
    category: "Family Deals",
    isAvailable: true,
    isFeatured: true,
    savings: 19,
    badge: "Best Value",
  },
  {
    id: "combo-2",
    name: "Romantic Dinner",
    description: "A romantic meal for two with steak, wine, and dessert.",
    price: 89,
    originalPrice: 110,
    emoji: "💑",
    image: "/images/combo-romantic.jpg",
    items: ["wagyu-steak", "chocolate-lava"],
    category: "Couples",
    isAvailable: true,
    isFeatured: true,
    savings: 21,
    badge: "Popular",
  },
  {
    id: "combo-3",
    name: "Lunch Express",
    description: "Quick lunch combo with a burger, fries, and a drink.",
    price: 22,
    originalPrice: 28,
    emoji: "🍔",
    image: "/images/combo-lunch.jpg",
    items: ["truffle-wagyu-burger", "mango-lassi"],
    category: "Lunch Deals",
    isAvailable: true,
    isFeatured: false,
    savings: 6,
  },
]

const STORAGE_KEY = "park-fantasy-combos"

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      combos = JSON.parse(data)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(combos))
    }
  } catch {}
}

function saveCombos(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(combos))
}

initData()

export function getCombos(): Combo[] {
  return combos
}

export function getComboById(id: string): Combo | undefined {
  return combos.find((c) => c.id === id)
}

export function addCombo(combo: Omit<Combo, "id">): Combo {
  const newCombo: Combo = { ...combo, id: `combo-${Date.now().toString(36)}` }
  combos.push(newCombo)
  saveCombos()
  return newCombo
}

export function updateCombo(id: string, updates: Partial<Combo>): Combo | undefined {
  const idx = combos.findIndex((c) => c.id === id)
  if (idx === -1) return undefined
  combos[idx] = { ...combos[idx], ...updates }
  saveCombos()
  return combos[idx]
}

export function deleteCombo(id: string): boolean {
  const idx = combos.findIndex((c) => c.id === id)
  if (idx === -1) return false
  combos.splice(idx, 1)
  saveCombos()
  return true
}
