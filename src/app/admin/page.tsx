"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, Shield } from "lucide-react"
import { loginAdmin, getAdminSession } from "@/data/admin"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const session = getAdminSession()
    if (session) {
      router.replace("/admin/dashboard")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      const result = loginAdmin(username, password)
      if (result.success) {
        router.replace("/admin/dashboard")
      } else {
        setError(result.error || "Login failed")
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl border border-glass-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-inverse" />
            </div>
            <h1 className="text-2xl font-bold text-fg-primary">Admin Login</h1>
            <p className="text-sm text-fg-dim mt-1">Park Fantasy Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-fg-muted mb-1.5 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex h-12 w-full rounded-xl border border-glass-border bg-glass px-4 py-3 text-sm text-fg-primary placeholder:text-fg-dim focus:outline-none focus:border-fg-primary/50 focus:ring-1 focus:ring-fg-primary/30 transition-all duration-300"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="text-sm text-fg-muted mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-glass-border bg-glass px-4 py-3 pr-10 text-sm text-fg-primary placeholder:text-fg-dim focus:outline-none focus:border-fg-primary/50 focus:ring-1 focus:ring-fg-primary/30 transition-all duration-300"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-dim hover:text-fg-primary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 gold-gradient-bg text-inverse rounded-full font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-fg-dim mt-6">
            Default: admin / admin123
          </p>
        </div>
      </motion.div>
    </div>
  )
}
