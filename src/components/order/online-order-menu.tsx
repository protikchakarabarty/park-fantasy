"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { ShoppingBag, SlidersHorizontal } from "lucide-react"
import { SearchBar } from "./search-bar"
import { CategoryFilter } from "./category-filter"
import { ProductCard } from "./product-card"
import { FoodDetails } from "./food-details"
import { CartSidebar } from "./cart/cart-sidebar"
import { CheckoutModal } from "./cart/checkout-modal"
import { OrderConfirmation } from "./cart/order-confirmation"
import { OrderTracking } from "./cart/order-tracking"
import { useStore } from "@/lib/store"
import { getProducts, getCategories, searchProducts } from "@/data/products"
import type { Product } from "@/data/types"

interface OnlineOrderMenuProps {
  id?: string
}

export function OnlineOrderMenu({ id = "online-order" }: OnlineOrderMenuProps) {
  const { cartCount, isHydrated } = useStore()
  const [products] = useState(getProducts)
  const [categories] = useState(getCategories)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [trackingOpen, setTrackingOpen] = useState(false)
  const [lastOrderId, setLastOrderId] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : products
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory)
    }
    return result
  }, [products, activeCategory, searchQuery])

  const handleCheckout = () => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  const handleOrderPlaced = (orderId: string) => {
    setCheckoutOpen(false)
    setLastOrderId(orderId)
    setConfirmationOpen(true)
  }

  const handleTrackOrder = () => {
    setConfirmationOpen(false)
    setTrackingOpen(true)
  }

  return (
    <section id={id} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <SectionHeader
            title="Online Order Menu"
            subtitle="Browse our full menu and order your favorites"
            align="left"
          />
          <Button
            variant="default"
            size="sm"
            onClick={() => setCartOpen(true)}
            className="relative shrink-0 ml-4"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Cart
            {isHydrated && cartCount > 0 && (
              <span className="ml-1.5 w-5 h-5 rounded-full bg-inverse text-inverse text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="flex items-center gap-2 text-fg-dim text-sm" aria-live="polite" aria-atomic="true">
            <SlidersHorizontal className="w-4 h-4" />
            <span>{filteredProducts.length} items</span>
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onShowDetails={setSelectedProduct}
            />
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20" aria-live="polite">
            <p className="text-fg-dim text-lg">No items found matching your search</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <FoodDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} onOrderPlaced={handleOrderPlaced} />
      <OrderConfirmation
        open={confirmationOpen}
        orderId={lastOrderId}
        onClose={() => setConfirmationOpen(false)}
        onTrackOrder={handleTrackOrder}
      />
      <OrderTracking open={trackingOpen} orderId={lastOrderId} onClose={() => setTrackingOpen(false)} />
    </section>
  )
}
