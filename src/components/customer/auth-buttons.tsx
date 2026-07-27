"use client"

import { useState } from "react"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { LoginModal } from "./login-modal"
import { RegisterModal } from "./register-modal"
import { ForgotPasswordModal } from "./forgot-password-modal"
import { ProfileSection } from "./profile-section"

export function AuthButtons() {
  const { isAuthenticated, user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  if (isAuthenticated && user) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowProfile(true)}
          className="relative"
          aria-label="My profile"
        >
          <div className="w-5 h-5 rounded-full gold-gradient-bg flex items-center justify-center text-xs text-inverse font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { logout(); setShowProfile(false) }}
          className="text-fg-dim hover:text-fg-primary"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </Button>

        <ProfileSection open={showProfile} onClose={() => setShowProfile(false)} />
      </>
    )
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
        <User className="w-3.5 h-3.5 mr-1.5" /> Sign In
      </Button>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true) }}
        onSwitchToForgotPassword={() => { setShowLogin(false); setShowForgot(true) }}
      />
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true) }}
      />
      <ForgotPasswordModal
        open={showForgot}
        onClose={() => setShowForgot(false)}
        onBackToLogin={() => { setShowForgot(false); setShowLogin(true) }}
      />
    </>
  )
}
