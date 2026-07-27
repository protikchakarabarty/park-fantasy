import type { DeliveryArea } from "./types"

const STORAGE_KEY = "park-fantasy-delivery-areas"

const defaultAreas: DeliveryArea[] = [
  { id: "jessore-sadar-1", name: "Kalur Road", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-2", name: "Pouro Park", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-3", name: "Benapole Road", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-4", name: "Chanchra", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-5", name: "Jhaor Para", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-6", name: "Rajbari Road", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-7", name: "Jessore University Area", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-8", name: "Amber Shah Road", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-9", name: "Kabi Sufia Road", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },
  { id: "jessore-sadar-10", name: "Dhalpara", upazila: "Jessore Sadar", fee: 40, isActive: true, insideMunicipality: true },

  { id: "jhikargachha-1", name: "Jhikargachha Town", upazila: "Jhikargachha", fee: 70, isActive: true, insideMunicipality: false },
  { id: "jhikargachha-2", name: "Narikelbaria", upazila: "Jhikargachha", fee: 80, isActive: true, insideMunicipality: false },
  { id: "jhikargachha-3", name: "Shankarpur", upazila: "Jhikargachha", fee: 80, isActive: true, insideMunicipality: false },
  { id: "jhikargachha-4", name: "Gopalpur", upazila: "Jhikargachha", fee: 90, isActive: true, insideMunicipality: false },
  { id: "jhikargachha-5", name: "Panisara", upazila: "Jhikargachha", fee: 80, isActive: true, insideMunicipality: false },

  { id: "chaugachha-1", name: "Chaugachha Town", upazila: "Chaugachha", fee: 80, isActive: true, insideMunicipality: false },
  { id: "chaugachha-2", name: "Dhuliani", upazila: "Chaugachha", fee: 90, isActive: true, insideMunicipality: false },
  { id: "chaugachha-3", name: "Patibila", upazila: "Chaugachha", fee: 90, isActive: true, insideMunicipality: false },
  { id: "chaugachha-4", name: "Maharajpur", upazila: "Chaugachha", fee: 100, isActive: true, insideMunicipality: false },
  { id: "chaugachha-5", name: "Kashimpur", upazila: "Chaugachha", fee: 90, isActive: true, insideMunicipality: false },

  { id: "abhaynagar-1", name: "Abhaynagar Town", upazila: "Abhaynagar", fee: 60, isActive: true, insideMunicipality: false },
  { id: "abhaynagar-2", name: "Prembagh", upazila: "Abhaynagar", fee: 70, isActive: true, insideMunicipality: false },
  { id: "abhaynagar-3", name: "Sreedharpur", upazila: "Abhaynagar", fee: 70, isActive: true, insideMunicipality: false },
  { id: "abhaynagar-4", name: "Siddhipasha", upazila: "Abhaynagar", fee: 80, isActive: true, insideMunicipality: false },
  { id: "abhaynagar-5", name: "Bhandaria", upazila: "Abhaynagar", fee: 80, isActive: true, insideMunicipality: false },
  { id: "abhaynagar-6", name: "Nayapara", upazila: "Abhaynagar", fee: 70, isActive: true, insideMunicipality: false },

  { id: "bagherpara-1", name: "Bagherpara Town", upazila: "Bagherpara", fee: 70, isActive: true, insideMunicipality: false },
  { id: "bagherpara-2", name: "Basuari", upazila: "Bagherpara", fee: 80, isActive: true, insideMunicipality: false },
  { id: "bagherpara-3", name: "Jamdia", upazila: "Bagherpara", fee: 80, isActive: true, insideMunicipality: false },
  { id: "bagherpara-4", name: "Dohakula", upazila: "Bagherpara", fee: 90, isActive: true, insideMunicipality: false },
  { id: "bagherpara-5", name: "Raipasha", upazila: "Bagherpara", fee: 90, isActive: true, insideMunicipality: false },

  { id: "sharsha-1", name: "Sharsha Town", upazila: "Sharsha", fee: 80, isActive: true, insideMunicipality: false },
  { id: "sharsha-2", name: "Bagachra", upazila: "Sharsha", fee: 90, isActive: true, insideMunicipality: false },
  { id: "sharsha-3", name: "Navaron", upazila: "Sharsha", fee: 90, isActive: true, insideMunicipality: false },
  { id: "sharsha-4", name: "Putkhali", upazila: "Sharsha", fee: 100, isActive: true, insideMunicipality: false },
  { id: "sharsha-5", name: "Kayemtola", upazila: "Sharsha", fee: 100, isActive: true, insideMunicipality: false },
  { id: "sharsha-6", name: "Ullshi", upazila: "Sharsha", fee: 100, isActive: true, insideMunicipality: false },
  { id: "sharsha-7", name: "Ghongra", upazila: "Sharsha", fee: 100, isActive: true, insideMunicipality: false },
  { id: "sharsha-8", name: "Laxmanpur", upazila: "Sharsha", fee: 100, isActive: true, insideMunicipality: false },

  { id: "manirampur-1", name: "Manirampur Town", upazila: "Manirampur", fee: 70, isActive: true, insideMunicipality: false },
  { id: "manirampur-2", name: "Monoharpur", upazila: "Manirampur", fee: 80, isActive: true, insideMunicipality: false },
  { id: "manirampur-3", name: "Dhakuria", upazila: "Manirampur", fee: 80, isActive: true, insideMunicipality: false },
  { id: "manirampur-4", name: "Haroharpur", upazila: "Manirampur", fee: 90, isActive: true, insideMunicipality: false },
  { id: "manirampur-5", name: "Kashimnagar", upazila: "Manirampur", fee: 90, isActive: true, insideMunicipality: false },
  { id: "manirampur-6", name: "Kulia", upazila: "Manirampur", fee: 90, isActive: true, insideMunicipality: false },

  { id: "keshabpur-1", name: "Keshabpur Town", upazila: "Keshabpur", fee: 70, isActive: true, insideMunicipality: false },
  { id: "keshabpur-2", name: "Bagdi", upazila: "Keshabpur", fee: 80, isActive: true, insideMunicipality: false },
  { id: "keshabpur-3", name: "Gaurighona", upazila: "Keshabpur", fee: 90, isActive: true, insideMunicipality: false },
  { id: "keshabpur-4", name: "Majidpur", upazila: "Keshabpur", fee: 90, isActive: true, insideMunicipality: false },
  { id: "keshabpur-5", name: "Monglalkot", upazila: "Keshabpur", fee: 90, isActive: true, insideMunicipality: false },
  { id: "keshabpur-6", name: "Bidyanandakati", upazila: "Keshabpur", fee: 90, isActive: true, insideMunicipality: false },
]

