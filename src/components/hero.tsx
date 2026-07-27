"use client"

import { useRef, useState, useEffect } from "react"
import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Star, ChevronDown } from "lucide-react"

const FOOD_ITEMS = [
  { photoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop", name: "Burger", phase: 0 },
  { photoUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop", name: "Pizza", phase: (Math.PI * 2) / 5 },
  { photoUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop", name: "Pasta", phase: (Math.PI * 4) / 5 },
  { photoUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop", name: "French Fries", phase: (Math.PI * 6) / 5 },
  { photoUrl: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&h=400&fit=crop", name: "Chicken", phase: (Math.PI * 8) / 5 },
]

const RADIUS = 2.5

const FoodCard = React.memo(function FoodCard({ photoUrl, phase }: { photoUrl: string; phase: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    let cancelled = false
    const loader = new THREE.TextureLoader()
    loader.load(
      photoUrl,
      (tex) => { if (!cancelled) setTexture(tex) },
    )
    return () => { cancelled = true }
  }, [photoUrl])

  const timeRef = useRef(0)
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    if (Math.abs(t - timeRef.current) < 0.016) return
    timeRef.current = t
    groupRef.current.position.y = Math.sin(t * 0.55 + phase) * 0.3
    const s = 1 + Math.sin(t * 0.35 + phase) * 0.04
    groupRef.current.scale.setScalar(s)
    groupRef.current.rotation.x = Math.sin(t * 0.25 + phase) * 0.04
    groupRef.current.rotation.z = Math.cos(t * 0.3 + phase) * 0.04
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.08} />
      </mesh>
      <mesh>
        <planeGeometry args={[1.15, 1.15]} />
        <meshPhysicalMaterial
          map={texture}
          color={texture ? "#ffffff" : "#D4AF37"}
          transparent
          opacity={texture ? 1 : 0.12}
          side={THREE.DoubleSide}
          clearcoat={0.1}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.62, 0.68, 32]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
})

function FoodRing() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      {FOOD_ITEMS.map((item, i) => {
        const angle = (i / FOOD_ITEMS.length) * Math.PI * 2
        return (
          <group key={item.name} position={[Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS]}>
            <FoodCard photoUrl={item.photoUrl} phase={item.phase} />
          </group>
        )
      })}
    </group>
  )
}

function DecorativeRings() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.06
    }
  })

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.15, 3.35, 64]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#F5D061"
          emissiveIntensity={0.15}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          distort={0.06}
          speed={2}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[2.8, 2.9, 48]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function FoodParticles() {
  const count = 60
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 2 + Math.random() * 1.8
      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.5
      pos[i * 3 + 2] = Math.sin(theta) * r
    }
    return pos
  })
  const pointsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.015
      pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.08) * 0.08
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#D4AF37" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function HeroFood3D() {
  return (
    <>
      <DecorativeRings />
      <FoodRing />
      <FoodParticles />
    </>
  )
}

export function Hero() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "500px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) setVisible(false)
      else {
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          setVisible(rect.bottom > 0 && rect.top < window.innerHeight)
        }
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.1)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(212,175,55,0.05)_0%,_transparent_50%)]" />
      </div>

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1]} frameloop={visible ? "always" : "never"} gl={{ powerPreference: "low-power" }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 3]} intensity={2} />
          <directionalLight position={[-2, -1, 2]} intensity={0.8} color="#D4AF37" />
          <pointLight position={[0, 0, 2]} intensity={0.5} color="#F5D061" />
          <HeroFood3D />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen pt-24">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 gold-glow animate-fade-in"
              role="status"
              aria-label="Premium Dining Experience"
            >
              <Sparkles className="w-4 h-4 text-fg-primary" />
              <span className="text-sm text-fg-primary font-medium">Premium Dining Experience</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
              <span className="text-fg-primary">Taste the</span>
              <br />
              <span className="gold-gradient text-shadow">Fantasy</span>
            </h1>

            <p className="text-lg md:text-xl text-fg-dim mb-8 max-w-lg leading-relaxed">
              Indulge in an extraordinary culinary journey where every dish tells a story of passion, creativity, and unparalleled flavor.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#menu" className="inline-block hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
                <Button size="lg" className="group gold-gradient-bg shadow-lg shadow-fg-primary/20">
                  Explore Menu
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#reservation" className="inline-block hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
                <Button variant="outline" size="lg" className="border-fg-primary/30 hover:bg-fg-primary/5">
                  <Star className="mr-2 w-4 h-4" />
                  Reserve Table
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-8 flex-wrap mt-12 pt-8 border-t border-glass-border">
              {[
                { value: "150+", label: "Premium Dishes" },
                { value: "15+", label: "Expert Chefs" },
                { value: "5K+", label: "Happy Guests" },
              ].map((stat) => (
                <div key={stat.label} className="animate-fade-in">
                  <div className="text-2xl font-bold gold-gradient">{stat.value}</div>
                  <div className="text-sm text-fg-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
        <a
          href="#featured-categories"
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-fg-muted hover:text-fg-primary hover:border-fg-primary/30 transition-all animate-float"
          aria-label="Scroll to explore"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent z-10 pointer-events-none" />
    </section>
  )
}
