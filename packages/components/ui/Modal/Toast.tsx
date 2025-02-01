'use client'

import { Icon } from '@/components'
import clsx from 'clsx'
import React, { createContext, useContext, useEffect, useState } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
  icon?: string
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type: ToastType, icon?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: ToastType, icon?: string) => {
    const id = Date.now().toString() // Unique ID

    // 단일 토스트 유지
    setToasts([{ id, message, type, icon }])

    setTimeout(() => {
      setToasts([])
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context.showToast
}

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (toasts.length > 0) {
      setVisible(true)

      const timeout = setTimeout(() => setVisible(false), 2700) // Fade-out before removal
      return () => clearTimeout(timeout)
    }
  }, [toasts])

  return (
    <div
      style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'mb-2 flex flex-row gap-2 rounded-lg border-2 px-6 py-8 font-semibold text-black transition-transform duration-300 ease-in-out',
            visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0',
            toast.type === 'success' ? 'bg-blue-secondary' : 'bg-red-200',
            'shadow-[0_4px_8px_0_rgba(0,0,0,0.1),0_-4px_8px_0_rgba(0,0,0,0.1)]'
          )}
        >
          {toast.icon && <Icon id={toast.icon} width={20} height={20} />}
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
