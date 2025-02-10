'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Icon } from '..'
import { useToast } from '../../../hooks'

export const ToastSheet = () => {
  const [visible, setVisible] = useState(false)
  const { isOpen, toasts } = useToast()

  useEffect(() => {
    if (toasts?.length > 0) {
      setVisible(true)

      const timeout = setTimeout(() => setVisible(false), 2700) // Fade-out before removal
      return () => clearTimeout(timeout)
    }
  }, [toasts])

  if (!isOpen) return null

  return (
    <div
      style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
    >
      {toasts?.map((toast) => (
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
