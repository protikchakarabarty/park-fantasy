"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Send } from "lucide-react"

export function Reservation() {
  return (
    <section id="reservation" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Table Reservation"
          subtitle="Book your table for an unforgettable dining experience"
        />
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-fg-muted flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-fg-primary" /> Date
                    </label>
                    <Input type="date" aria-label="Date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-fg-muted flex items-center gap-2">
                      <Clock className="w-4 h-4 text-fg-primary" /> Time
                    </label>
                    <Input type="time" aria-label="Time" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-fg-muted flex items-center gap-2">
                      <Users className="w-4 h-4 text-fg-primary" /> Guests
                    </label>
                    <select
                      aria-label="Number of guests"
                      className="flex h-12 w-full rounded-xl border border-glass-border bg-glass px-4 py-3 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50 focus:ring-1 focus:ring-fg-primary/30 transition-all duration-300"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n} className="bg-primary">
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-fg-muted">Full Name</label>
                    <Input placeholder="John Doe" aria-label="Full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-fg-muted">Email</label>
                    <Input type="email" placeholder="john@example.com" aria-label="Email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-fg-muted">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" aria-label="Phone" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm text-fg-muted">Special Requests</label>
                    <Textarea placeholder="Any dietary requirements or special occasions..." aria-label="Special requests" />
                  </div>
                </div>
                <div className="mt-6">
                  <Button size="lg" className="w-full group">
                    <Send className="w-4 h-4 mr-2" />
                    Confirm Reservation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
