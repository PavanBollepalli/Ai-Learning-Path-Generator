import { create } from 'zustand'

interface LandingState {
  sceneIndex: number
  nextScene: () => void
  setScene: (index: number) => void
  isLoaded: boolean
  setIsLoaded: (loaded: boolean) => void
}

export const useLandingStore = create<LandingState>((set) => ({
  sceneIndex: 0,
  nextScene: () => set((state) => ({ sceneIndex: state.sceneIndex + 1 })),
  setScene: (index) => set({ sceneIndex: index }),
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}))
