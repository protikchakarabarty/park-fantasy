"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"

interface ViewportLazyProps {
  children: ReactNode
  rootMargin?: string
  placeholder?: ReactNode
}

export function ViewportLazy({ children, rootMargin = "200px", placeholder }: ViewportLazyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref}>
      {mounted ? children : placeholder}
    </div>
  )
}
