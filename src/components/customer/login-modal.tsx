"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth"

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onSwitchToRegister: () => void
  onSwitchToForgotPassword: () => void
}

export function LoginModal({ open, onClose, onSwitchToRegister, onSwitchToForgotPassword }: LoginModalProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      onClose()
    } else {
      setError(result.error || "Login failed")
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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[420px] bg-primary rounded-2xl border border-glass-border z-50 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Login"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-fg-primary">Welcome Back</h2>
                <button onClick={onClose} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-fg-primary/30 transition-colors" aria-label="Close login">
                  <X className="w-4 h-4 text-fg-primary" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm text-fg-muted">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-sm text-fg-muted">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
                    <Input
                      id="login-password"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-dim hover:text-fg-primary"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-fg-primary bg-fg-primary/10 rounded-lg px-3 py-2">{error}</p>
                )}

                <Button type="submit" size="lg" className="w-full group" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-inverse border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center space-y-2">
                <button
                  onClick={onSwitchToForgotPassword}
                  className="text-sm text-fg-dim hover:text-fg-primary transition-colors"
                >
                  Forgot your password?
                </button>
                <div className="text-sm text-fg-dim">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={onSwitchToRegister}
                    className="text-fg-primary hover:text-fg-secondary transition-colors font-medium"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
