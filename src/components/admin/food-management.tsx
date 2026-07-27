"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Pencil, Trash2, X, Search, Tag,
} from "lucide-react"
import {
  getProducts, addProduct, updateProduct, deleteProduct, getCategories, addCategory,
} from "@/data/products"
import type { Product } from "@/data/types"

const emptyProduct = {
  name: "", description: "", price: 0, emoji: "", image: "",
  category: "Pizza", rating: 4.5, reviews: 0,
  isAvailable: true, isFeatured: false, isBestSeller: false,
  preparationTime: 15, calories: 0, badge: "",
  ingredients: [] as string[],
  originalPrice: undefined as number | undefined,
}

export function FoodManagement() {
  const [products, setProducts] = useState<Product[]>(() => getProducts())
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<Omit<Product, "id">>({ ...emptyProduct })
  const [categories, setCategories] = useState<string[]>(() => getCategories().filter((c) => c !== "All"))
  const [newCategory, setNewCategory] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)

  const refresh = () => {
    setProducts(getProducts())
    setCategories(getCategories().filter((c) => c !== "All"))
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => {
    setEditingProduct(null)
    setForm({ ...emptyProduct })
    setShowForm(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      emoji: product.emoji,
      image: product.image,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      isAvailable: product.isAvailable,
      isFeatured: product.isFeatured,
      isBestSeller: product.isBestSeller,
      preparationTime: product.preparationTime || 15,
      calories: product.calories || 0,
      badge: product.badge || "",
      ingredients: product.ingredients || [],
    })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    if (!form.emoji || !form.image) return
    if (editingProduct) {
      updateProduct(editingProduct.id, form)
    } else {
      addProduct(form)
    }
    setShowForm(false)
    refresh()
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this item?")) {
      deleteProduct(id)
      refresh()
    }
  }

  const handleDiscountToggle = () => {
    setForm({
      ...form,
      originalPrice: form.originalPrice ? undefined : form.price + 5,
    })
  }

  const addIngredient = () => {
    setForm({ ...form, ingredients: [...(form.ingredients ?? []), ""] })
  }

  const updateIngredient = (idx: number, val: string) => {
    const updated = [...(form.ingredients ?? [])]
    updated[idx] = val
    setForm({ ...form, ingredients: updated })
  }

  const removeIngredient = (idx: number) => {
    const current = form.ingredients ?? []
    setForm({
      ...form,
      ingredients: current.filter((_: string, i: number) => i !== idx),
    })
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim())
      setNewCategory("")
      setShowAddCategory(false)
      refresh()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Food Management</h1>
        <button onClick={openAdd} className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Add Food
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search foods..."
            className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary placeholder:text-fg-dim focus:outline-none focus:border-fg-primary/50"
          />
        </div>
        <button
          onClick={() => setShowAddCategory(!showAddCategory)}
          className="h-10 px-4 rounded-xl border border-glass-border text-fg-muted hover:text-fg-primary text-sm flex items-center gap-2"
        >
          <Tag className="w-4 h-4" /> Categories
        </button>
      </div>

      {showAddCategory && (
        <div className="glass rounded-xl p-4 mb-6 flex items-center gap-3">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name..."
            className="flex-1 h-10 rounded-xl border border-glass-border bg-glass px-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50"
          />
          <button onClick={handleAddCategory} className="h-10 px-4 gold-gradient-bg text-inverse rounded-full text-sm font-medium">Add</button>
          <button onClick={() => setShowAddCategory(false)} aria-label="Close" className="w-11 h-11 rounded-xl glass flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <motion.div
            key={product.id}
            layout
            className="glass rounded-xl border border-glass-border p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl shrink-0">
                {product.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-fg-primary truncate">{product.name}</h3>
                <p className="text-xs text-fg-dim">{product.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(product)} aria-label="Edit item" className="w-11 h-11 rounded-lg glass flex items-center justify-center hover:border-fg-primary/30">
                  <Pencil className="w-3.5 h-3.5 text-fg-muted" />
                </button>
                <button onClick={() => handleDelete(product.id)} aria-label="Delete item" className="w-11 h-11 rounded-lg glass flex items-center justify-center hover:border-red-400/30">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-fg-muted mb-2">
              <span className="font-semibold text-fg-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className="ml-auto">{product.isAvailable ? "● Available" : "○ Unavailable"}</span>
            </div>
            <p className="text-xs text-fg-dim line-clamp-2">{product.description}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              aria-hidden="true"
              tabIndex={-1}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowForm(false)}
              onKeyDown={(e) => { if (e.key === "Escape") setShowForm(false) }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-[5%] md:bottom-[5%] md:left-[20%] md:right-[20%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Food Form"
            >
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <h2 className="text-lg font-bold text-fg-primary">
                  {editingProduct ? "Edit Food" : "Add Food"}
                </h2>
                <button onClick={() => setShowForm(false)} aria-label="Close modal" className="w-11 h-11 rounded-full glass flex items-center justify-center">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Name *</label>
                    <input aria-label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Emoji</label>
                    <input aria-label="Emoji" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Description</label>
                  <textarea aria-label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-xl border border-glass-border bg-glass px-3 py-2 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50 resize-none h-20" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Price *</label>
                    <input aria-label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Original Price</label>
                    <input aria-label="Original Price" type="number" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: parseFloat(e.target.value) || undefined })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Category</label>
                    <select aria-label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50">
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-fg-muted mb-1 block">Prep Time (min)</label>
                    <input aria-label="Prep Time" type="number" value={form.preparationTime} onChange={(e) => setForm({ ...form, preparationTime: parseInt(e.target.value) || 0 })}
                      className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                      className="accent-fg-primary" /> Available
                  </label>
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="accent-fg-primary" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
                      className="accent-fg-primary" /> Best Seller
                  </label>
                  <label className="flex items-center gap-2 text-sm text-fg-muted">
                    <input type="checkbox" checked={!!form.originalPrice} onChange={handleDiscountToggle}
                      className="accent-fg-primary" /> Has Discount
                  </label>
                </div>

                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Badge</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Bestseller, Premium, Chef Special"
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-fg-muted">Ingredients</label>
                    <button onClick={addIngredient} className="text-xs text-fg-primary hover:underline">+ Add</button>
                  </div>
                  <div className="space-y-2">
                    {(form.ingredients ?? []).map((ing: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <input value={ing} onChange={(e) => updateIngredient(i, e.target.value)}
                          className="flex-1 h-9 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                        <button onClick={() => removeIngredient(i)} aria-label="Remove ingredient" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                          <X className="w-3 h-3 text-fg-dim" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-fg-muted mb-1 block">Image URL</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/images/your-image.jpg"
                    className="w-full h-10 rounded-xl border border-glass-border bg-glass px-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                </div>
              </div>
              <div className="border-t border-glass-border p-4 flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 h-11 rounded-xl border border-glass-border text-fg-muted text-sm">Cancel</button>
                <button onClick={handleSave} className="flex-1 h-11 gold-gradient-bg text-inverse rounded-full text-sm font-medium">
                  {editingProduct ? "Save Changes" : "Add Food"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
