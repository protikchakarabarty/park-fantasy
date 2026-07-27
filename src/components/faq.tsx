"use client"

import { motion } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import { SectionHeader } from "@/components/ui/section-header"
import { ChevronDown } from "lucide-react"

const faqs = [
  { q: "What are your operating hours?", a: "We are open from 11:00 AM to 11:00 PM, Monday through Sunday. Our kitchen closes at 10:30 PM." },
  { q: "Do you accommodate dietary restrictions?", a: "Absolutely! We offer gluten-free, vegan, and vegetarian options. Please inform your server about any allergies or dietary needs." },
  { q: "How do I make a reservation?", a: "You can book a table through our online reservation system on this website, or call us directly at +1 (555) 123-4567." },
  { q: "What is your cancellation policy?", a: "We require 24-hour notice for cancellations. Late cancellations may incur a fee of $25 per person." },
  { q: "Do you offer catering services?", a: "Yes, we provide full-service catering for events, parties, and corporate functions. Contact our events team for a custom quote." },
  { q: "Is there parking available?", a: "Yes, we offer valet parking and a nearby parking garage. Validated parking is available for dinner guests." },
  { q: "Do you have a dress code?", a: "We recommend smart casual attire. While we don't enforce a strict dress code, we kindly ask guests to refrain from wearing beachwear." },
  { q: "Can I order online for pickup?", a: "Yes! You can order directly through our website for contactless pickup. Simply select 'Pickup' at checkout." },
]

export function FAQ() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before your visit"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <Accordion.Item value={`item-${index}`} className="glass rounded-2xl overflow-hidden border border-glass-border">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between p-5 text-left text-fg-primary font-medium hover:text-fg-secondary transition-colors group">
                      {faq.q}
                      <ChevronDown className="w-5 h-5 text-fg-primary transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    <div className="px-5 pb-5 text-fg-dim text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  )
}
