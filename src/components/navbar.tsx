"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-provider"
import { CartIcon } from "@/components/order/cart/cart-icon"
import { CartSidebar } from "@/components/order/cart/cart-sidebar"
import { CheckoutModal } from "@/components/order/cart/checkout-modal"
import { OrderConfirmation } from "@/components/order/cart/order-confirmation"
import { OrderTracking } from "@/components/order/cart/order-tracking"
import { AuthButtons } from "@/components/customer/auth-buttons"
import { useMouseParallax } from "@/lib/parallax"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Menu", href: "#menu" },
  { label: "Offers", href: "#offers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Order", href: "#online-order" },
  { label: "Reservation", href: "#reservation" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, toggleTheme } = useTheme()
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [trackingOpen, setTrackingOpen] = useState(false)
  const [lastOrderId, setLastOrderId] = useState<string | null>(null)
  const logoRef = useMouseParallax({ intensity: 0.02 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map((l) => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "animate-header-slide fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-primary/80 backdrop-blur-2xl border-b border-glass-border shadow-lg shadow-black/10"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            <a href="#hero" className="flex items-center gap-2 group" aria-label="Park Fantasy Home">
              <div ref={logoRef} className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center gold-glow-strong group-hover:scale-110 transition-transform duration-500">
                <ChefHat className="w-5 h-5 text-inverse" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="gold-gradient">Park</span>
                <span className="text-fg-primary"> Fantasy</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm rounded-full transition-all duration-300",
                      isActive
                        ? "text-fg-primary font-medium"
                        : "text-fg-muted hover:text-fg-primary hover:bg-glass"
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-0 border border-fg-primary/30 gold-glow rounded-full" />
                    )}
                  </a>
                )
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-fg-muted hover:text-fg-primary hover:bg-glass transition-all duration-300"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} className="hover:bg-glass" aria-label="Open cart">
                <CartIcon />
              </Button>
              <AuthButtons />
              <a href="#online-order">
                <Button size="sm" className="gold-gradient-bg shadow-lg shadow-fg-primary/20">
                  Order Now
                </Button>
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 rounded-xl glass flex items-center justify-center text-fg-muted hover:text-fg-primary transition-all"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <div
          className={cn(
            "lg:hidden glass-strong border-t border-glass-border overflow-hidden transition-all duration-300 ease-out",
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm transition-all",
                      activeSection === link.href.slice(1)
                        ? "gold-gradient-bg text-inverse font-medium"
                        : "text-fg-muted hover:text-fg-primary hover:bg-glass"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex gap-2 pt-4 border-t border-glass-border">
                  <AuthButtons />
                  <a href="#online-order" onClick={() => setMobileOpen(false)} className="flex-1">
                    <Button size="sm" className="w-full gold-gradient-bg">Order Now</Button>
                  </a>
                </div>
            </div>
          </div>
      </header>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onOrderPlaced={(id) => { setCheckoutOpen(false); setLastOrderId(id); setConfirmationOpen(true) }}
      />
      <OrderConfirmation
        open={confirmationOpen}
        orderId={lastOrderId}
        onClose={() => setConfirmationOpen(false)}
        onTrackOrder={() => { setConfirmationOpen(false); setTrackingOpen(true) }}
      />
      <OrderTracking
        open={trackingOpen}
        orderId={lastOrderId}
        onClose={() => setTrackingOpen(false)}
      />
    </>
  )
}
