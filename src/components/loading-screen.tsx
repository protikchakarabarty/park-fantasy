"use client"

import { useEffect, useState, useRef } from "react"
import { Utensils } from "lucide-react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const startTime = Date.now()
    const minDuration = 400
    const hide = () => {
      const elapsed = Date.now() - startTime
      if (elapsed >= minDuration) {
        const el = elRef.current
        if (el) {
          el.classList.add("loading-exit")
          el.addEventListener("animationend", () => setIsLoading(false), { once: true })
        }
      } else {
        setTimeout(hide, minDuration - elapsed)
      }
    }
    const raf = requestAnimationFrame(hide)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!isLoading) return null

  return (
    <div
      ref={elRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />

      <div className="relative animate-logo-reveal">
        <div className="w-24 h-24 rounded-full gold-gradient-bg flex items-center justify-center animate-gold-shimmer">
          <Utensils className="w-10 h-10 text-inverse" />
        </div>
        <div className="absolute -inset-4 rounded-full border-2 border-fg-primary/20 animate-spin-slow" />
        <div className="absolute -inset-8 rounded-full border border-fg-primary/10 animate-spin-reverse" />
      </div>

      <div className="mt-8 text-center animate-fade-up delay-400">
        <h1 className="text-3xl font-bold">
          <span className="gold-gradient">Park</span>
          <span className="text-fg-primary"> Fantasy</span>
        </h1>
        <p className="text-sm text-fg-dim mt-2">Premium Dining Experience</p>
      </div>

      <div className="mt-8 w-48 h-0.5 origin-left rounded-full gold-gradient-bg animate-loading-bar delay-600" />

      <p className="mt-6 text-xs text-fg-dim tracking-[0.3em] uppercase animate-fade-in delay-1000">
        Preparing an extraordinary experience
      </p>
    </div>
  )
}
