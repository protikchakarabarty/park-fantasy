import type { KitchenVideo, LiveKitchenState } from "./types"

const STORAGE_KEY = "park-fantasy-live-kitchen"

let liveKitchenState: LiveKitchenState = {
  videos: [],
  isLive: false,
  currentViewers: 0,
}

function initData(): void {
  if (typeof window === "undefined") return
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      liveKitchenState = JSON.parse(data)
    }
  } catch {}
}

function saveState(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(liveKitchenState))
}

initData()

export function getKitchenVideos(): KitchenVideo[] {
  return liveKitchenState.videos
}

export function getHomepageVideo(): KitchenVideo | undefined {
  return liveKitchenState.videos.find((v) => v.isHomepage && v.isActive)
}

export function addKitchenVideo(video: Omit<KitchenVideo, "id" | "createdAt">): KitchenVideo {
  const newVideo: KitchenVideo = {
    ...video,
    id: `kv-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }

  if (newVideo.isHomepage) {
    liveKitchenState.videos = liveKitchenState.videos.map((v) => ({ ...v, isHomepage: false }))
  }

  liveKitchenState.videos.push(newVideo)
  liveKitchenState.isLive = true
  saveState()
  return newVideo
}

export function updateKitchenVideo(id: string, updates: Partial<KitchenVideo>): KitchenVideo | undefined {
  const idx = liveKitchenState.videos.findIndex((v) => v.id === id)
  if (idx === -1) return undefined

  if (updates.isHomepage) {
    liveKitchenState.videos = liveKitchenState.videos.map((v) => ({ ...v, isHomepage: v.id === id }))
  }

  liveKitchenState.videos[idx] = { ...liveKitchenState.videos[idx], ...updates }
  saveState()
  return liveKitchenState.videos[idx]
}

export function deleteKitchenVideo(id: string): boolean {
  const idx = liveKitchenState.videos.findIndex((v) => v.id === id)
  if (idx === -1) return false
  liveKitchenState.videos.splice(idx, 1)
  if (liveKitchenState.videos.length === 0) {
    liveKitchenState.isLive = false
  }
  saveState()
  return true
}

export function setHomepageVideo(id: string): KitchenVideo | undefined {
  return updateKitchenVideo(id, { isHomepage: true })
}

export function getLiveKitchenState(): LiveKitchenState {
  return { ...liveKitchenState }
}

export function kitchenVideosSubscribe(callback: (videos: KitchenVideo[]) => void): () => void {
  const interval = setInterval(() => {
    initData()
    callback([...liveKitchenState.videos])
  }, 3000)
  callback([...liveKitchenState.videos])
  return () => clearInterval(interval)
}
