import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  icon?: string
}

export type ToastState = {
  isOpen: boolean
  toasts: Toast[]
  showToast: (message: string, type: ToastType, icon?: string) => void
  removeToast: (id: string) => void
}

export const useToast = create<ToastState>((set) => ({
  isOpen: false,
  toasts: [],

  showToast: (message, type, icon) => {
    const id = Date.now().toString()
    set({ isOpen: true, toasts: [{ id, message, type, icon }] })

    setTimeout(() => {
      set({ isOpen: false, toasts: [] })
    }, 3000)
  },
  removeToast: (id) =>
    set((state) => ({
      isOpen: false,
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
