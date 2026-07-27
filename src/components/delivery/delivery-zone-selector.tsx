"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, AlertCircle, Check, ChevronDown } from "lucide-react"
import { getAreasByUpazila, calculateDeliveryFee } from "@/data/delivery-zones"
import { JESSORE_UPAZILAS } from "@/data/types"

interface DeliveryZoneSelectorProps {
  selectedUpazila?: string
  selectedArea?: string
  onUpazilaChange: (upazila: string) => void
  onAreaChange: (areaId: string) => void
}

export function DeliveryZoneSelector({ selectedUpazila, selectedArea, onUpazilaChange, onAreaChange }: DeliveryZoneSelectorProps) {
  const [upazilaOpen, setUpazilaOpen] = useState(false)

  const areas = useMemo(() => (selectedUpazila ? getAreasByUpazila(selectedUpazila) : []), [selectedUpazila])

  const selectedAreaObj = useMemo(() => areas.find((a) => a.id === selectedArea), [areas, selectedArea])

  const notCovered = selectedUpazila && areas.length === 0

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-fg-primary flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-fg-primary" />
          Delivery Area
        </h3>
        <p className="text-xs text-fg-dim mb-4">Select your location in Jessore District</p>

        <div className="glass rounded-xl border border-glass-border p-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-fg-primary" />
            <span className="text-fg-muted">District:</span>
            <span className="text-fg-primary font-medium">Jessore</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <label className="text-xs text-fg-muted mb-1.5 block font-medium">Upazila</label>
        <button
          onClick={() => setUpazilaOpen(!upazilaOpen)}
          className="w-full h-12 rounded-xl border border-glass-border bg-glass px-4 flex items-center justify-between text-sm text-left focus:outline-none focus:border-fg-primary/50"
        >
          <span className={selectedUpazila ? "text-fg-primary" : "text-fg-dim"}>
            {selectedUpazila || "Select Upazila"}
          </span>
          <ChevronDown className={`w-4 h-4 text-fg-muted transition-transform ${upazilaOpen ? "rotate-180" : ""}`} />
        </button>
        {upazilaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-20 top-full left-0 right-0 mt-1 glass-strong rounded-xl border border-glass-border overflow-hidden shadow-xl"
          >
            {JESSORE_UPAZILAS.map((u) => (
              <button
                key={u}
                onClick={() => { onUpazilaChange(u); setUpazilaOpen(false) }}
                className={`w-full px-4 py-3 text-sm text-left flex items-center justify-between hover:bg-fg-primary/5 transition-colors ${
                  selectedUpazila === u ? "text-fg-primary font-medium" : "text-fg-dim"
                }`}
              >
                {u}
                {selectedUpazila === u && <Check className="w-4 h-4 text-fg-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {notCovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 glass rounded-xl border border-red-400/20 p-4"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-fg-primary">Sorry, delivery is not available in your area yet.</p>
            <p className="text-xs text-fg-dim mt-1">We are expanding soon. Check back later or choose a different Upazila.</p>
          </div>
        </motion.div>
      )}

      {areas.length > 0 && (
        <div>
          <label className="text-xs text-fg-muted mb-1.5 block font-medium">Area / Location</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {areas.map((area, i) => {
              const isSelected = selectedArea === area.id
              const { label } = calculateDeliveryFee(area.id, 0)
              return (
                <motion.button
                  key={area.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => onAreaChange(area.id)}
                  className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-fg-primary bg-fg-primary/5"
                      : "border-glass-border glass hover:border-fg-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${area.insideMunicipality ? "bg-green-500" : "bg-fg-primary"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-fg-primary truncate">{area.name}</p>
                      <div className="flex items-center gap-2 text-xs text-fg-dim">
                        <span>{label}</span>
                        {area.insideMunicipality && <span className="text-green-500">Municipality</span>}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-fg-primary shrink-0" />}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {selectedAreaObj && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-fg-primary" />
            <div>
              <p className="text-sm font-medium text-fg-primary">{selectedAreaObj.name}</p>
              <p className="text-xs text-fg-dim">{selectedAreaObj.upazila}, Jessore</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-fg-primary">৳{selectedAreaObj.fee}</p>
            <p className="text-xs text-fg-dim">Delivery fee</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
