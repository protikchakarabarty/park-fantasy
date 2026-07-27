"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Customer, SavedAddress } from "@/data/types"
import {
  registerCustomer,
  loginCustomer,
  getCustomerById,
  updateCustomerProfile,
  changePassword,
  resetPassword,
  addSavedAddress,
  updateSavedAddress,
  deleteSavedAddress,
  toggleFavoriteProduct,
} from "@/data/customers"
import { addNotification } from "@/data/notifications"

interface AuthContextType {
  user: Customer | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  resetUserPassword: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (updates: Partial<Pick<Customer, "name" | "phone" | "avatar">>) => void
  changeUserPassword: (current: string, newPw: string) => Promise<{ success: boolean; error?: string }>
  addAddress: (address: Omit<SavedAddress, "id">) => SavedAddress | undefined
  updateAddress: (address: SavedAddress) => boolean
  deleteAddress: (addressId: string) => boolean
  toggleFav: (productId: string) => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Customer | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const stored = localStorage.getItem("park-fantasy-session")
      if (stored) {
        const parsed = JSON.parse(stored)
        return getCustomerById(parsed.id) ?? null
      }
    } catch {
      localStorage.removeItem("park-fantasy-session")
    }
    return null
  })
  const [isLoading] = useState(false)

  const saveSession = (customer: Customer) => {
    localStorage.setItem(
      "park-fantasy-session",
      JSON.stringify({ id: customer.id, email: customer.email })
    )
  }

  const login = useCallback(async (email: string, password: string) => {
    const result = loginCustomer(email, password)
    if (result.success && result.customer) {
      setUser(result.customer)
      saveSession(result.customer)
    }
    return { success: result.success, error: result.error }
  }, [])

  const register = useCallback(
    async (name: string, email: string, phone: string, password: string) => {
      const result = registerCustomer(name, email, phone, password)
      if (result.success && result.customer) {
        setUser(result.customer)
        saveSession(result.customer)
        addNotification({
          userId: result.customer.id,
          title: "Welcome to Park Fantasy! 🎉",
          message: "Your account has been created successfully. Start ordering your favorite dishes!",
          type: "system",
          read: false,
        })
      }
      return { success: result.success, error: result.error }
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("park-fantasy-session")
  }, [])

  const forgotPassword = useCallback(async (email: string) => {
    const existing = await import("@/data/customers").then((m) => m.getCustomerByEmail(email))
    if (!existing) {
      return { success: false, error: "No account found with this email" }
    }
    return { success: true }
  }, [])

  const resetUserPassword = useCallback(
    async (email: string, _code: string, newPassword: string) => {
      const result = resetPassword(email, newPassword)
      return { success: result.success, error: result.error }
    },
    []
  )

  const updateProfile = useCallback(
    (updates: Partial<Pick<Customer, "name" | "phone" | "avatar">>) => {
      if (!user) return
      const updated = updateCustomerProfile(user.id, updates)
      if (updated) setUser(updated)
    },
    [user]
  )

  const changeUserPassword = useCallback(async (current: string, newPw: string) => {
    if (!user) return { success: false, error: "Not authenticated" }
    return changePassword(user.id, current, newPw)
  }, [user])

  const refreshUser = useCallback(() => {
    if (!user) return
    const fresh = getCustomerById(user.id)
    if (fresh) setUser(fresh)
  }, [user])

  const addAddress = useCallback(
    (address: Omit<SavedAddress, "id">) => {
      if (!user) return undefined
      const result = addSavedAddress(user.id, address)
      if (result) refreshUser()
      return result
    },
    [user, refreshUser]
  )

  const updateAddress = useCallback(
    (address: SavedAddress) => {
      if (!user) return false
      const result = updateSavedAddress(user.id, address)
      if (result) refreshUser()
      return result
    },
    [user, refreshUser]
  )

  const deleteAddress = useCallback(
    (addressId: string) => {
      if (!user) return false
      const result = deleteSavedAddress(user.id, addressId)
      if (result) refreshUser()
      return result
    },
    [user, refreshUser]
  )

  const toggleFav = useCallback(
    (productId: string) => {
      if (!user) return
      const result = toggleFavoriteProduct(user.id, productId)
      if (result) refreshUser()
    },
    [user, refreshUser]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        forgotPassword,
        resetUserPassword,
        updateProfile,
        changeUserPassword,
        addAddress,
        updateAddress,
        deleteAddress,
        toggleFav,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
