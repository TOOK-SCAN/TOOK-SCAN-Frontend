import React from 'react'
import { create } from 'zustand'

export type ModalState = {
  isOpen: boolean
  content: React.ReactNode | null
  openModal: (children: React.ReactNode) => void
  closeModal: () => void
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  openModal: (children) => set({ isOpen: true, content: children }),
  closeModal: () => set({ isOpen: false, content: null }),
}))
