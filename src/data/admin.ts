import type { AdminUser } from "./types"

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"
const ADMIN_NAME = process.env.NEXT_PUBLIC_ADMIN_NAME || "Park Fantasy Admin"

const ADMIN_SESSION_KEY = "park-fantasy-admin-session"

export function loginAdmin(username: string, password: string): { success: boolean; admin?: AdminUser; error?: string } {
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { success: false, error: "Invalid credentials" }
  }
  const admin: AdminUser = {
    id: "admin-1",
    username: ADMIN_USERNAME,
    password: "",
    name: ADMIN_NAME,
    role: "admin",
  }
  const session = { id: admin.id, username: admin.username, name: admin.name, role: admin.role }
  if (typeof window !== "undefined") {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  }
  return { success: true, admin }
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_SESSION_KEY)
  }
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null
  try {
    const data = localStorage.getItem(ADMIN_SESSION_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}
