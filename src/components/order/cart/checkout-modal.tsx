"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft, ArrowRight, ShoppingBag, Check, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeliveryAddressForm } from "./delivery-address"
import { PaymentMethods } from "./payment-methods"
import { DeliveryZoneSelector } from "@/components/delivery/delivery-zone-selector"
import { useStore } from "@/lib/store"
import { calculateDeliveryFee, getEstimatedTimeRange, getAreaById } from "@/data/delivery-zones"
import type { DeliveryAddress, PaymentMethod } from "@/data/types"

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  onOrderPlaced: (orderId: string) => void
}

const emptyAddress: DeliveryAddress = {
  fullName: "",
  phone: "",
  street: "",
  city: "Jessore",
  state: "Jessore",
  zip: "7400",
  instructions: "",
}

export function CheckoutModal({ open, onClose, onOrderPlaced }: CheckoutModalProps) {
  const { state, cartSubtotal, placeOrder } = useStore()
  const [step, setStep] = useState<"zone" | "address" | "payment" | "review">("zone")
  const [selectedUpazila, setSelectedUpazila] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [address, setAddress] = useState<DeliveryAddress>(emptyAddress)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")

  const areaObj = useMemo(() => selectedArea ? getAreaById(selectedArea) : undefined, [selectedArea])
  const feeInfo = useMemo(() => selectedArea ? calculateDeliveryFee(selectedArea, cartSubtotal) : { fee: 0, label: "N/A" }, [selectedArea, cartSubtotal])
  const etaInfo = useMemo(() => selectedArea ? getEstimatedTimeRange(selectedArea) : { min: 25, max: 45, label: "25-45 min" }, [selectedArea])
  const finalDeliveryFee = feeInfo.fee
  const finalTotal = Math.max(0, cartSubtotal - state.discount + finalDeliveryFee)

  const handlePlaceOrder = () => {
    const order = placeOrder(
      { ...address, zoneId: selectedArea || undefined, upazila: selectedUpazila || undefined, area: areaObj?.name || undefined },
      paymentMethod
    )
    if (order) {
      onOrderPlaced(order.id)
    }
  }

  const isAddressValid = address.fullName && address.phone && address.street

  const stepTitles: Record<string, string> = {
    zone: "Delivery Area",
    address: "Delivery Address",
    payment: "Payment",
    review: "Review Order",
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-[5%] md:bottom-[5%] md:left-[10%] md:right-[10%] bg-primary rounded-2xl border border-glass-border z-50 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Checkout"
          >
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <div className="flex items-center gap-2">
                {step !== "zone" && (
                  <button
                    onClick={() => {
                      const steps = ["zone", "address", "payment", "review"]
                      const idx = steps.indexOf(step)
                      if (idx > 0) setStep(steps[idx - 1] as "zone" | "address" | "payment" | "review")
                    }}
                    className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-4 h-4 text-fg-primary" />
                  </button>
                )}
                <ShoppingBag className="w-5 h-5 text-fg-primary" />
                <h2 className="text-lg font-bold text-fg-primary">{stepTitles[step]}</h2>
              </div>
              <button onClick={onClose} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Close checkout">
                <X className="w-4 h-4 text-fg-primary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {step === "zone" && (
                <DeliveryZoneSelector
                  selectedUpazila={selectedUpazila}
                  selectedArea={selectedArea}
                  onUpazilaChange={setSelectedUpazila}
                  onAreaChange={setSelectedArea}
                />
              )}
              {step === "address" && (
                <DeliveryAddressForm address={address} onChange={(a) => setAddress(a)} />
              )}
              {step === "payment" && (
                <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />
              )}
              {step === "review" && (
                <div className="space-y-6">
                  {selectedArea && areaObj && (
                    <div>
                      <h3 className="text-sm font-semibold text-fg-muted mb-2">DELIVERY AREA</h3>
                      <div className="glass rounded-xl p-4 text-sm">
                        <div className="flex items-center gap-2 text-fg-primary">
                          <Navigation className="w-4 h-4" />
                          <span>{areaObj.name}, {areaObj.upazila}</span>
                          <span className="text-fg-dim">·</span>
                          <span className="text-fg-dim">{etaInfo.label}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-fg-dim">
                          <span>Delivery fee: {feeInfo.label}</span>
                          {areaObj.insideMunicipality && <span className="text-green-500">· Municipality</span>}
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-fg-muted mb-2">DELIVERING TO</h3>
                    <div className="glass rounded-xl p-4 text-sm text-fg-primary space-y-1">
                      <p className="font-medium">{address.fullName}</p>
                      <p>{address.phone}</p>
                      <p>{address.street}</p>
                      {areaObj && <p>{areaObj.name}, {selectedUpazila}, Jessore</p>}
                      {address.instructions && <p className="text-fg-dim italic">{address.instructions}</p>}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-fg-muted mb-2">PAYMENT METHOD</h3>
                    <div className="glass rounded-xl p-4 flex items-center gap-3">
                      <span className="text-xl">💳</span>
                      <span className="text-sm font-medium text-fg-primary capitalize">{paymentMethod}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-fg-muted mb-2">ORDER SUMMARY</h3>
                    <div className="glass rounded-xl p-4 space-y-2">
                      {state.cart.map((item) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span className="text-fg-primary">{item.name} × {item.quantity}</span>
                          <span className="text-fg-primary font-medium">৳{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm glass rounded-xl p-4">
                    <div className="flex justify-between text-fg-dim">
                      <span>Subtotal</span>
                      <span>৳{cartSubtotal.toFixed(0)}</span>
                    </div>
                    {state.discount > 0 && (
                      <div className="flex justify-between text-fg-primary">
                        <span>Discount</span>
                        <span>-৳{state.discount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-fg-dim">
                      <span>Delivery Fee</span>
                      <span>{finalDeliveryFee === 0 ? <span className="text-fg-primary">FREE</span> : feeInfo.label}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-fg-primary pt-2 border-t border-glass-border">
                      <span>Total</span>
                      <span>৳{Math.max(0, finalTotal).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-glass-border p-4">
              {step === "zone" && !selectedArea && (
                <Button size="lg" className="w-full" disabled>Select an area to continue</Button>
              )}
              {step === "zone" && selectedArea && (
                <Button size="lg" className="w-full" onClick={() => setStep("address")}>
                  Continue to Address
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
              {step === "address" && (
                <Button size="lg" className="w-full" disabled={!isAddressValid} onClick={() => setStep("payment")}>
                  Continue to Payment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
              {step === "payment" && (
                <Button size="lg" className="w-full" onClick={() => setStep("review")}>
                  Review Order
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
              {step === "review" && (
                <Button size="lg" className="w-full group" onClick={handlePlaceOrder}>
                  <Check className="mr-2 w-4 h-4" />
                  Confirm & Place Order — ৳{Math.max(0, finalTotal).toFixed(0)}
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
