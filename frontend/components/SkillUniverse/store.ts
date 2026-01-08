import { create } from 'zustand'

interface SkillUniverseState {
    sceneIndex: number
    nextScene: () => void
    setScene: (index: number) => void
    isLoaded: boolean
    setIsLoaded: (loaded: boolean) => void
}

export const useSkillStore = create<SkillUniverseState>((set) => ({
    sceneIndex: 0,
    nextScene: () => set((state) => ({ sceneIndex: Math.min(state.sceneIndex + 1, 4) })), // Max scene 4 (0-4 = 5 scenes)
    setScene: (index) => set({ sceneIndex: index }),
    isLoaded: false,
    setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}))