let areas: DeliveryArea[] = [...defaultAreas]

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      areas = JSON.parse(data)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(areas))
    }
  } catch {}
}

function saveAreas(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(areas))
}

initData()

export function getDeliveryAreas(): DeliveryArea[] {
  return [...areas]
}

export function getActiveAreas(): DeliveryArea[] {
  return areas.filter((a) => a.isActive)
}

export function getAreasByUpazila(upazila: string): DeliveryArea[] {
  return areas.filter((a) => a.upazila === upazila && a.isActive)
}

export function getAreaById(id: string): DeliveryArea | undefined {
  return areas.find((a) => a.id === id)
}

export function addDeliveryArea(area: Omit<DeliveryArea, "id">): DeliveryArea {
  const newArea: DeliveryArea = { ...area, id: `area-${Date.now()}` }
  areas.push(newArea)
  saveAreas()
  return newArea
}

export function updateDeliveryArea(id: string, updates: Partial<DeliveryArea>): DeliveryArea | undefined {
  const idx = areas.findIndex((a) => a.id === id)
  if (idx === -1) return
  areas[idx] = { ...areas[idx], ...updates }
  saveAreas()
  return areas[idx]
}

export function deleteDeliveryArea(id: string): void {
  areas = areas.filter((a) => a.id !== id)
  saveAreas()
}

export function toggleAreaActive(id: string): DeliveryArea | undefined {
  const area = areas.find((a) => a.id === id)
  if (!area) return
  area.isActive = !area.isActive
  saveAreas()
  return area
}

export function calculateDeliveryFee(areaId: string, subtotal: number): { fee: number; label: string } {
  const area = getAreaById(areaId)
  if (!area || !area.isActive) return { fee: 0, label: "N/A" }
  const freeThreshold = 1000
  if (subtotal >= freeThreshold) return { fee: 0, label: "FREE" }
  return { fee: area.fee, label: `৳${area.fee}` }
}

export function getEstimatedTimeRange(areaId: string): { min: number; max: number; label: string } {
  const area = getAreaById(areaId)
  if (!area) return { min: 30, max: 60, label: "30-60 min" }
  if (area.insideMunicipality) return { min: 15, max: 30, label: "15-30 min" }
  const upazila = area.upazila
  const times: Record<string, { min: number; max: number }> = {
    "Jessore Sadar": { min: 15, max: 35 },
    "Abhaynagar": { min: 25, max: 45 },
    "Bagherpara": { min: 25, max: 45 },
    "Jhikargachha": { min: 30, max: 50 },
    "Manirampur": { min: 30, max: 50 },
    "Keshabpur": { min: 30, max: 50 },
    "Chaugachha": { min: 35, max: 55 },
    "Sharsha": { min: 35, max: 60 },
  }
  const t = times[upazila] || { min: 30, max: 60 }
  return { min: t.min, max: t.max, label: `${t.min}-${t.max} min` }
}
