"use client"

import { motion } from "framer-motion"
import { ChefHat, Globe, MessageCircle, Camera, Video, Heart, ArrowUp } from "lucide-react"

const footerLinks = {
  QuickLinks: [
    { label: "Home", href: "#hero" },
    { label: "Menu", href: "#menu" },
    { label: "Offers", href: "#offers" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reservation", href: "#reservation" },
    { label: "Contact", href: "#contact" },
  ],
  Categories: [
    { label: "Pizzas", href: "#menu" },
    { label: "Grills", href: "#menu" },
    { label: "Seafood", href: "#menu" },
    { label: "Desserts", href: "#menu" },
    { label: "Beverages", href: "#menu" },
  ],
  Support: [
    { label: "FAQ", href: "#faq" },
    { label: "Delivery Info", href: "#delivery" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Careers", href: "#" },
  ],
}

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Video, href: "#", label: "YouTube" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-glass-border bg-primary" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto flex items-center gap-2 text-fg-dim hover:text-fg-primary transition-colors mb-12 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          <span className="text-xs tracking-widest uppercase">Back to top</span>
        </motion.button>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-12"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 mb-6 group">
              <div className="w-11 h-11 rounded-full gold-gradient-bg flex items-center justify-center gold-glow group-hover:scale-110 transition-transform duration-500">
                <ChefHat className="w-5 h-5 text-inverse" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="gold-gradient">Park</span>
                <span className="text-fg-primary"> Fantasy</span>
              </span>
            </a>
            <p className="text-fg-dim text-sm mb-6 max-w-sm leading-relaxed">
              Experience the finest dining where every dish is a masterpiece, crafted with passion and served with elegance in an unforgettable setting.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-fg-primary/30 hover:text-fg-primary hover:gold-glow transition-all duration-300 text-fg-dim"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={itemVariants}>
              <h3 className="text-fg-primary font-semibold mb-5 text-sm tracking-wide">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-fg-dim hover:text-fg-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-fg-dim">
            &copy; {new Date().getFullYear()} Park Fantasy. All rights reserved.
          </p>
          <p className="text-sm text-fg-dim flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-fg-primary fill-current" /> by Park Fantasy Team
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
