import { create } from 'zustand'

type AuthModalStore = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const useAuthModal = create<AuthModalStore>()(set => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }
})
