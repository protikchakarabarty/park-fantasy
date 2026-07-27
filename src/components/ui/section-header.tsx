"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "center" | "left"
  id?: string
}

export function SectionHeader({ title, subtitle, align = "center", id }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
      id={id}
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-block text-fg-primary text-sm tracking-[0.25em] uppercase font-medium mb-3"
      >
        Park Fantasy
      </motion.span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
        <span className="gold-gradient">{title}</span>
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-fg-dim text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="h-0.5 gold-gradient-bg rounded-full mx-auto mt-4"
        style={align === "left" ? { marginLeft: 0 } : undefined}
      />
    </motion.div>
  )
}
