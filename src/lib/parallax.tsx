"use client"

import { useEffect, useRef, useState } from "react"

interface ParallaxOptions {
  intensity?: number
  reverse?: boolean
}

export function useMouseParallax({ intensity = 0.05, reverse = false }: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) * intensity * (reverse ? -1 : 1)
      const y = (window.innerHeight / 2 - e.clientY) * intensity * (reverse ? -1 : 1)
      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [intensity, reverse])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
      ref.current.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    }
  }, [position])

  return ref
}

export function useScrollParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setOffsetY(scrollY * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${offsetY}px)`
    }
  }, [offsetY])

  return ref
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useScrollParallax(speed)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
