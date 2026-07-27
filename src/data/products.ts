import type { Product } from "./types"

let products: Product[] = [
  {
    id: "pizza-margherita",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil on a thin, crispy crust.",
    price: 18,
    originalPrice: 22,
    emoji: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    category: "Pizza",
    rating: 4.8,
    reviews: 156,
    isAvailable: true,
    isFeatured: true,
    isBestSeller: true,
    ingredients: ["San Marzano tomatoes", "Fresh mozzarella", "Basil", "Olive oil", "Sourdough crust"],
    preparationTime: 20,
    calories: 850,
    badge: "Bestseller",
  },
  {
    id: "truffle-wagyu-burger",
    name: "Truffle Wagyu Burger",
    description: "Premium wagyu beef patty with black truffle aioli, aged cheddar, caramelized onions, and arugula on a brioche bun.",
    price: 32,
    emoji: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    category: "Burgers",
    rating: 4.9,
    reviews: 342,
    isAvailable: true,
    isFeatured: true,
    isBestSeller: true,
    ingredients: ["Wagyu beef patty", "Truffle aioli", "Aged cheddar", "Caramelized onions", "Brioche bun"],
    preparationTime: 25,
    calories: 1100,
    badge: "Chef Special",
  },
  {
    id: "lobster-thermidor",
    name: "Lobster Thermidor",
    description: "Whole lobster baked with a creamy mustard-cheese sauce, gratinated to golden perfection.",
    price: 48,
    originalPrice: 58,
    emoji: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=400&fit=crop",
    category: "Seafood",
    rating: 4.8,
    reviews: 256,
    isAvailable: true,
    isFeatured: true,
    isBestSeller: true,
    ingredients: ["Whole lobster", "Mustard cream sauce", "Gruyère cheese", "White wine", "Breadcrumbs"],
    preparationTime: 35,
    calories: 680,
    badge: "Premium",
  },
  {
    id: "gold-sushi-roll",
    name: "Gold Leaf Sushi Roll",
    description: "Premium sushi roll with fresh salmon, avocado, and edible gold leaf, served with wasabi and pickled ginger.",
    price: 38,
    emoji: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop",
    category: "Sushi",
    rating: 4.9,
    reviews: 189,
    isAvailable: true,
    isFeatured: true,
    isBestSeller: false,
    ingredients: ["Fresh salmon", "Avocado", "Edible gold leaf", "Sushi rice", "Nori"],
    preparationTime: 20,
    calories: 420,
    badge: "Premium",
  },
  {
    id: "grilled-salmon",
    name: "Grilled Atlantic Salmon",
    description: "Norwegian salmon fillet with herb crust, served with lemon butter sauce and seasonal vegetables.",
    price: 34,
    originalPrice: 40,
    emoji: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop",
    category: "Seafood",
    rating: 4.7,
    reviews: 198,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: true,
    ingredients: ["Atlantic salmon", "Herb crust", "Lemon butter", "Seasonal vegetables"],
    preparationTime: 25,
    calories: 520,
    badge: "Popular",
  },
  {
    id: "bbq-ribs",
    name: "BBQ Ribs Platter",
    description: "Slow-cooked pork ribs glazed with house-made BBQ sauce, served with coleslaw and fries.",
    price: 36,
    emoji: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
    category: "Grills",
    rating: 4.8,
    reviews: 312,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: true,
    ingredients: ["Pork ribs", "House BBQ sauce", "Coleslaw", "Fries", "Pickles"],
    preparationTime: 30,
    calories: 980,
    badge: "Popular",
  },
  {
    id: "dragon-roll",
    name: "Dragon Roll",
    description: "Shrimp tempura, cucumber, and avocado topped with eel and unagi sauce.",
    price: 24,
    emoji: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=400&fit=crop",
    category: "Sushi",
    rating: 4.9,
    reviews: 276,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Shrimp tempura", "Cucumber", "Avocado", "Eel", "Unagi sauce"],
    preparationTime: 18,
    calories: 380,
    badge: "Chef's Pick",
  },
  {
    id: "wagyu-steak",
    name: "Wagyu Beef Steak",
    description: "Prime A5 wagyu steak with truffle mashed potatoes, grilled asparagus, and red wine jus.",
    price: 52,
    emoji: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop",
    category: "Grills",
    rating: 4.9,
    reviews: 145,
    isAvailable: true,
    isFeatured: true,
    isBestSeller: true,
    ingredients: ["A5 Wagyu beef", "Truffle mash", "Asparagus", "Red wine jus"],
    preparationTime: 30,
    calories: 890,
    badge: "Premium",
  },
  {
    id: "pasta-carbonara",
    name: "Pasta Carbonara",
    description: "Spaghetti with pancetta, egg yolk, pecorino romano, and black pepper. A Roman classic.",
    price: 22,
    emoji: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    category: "Pasta",
    rating: 4.7,
    reviews: 234,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Spaghetti", "Pancetta", "Egg yolk", "Pecorino romano", "Black pepper"],
    preparationTime: 20,
    calories: 720,
  },
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, house-made Caesar dressing, croutons, and shaved parmesan.",
    price: 16,
    emoji: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=400&fit=crop",
    category: "Salads",
    rating: 4.5,
    reviews: 167,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan"],
    preparationTime: 10,
    calories: 340,
  },
  {
    id: "tiramisu",
    name: "Classic Tiramisu",
    description: "Coffee-soaked ladyfingers layered with mascarpone cream and dusted with cocoa.",
    price: 14,
    emoji: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop",
    category: "Desserts",
    rating: 4.8,
    reviews: 423,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: true,
    ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Cocoa powder"],
    preparationTime: 5,
    calories: 450,
    badge: "Popular",
  },
  {
    id: "chocolate-lava",
    name: "Chocolate Lava Cake",
    description: "Warm dark chocolate cake with a molten center, served with vanilla ice cream.",
    price: 16,
    emoji: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=400&fit=crop",
    category: "Desserts",
    rating: 4.9,
    reviews: 387,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: true,
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Flour", "Vanilla ice cream"],
    preparationTime: 15,
    calories: 580,
    badge: "Chef's Pick",
  },
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    description: "Creamy yogurt drink blended with ripe Alphonso mangoes and a hint of cardamom.",
    price: 8,
    emoji: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop",
    category: "Beverages",
    rating: 4.6,
    reviews: 198,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Yogurt", "Alphonso mango", "Cardamom", "Sugar"],
    preparationTime: 5,
    calories: 210,
  },
  {
    id: "espresso",
    name: "Double Espresso",
    description: "Rich double shot of our house-roasted Italian espresso blend.",
    price: 5,
    emoji: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop",
    category: "Beverages",
    rating: 4.7,
    reviews: 445,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    preparationTime: 3,
    calories: 10,
  },
  {
    id: "grilled-prawns",
    name: "Grilled Jumbo Prawns",
    description: "Jumbo prawns marinated in garlic, lemon, and herbs, grilled to perfection.",
    price: 28,
    emoji: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=400&fit=crop",
    category: "Seafood",
    rating: 4.8,
    reviews: 189,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Jumbo prawns", "Garlic", "Lemon", "Mixed herbs", "Butter"],
    preparationTime: 20,
    calories: 310,
    badge: "Chef's Pick",
  },
  {
    id: "veggie-buddha",
    name: "Veggie Buddha Bowl",
    description: "Quinoa, roasted sweet potato, avocado, chickpeas, kale, and tahini dressing.",
    price: 18,
    emoji: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
    category: "Salads",
    rating: 4.6,
    reviews: 134,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Quinoa", "Sweet potato", "Avocado", "Chickpeas", "Tahini"],
    preparationTime: 15,
    calories: 450,
  },
  {
    id: "crispy-calamari",
    name: "Crispy Calamari",
    description: "Lightly battered calamari rings fried golden, served with marinara and lemon aioli.",
    price: 16,
    emoji: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop",
    category: "Appetizers",
    rating: 4.6,
    reviews: 278,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Calamari", "Flour batter", "Marinara", "Lemon aioli"],
    preparationTime: 12,
    calories: 390,
  },
  {
    id: "truffle-mushroom-risotto",
    name: "Truffle Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan.",
    price: 26,
    emoji: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop",
    category: "Pasta",
    rating: 4.7,
    reviews: 212,
    isAvailable: true,
    isFeatured: false,
    isBestSeller: false,
    ingredients: ["Arborio rice", "Wild mushrooms", "Truffle oil", "Parmesan", "White wine"],
    preparationTime: 25,
    calories: 580,
  },
]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products
  return products.filter((p) => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  )
}

export function getCategories(): string[] {
  const cats = new Set(products.map((p) => p.category))
  return ["All", ...Array.from(cats)]
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured)
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller)
}

// --- Admin mutation functions ---

export function addProduct(product: Omit<Product, "id">): Product {
  const newProduct: Product = { ...product, id: `product-${Date.now().toString(36)}` }
  products.push(newProduct)
  saveProducts()
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  products[idx] = { ...products[idx], ...updates }
  saveProducts()
  return products[idx]
}

export function deleteProduct(id: string): boolean {
  const idx = products.findIndex((p) => p.id === id)
  if (idx === -1) return false
  products.splice(idx, 1)
  saveProducts()
  return true
}

export function addCategory(name: string): string[] {
  const cats = new Set(products.map((p) => p.category))
  cats.add(name)
  saveProducts()
  return ["All", ...Array.from(cats)]
}

const PRODUCT_STORAGE_KEY = "park-fantasy-products"

function saveProducts(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products))
}

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        products = parsed
      }
    } else {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products))
    }
  } catch {}
}
initData()

export { products }
