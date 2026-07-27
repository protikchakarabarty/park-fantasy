"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Phone, Eye, EyeOff, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth"

interface RegisterModalProps {
  open: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function RegisterModal({ open, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { register } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    const result = await register(name, email, phone, password)
    setLoading(false)
    if (result.success) {
      onClose()
    } else {
      setError(result.error || "Registration failed")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[440px] bg-primary rounded-2xl border border-glass-border z-50 overflow-y-auto max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Create Account"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-fg-primary">Create Account</h2>
                <button onClick={onClose} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Close registration">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="reg-name" className="text-sm text-fg-muted">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                    <Input id="reg-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-email" className="text-sm text-fg-muted">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                    <Input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-phone" className="text-sm text-fg-muted">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                    <Input id="reg-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-password" className="text-sm text-fg-muted">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                    <Input id="reg-password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className="pl-10 pr-10" required />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-dim hover:text-fg-primary" aria-label={showPw ? "Hide password" : "Show password"}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-confirm" className="text-sm text-fg-muted">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                    <Input id="reg-confirm" type={showPw ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your password" className="pl-10 pr-10" required />
                  </div>
                </div>

                {error && <p className="text-sm text-fg-primary bg-fg-primary/10 rounded-lg px-3 py-2">{error}</p>}

                <Button type="submit" size="lg" className="w-full group" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-inverse border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-fg-dim">
                Already have an account?{" "}
                <button onClick={onSwitchToLogin} className="text-fg-primary hover:text-fg-secondary transition-colors font-medium">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
