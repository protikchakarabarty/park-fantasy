"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, ArrowLeft, Send, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth"

interface ForgotPasswordModalProps {
  open: boolean
  onClose: () => void
  onBackToLogin: () => void
}

export function ForgotPasswordModal({ open, onClose, onBackToLogin }: ForgotPasswordModalProps) {
  const { forgotPassword, resetUserPassword } = useAuth()
  const [step, setStep] = useState<"email" | "code" | "reset">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await forgotPassword(email)
    setLoading(false)
    if (result.success) {
      setStep("code")
    } else {
      setError(result.error || "Failed to send reset code")
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    setLoading(true)
    const result = await resetUserPassword(email, code, newPassword)
    setLoading(false)
    if (result.success) {
      onBackToLogin()
    } else {
      setError(result.error || "Failed to reset password")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" aria-hidden="true" tabIndex={-1} onClick={onClose} onKeyDown={(e) => { if (e.key === "Escape") onClose() }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[420px] bg-primary rounded-2xl border border-glass-border z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Reset Password"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {step !== "email" && (
                    <button onClick={() => setStep("email")} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Go back">
                      <ArrowLeft className="w-4 h-4 text-fg-primary" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-fg-primary">Reset Password</h2>
                </div>
                <button onClick={onClose} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Close">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>

              {step === "email" && (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <p className="text-sm text-fg-dim">Enter your email address and we&apos;ll send you a reset code.</p>
                  <div className="space-y-2">
                    <label htmlFor="fp-email" className="text-sm text-fg-muted">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                      <Input id="fp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required />
                    </div>
                  </div>
                  {error && <p className="text-sm text-fg-primary bg-fg-primary/10 rounded-lg px-3 py-2">{error}</p>}
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Reset Code</>}
                  </Button>
                </form>
              )}

              {step === "code" && (
                <form onSubmit={handleReset} className="space-y-4">
                  <p className="text-sm text-fg-dim">A reset code has been sent to <strong className="text-fg-primary">{email}</strong></p>
                  <div className="space-y-2">
                    <label htmlFor="fp-code" className="text-sm text-fg-muted">Reset Code</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                      <Input id="fp-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="fp-password" className="text-sm text-fg-muted">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                      <Input id="fp-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 6 characters" className="pl-10" required />
                    </div>
                  </div>
                  {error && <p className="text-sm text-fg-primary bg-fg-primary/10 rounded-lg px-3 py-2">{error}</p>}
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Resetting..." : <><KeyRound className="w-4 h-4 mr-2" /> Reset Password</>}
                  </Button>
                </form>
              )}

              <button onClick={onBackToLogin} className="mt-4 text-sm text-fg-dim hover:text-fg-primary transition-colors w-full text-center">
                Back to Sign In
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
