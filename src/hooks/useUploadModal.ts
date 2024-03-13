import { create } from 'zustand'

type UploadModalStore = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const useUploadModal = create<UploadModalStore>()(set => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }
})
