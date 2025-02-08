'use client'

import clsx from 'clsx'
import { useEffect } from 'react'
import { useModal } from '../../../hooks'

export const Modal = () => {
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
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      )}
      onClick={closeModal}
    >
      <div
        className={clsx(
          'relative flex w-full max-w-lg rounded-lg bg-white p-8',
          'shadow-lg transition-transform duration-300'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  )
}
