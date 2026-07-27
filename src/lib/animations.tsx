"use client"

import { useRef, useEffect } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function init() {
      const gsapModule = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      if (cancelled) return
      gsapModule.default.registerPlugin(ScrollTrigger)

      const ctx = gsapModule.default.context(() => {
        ScrollTrigger.defaults({
          toggleActions: "play none none reverse",
        })
      }, containerRef.current!)

      return () => ctx.revert()
    }
    init()
    return () => { cancelled = true }
  }, [])

  return <div ref={containerRef}>{children}</div>
}
