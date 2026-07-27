"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Play, Award, Users, Store, ChefHat, Quote } from "lucide-react"
import { useMouseParallax } from "@/lib/parallax"

export function About() {
  const badgeRef = useMouseParallax({ intensity: 0.03 })

  return (
    <section className="relative section-padding px-4 sm:px-6 lg:px-8 overflow-hidden" aria-label="About Park Fantasy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(212,175,55,0.03)_0%,_transparent_60%)]" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About Park Fantasy"
          subtitle="A story of passion, flavor, and extraordinary dining experiences since 2015"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
              <div className="absolute inset-0 bg-gradient-to-br from-fg-dim via-bg-secondary to-bg-primary flex items-center justify-center">
                <motion.div
                  ref={badgeRef}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-6 gold-glow-strong cursor-pointer group/vid">
                    <Play className="w-10 h-10 text-inverse ml-1 group-hover/vid:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="text-fg-primary text-sm font-medium tracking-wide">Watch Our Story</p>
                  <p className="text-fg-dim text-xs mt-1">2 min feature</p>
                </motion.div>
              </div>
              <div className="absolute inset-0 border border-glass-border rounded-3xl pointer-events-none" />
              <div className="absolute -inset-2 border border-fg-primary/10 rounded-[28px] pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <Quote className="absolute -top-4 -left-2 w-8 h-8 text-fg-primary/20" />
              <p className="text-fg-muted text-lg leading-relaxed mb-6 italic">
                Founded in 2015, Park Fantasy has grown from a humble neighborhood bistro into a premier dining destination. Our commitment to culinary excellence, innovative recipes, and warm hospitality has earned us a special place in the hearts of food lovers.
              </p>
              <p className="text-fg-dim mb-8 leading-relaxed">
                Every dish we serve is a masterpiece — crafted with the finest ingredients, inspired by global flavors, and presented with artistic flair. At Park Fantasy, we don&apos;t just serve food; we create memories that last a lifetime.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { icon: Store, value: "Since 2015", label: "Established" },
                { icon: Users, value: "50K+", label: "Happy Guests" },
                { icon: Award, value: "25+", label: "Awards Won" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="text-center p-4 glass rounded-2xl hover:border-fg-primary/30 transition-all duration-300"
                >
                  <stat.icon className="w-5 h-5 text-fg-primary mx-auto mb-2" />
                  <div className="text-lg font-bold text-fg-primary">{stat.value}</div>
                  <div className="text-xs text-fg-dim">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="gold-gradient-bg shadow-lg shadow-fg-primary/20">
                <ChefHat className="mr-2 w-4 h-4" />
                Learn More About Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
