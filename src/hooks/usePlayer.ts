import { create } from 'zustand'

type PlayerStore = {
  ids: string[]
  activeId: string | undefined
  setIds: (ids: string[]) => void
  setId: (id: string) => void
  reset: () => void
}

const usePlayer = create<PlayerStore>()(set => ({
  ids: [],
  activeId: undefined,
  setIds: (ids: string[]) => set({ ids }),
  setId: (id: string) => set({ activeId: id }),
  reset: () => set({ ids: [], activeId: undefined }),
}))

export default usePlayer
