"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Image from "next/image"

const images = [
  { image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop", label: "Fine Dining", category: "Interior" },
  { image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=400&fit=crop", label: "Signature Steak", category: "Food" },
  { image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=400&fit=crop", label: "Artisan Desserts", category: "Food" },
  { image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop", label: "Wine Collection", category: "Bar" },
  { image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop", label: "Sushi Platter", category: "Food" },
  { image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop", label: "Outdoor Seating", category: "Interior" },
  { image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop", label: "Pasta Art", category: "Food" },
  { image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop", label: "Cocktail Bar", category: "Bar" },
  { image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=400&fit=crop", label: "Lobster Thermidor", category: "Food" },
  { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop", label: "Fresh Salads", category: "Food" },
]

const categories = ["All", "Food", "Interior", "Bar"]

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)
  const [filter, setFilter] = useState("All")
  const [direction, setDirection] = useState(0)

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDirection(-1)
    setSelected((prev) => (prev! - 1 + filtered.length) % filtered.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDirection(1)
    setSelected((prev) => (prev! + 1) % filtered.length)
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  }

  return (
    <section id="gallery" className="relative section-padding px-4 sm:px-6 lg:px-8 overflow-hidden" aria-label="Gallery">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.03)_0%,_transparent_70%)]" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader
          title="Food Gallery"
          subtitle="A visual journey through the artistry of Park Fantasy — where every plate is a masterpiece"
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "gold-gradient-bg text-inverse shadow-lg shadow-fg-primary/20"
                  : "glass text-fg-muted hover:text-fg-primary border border-glass-border hover:border-fg-primary/30"
              }`}
              aria-pressed={filter === cat}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {filtered.map((img, index) => (
            <motion.div
              layout
              key={img.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="relative group cursor-pointer aspect-square rounded-2xl overflow-hidden glass hover-lift"
              onClick={() => { setDirection(0); setSelected(index) }}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.label}`}
              onKeyDown={(e) => { if (e.key === "Enter") { setDirection(0); setSelected(index) } }}
            >
              <div className="absolute inset-0">
                <Image src={img.image} alt={img.label} width={400} height={400} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-fg-primary font-semibold text-sm">{img.label}</div>
                  <div className="text-fg-muted text-xs">{img.category}</div>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <Maximize2 className="w-3.5 h-3.5 text-fg-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          {selected !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-2xl p-4"
              aria-hidden="true"
              tabIndex={-1}
              onClick={() => setSelected(null)}
              onKeyDown={(e) => { if (e.key === "Escape") setSelected(null) }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:border-fg-primary/30 transition-all z-10"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5 text-fg-primary" />
              </button>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:border-fg-primary/30 transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-fg-primary" />
              </button>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={selected}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="aspect-square rounded-3xl overflow-hidden glass-strong gold-glow">
                    <div className="w-full h-full">
                      <Image src={filtered[selected].image} alt={filtered[selected].label} width={800} height={800} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-6"
                  >
                    <div className="text-fg-primary text-2xl font-bold">{filtered[selected].label}</div>
                    <div className="text-fg-muted text-sm mt-1">{filtered[selected].category}</div>
                    <div className="text-fg-dim text-xs mt-2">
                      {selected + 1} / {filtered.length}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:border-fg-primary/30 transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-fg-primary" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
