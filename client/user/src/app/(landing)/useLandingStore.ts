import { create } from 'zustand'

type LandingState = {
  activeTab: 'home' | 'howToUse' | 'pricing'
  setActiveTab: (tab: LandingState['activeTab']) => void
}

export const useLandingStore = create<LandingState>((set) => ({
  activeTab: 'home', // 기본값
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
