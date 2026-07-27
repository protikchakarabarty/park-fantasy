"use client"

import { Check } from "lucide-react"
import type { PaymentMethod } from "@/data/types"

const methods: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "bkash", label: "bKash", icon: "💳" },
  { id: "nagad", label: "Nagad", icon: "💳" },
  { id: "rocket", label: "Rocket", icon: "🚀" },
  { id: "visa", label: "Visa", icon: "💳" },
  { id: "mastercard", label: "Mastercard", icon: "💳" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
]

interface PaymentMethodsProps {
  selected: PaymentMethod
  onChange: (method: PaymentMethod) => void
}

export function PaymentMethods({ selected, onChange }: PaymentMethodsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-fg-primary">Payment Method</h3>
      <div className="grid grid-cols-2 gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onChange(method.id)}
            className={`relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 text-left ${
              selected === method.id
                ? "border-fg-primary bg-fg-primary/5"
                : "border-glass-border glass hover:border-fg-primary/30"
            }`}
          >
            <span className="text-xl">{method.icon}</span>
            <span className="text-sm font-medium text-fg-primary flex-1">{method.label}</span>
            {selected === method.id && (
              <div className="w-5 h-5 rounded-full gold-gradient-bg flex items-center justify-center">
                <Check className="w-3 h-3 text-inverse" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
