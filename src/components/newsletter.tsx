"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Sparkles } from "lucide-react"

export function Newsletter() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--fg-dim), transparent, var(--fg-dim))' }} />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, var(--fg-dim), var(--bg-primary))' }} />
          <div className="relative glass border-fg-dim p-8 md:p-16 text-center">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-10 h-10 text-fg-primary mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-fg-primary mb-4">
              Stay in the <span className="gold-gradient">Loop</span>
            </h2>
            <p className="text-fg-dim max-w-lg mx-auto mb-8">
              Subscribe to our newsletter for exclusive offers, new menu updates, and special events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                aria-label="Email for newsletter"
              />
              <Button className="group whitespace-nowrap">
                Subscribe
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="text-xs text-fg-dim mt-4">
              No spam. Unsubscribe anytime. Join 10,000+ subscribers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
