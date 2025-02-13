'use client'

import clsx from 'clsx'
import { useEffect } from 'react'
import { useModal } from '../../../hooks'

export const ModalSheet = () => {
  const { isOpen, content, closeModal } = useModal()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeModal])

  if (!isOpen) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[9999] flex items-center justify-center',
        'bg-black bg-opacity-50 backdrop-blur-sm'
      )}
      onClick={closeModal}
    >
      <div
        className={clsx(
          'relative mx-[1rem] max-h-[50rem] w-full max-w-[30rem] rounded-lg bg-white p-6',
          'shadow-xl transition-transform duration-300'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  )
}
