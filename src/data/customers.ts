import type { Customer, SavedAddress } from "./types"

let customers: Customer[] = []

function loadCustomers(): Customer[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem("park-fantasy-customers")
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveCustomers(list: Customer[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("park-fantasy-customers", JSON.stringify(list))
}

customers = loadCustomers()

export function getCustomerByEmail(email: string): Customer | undefined {
  return customers.find((c) => c.email.toLowerCase() === email.toLowerCase())
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id)
}

export function registerCustomer(
  name: string,
  email: string,
  phone: string,
  password: string
): { success: boolean; customer?: Customer; error?: string } {
  const existing = getCustomerByEmail(email)
  if (existing) {
    return { success: false, error: "An account with this email already exists" }
  }

  const customer: Customer = {
    id: `cust-${Date.now().toString(36)}`,
    name,
    email,
    phone,
    password,
    createdAt: new Date().toISOString(),
    savedAddresses: [],
    favoriteProductIds: [],
  }

  customers.push(customer)
  saveCustomers(customers)
  return { success: true, customer }
}

export function loginCustomer(
  email: string,
  password: string
): { success: boolean; customer?: Customer; error?: string } {
  const customer = getCustomerByEmail(email)
  if (!customer) {
    return { success: false, error: "No account found with this email" }
  }
  if (customer.password !== password) {
    return { success: false, error: "Incorrect password" }
  }
  return { success: true, customer }
}

export function updateCustomerProfile(
  id: string,
  updates: Partial<Pick<Customer, "name" | "phone" | "avatar">>
): Customer | undefined {
  const idx = customers.findIndex((c) => c.id === id)
  if (idx === -1) return undefined
  customers[idx] = { ...customers[idx], ...updates }
  saveCustomers(customers)
  return customers[idx]
}

export function changePassword(
  id: string,
  currentPassword: string,
  newPassword: string
): { success: boolean; error?: string } {
  const customer = getCustomerById(id)
  if (!customer) return { success: false, error: "User not found" }
  if (customer.password !== currentPassword) {
    return { success: false, error: "Current password is incorrect" }
  }
  const idx = customers.findIndex((c) => c.id === id)
  customers[idx].password = newPassword
  saveCustomers(customers)
  return { success: true }
}

export function resetPassword(
  email: string,
  newPassword: string
): { success: boolean; error?: string } {
  const customer = getCustomerByEmail(email)
  if (!customer) return { success: false, error: "No account found with this email" }
  const idx = customers.findIndex((c) => c.id === customer.id)
  customers[idx].password = newPassword
  saveCustomers(customers)
  return { success: true }
}

export function addSavedAddress(
  customerId: string,
  address: Omit<SavedAddress, "id">
): SavedAddress | undefined {
  const idx = customers.findIndex((c) => c.id === customerId)
  if (idx === -1) return undefined

  const newAddress: SavedAddress = {
    ...address,
    id: `addr-${Date.now().toString(36)}`,
  }

  if (newAddress.isDefault) {
    customers[idx].savedAddresses = customers[idx].savedAddresses.map((a) => ({
      ...a,
      isDefault: false,
    }))
  }

  customers[idx].savedAddresses.push(newAddress)
  saveCustomers(customers)
  return newAddress
}

export function updateSavedAddress(
  customerId: string,
  address: SavedAddress
): boolean {
  const idx = customers.findIndex((c) => c.id === customerId)
  if (idx === -1) return false

  if (address.isDefault) {
    customers[idx].savedAddresses = customers[idx].savedAddresses.map((a) => ({
      ...a,
      isDefault: a.id === address.id,
    }))
  }

  const addrIdx = customers[idx].savedAddresses.findIndex(
    (a) => a.id === address.id
  )
  if (addrIdx === -1) return false

  customers[idx].savedAddresses[addrIdx] = address
  saveCustomers(customers)
  return true
}

export function deleteSavedAddress(
  customerId: string,
  addressId: string
): boolean {
  const idx = customers.findIndex((c) => c.id === customerId)
  if (idx === -1) return false
  customers[idx].savedAddresses = customers[idx].savedAddresses.filter(
    (a) => a.id !== addressId
  )
  saveCustomers(customers)
  return true
}

export function toggleFavoriteProduct(
  customerId: string,
  productId: string
): { favorites: string[] } | undefined {
  const idx = customers.findIndex((c) => c.id === customerId)
  if (idx === -1) return undefined

  const exists = customers[idx].favoriteProductIds.includes(productId)
  if (exists) {
    customers[idx].favoriteProductIds = customers[idx].favoriteProductIds.filter(
      (id) => id !== productId
    )
  } else {
    customers[idx].favoriteProductIds.push(productId)
  }

  saveCustomers(customers)
  return { favorites: customers[idx].favoriteProductIds }
}
