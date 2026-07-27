"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  { name: "Sarah Johnson", role: "Food Critic", avatar: "👩‍🍳", rating: 5, text: "An extraordinary dining experience! The truffle wagyu burger is simply divine. The ambiance and service were impeccable." },
  { name: "Michael Chen", role: "Regular Guest", avatar: "👨‍🍳", rating: 5, text: "Park Fantasy never disappoints. Their seafood platter is the best in town. I've been coming here for years!" },
  { name: "Emily Davis", role: "Travel Blogger", avatar: "👩‍💼", rating: 5, text: "The gold leaf sushi is a work of art. This place perfectly blends creativity with taste. A must-visit!" },
  { name: "James Wilson", role: "Food Enthusiast", avatar: "👨‍💼", rating: 4, text: "Great atmosphere, amazing desserts. The chocolate lava cake is to die for. Will definitely come back." },
  { name: "Lisa Anderson", role: "Event Planner", avatar: "👩‍🎤", rating: 5, text: "We hosted our anniversary dinner here. The private dining experience was absolutely perfect." },
]

export function Reviews() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length)
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Customer Reviews"
          subtitle="Hear what our guests have to say about their Park Fantasy experience"
        />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardContent className="p-8 md:p-12 text-center">
                <Quote className="w-10 h-10 text-fg-dim mx-auto mb-6" />
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: reviews[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-fg-primary fill-current" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-fg-muted mb-6 italic leading-relaxed">
                  &ldquo;{reviews[current].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">{reviews[current].avatar}</span>
                  <div className="text-left">
                    <div className="font-semibold text-fg-primary">{reviews[current].name}</div>
                    <div className="text-sm text-fg-dim">{reviews[current].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-fg-muted" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="flex items-center justify-center p-3 min-w-[44px] min-h-[44px]"
                  aria-label={`Go to review ${i + 1}`}
                >
                  <span className={`block rounded-full transition-all duration-300 ${
                    i === current ? "bg-fg-primary w-6 h-2" : "bg-fg-dim w-2 h-2"
                  }`} />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-fg-muted" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
