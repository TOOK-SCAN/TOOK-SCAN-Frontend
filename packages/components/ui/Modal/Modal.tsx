'use client'

import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useModal } from '../../../hooks/useModal'

interface ModalProps {
  type: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ type, children }) => {
  const { closeModal } = useModal()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      )}
      onClick={closeModal} // Close on background click
    >
      <div
        className={clsx(
          'relative flex w-full max-w-lg rounded-lg bg-white p-8',
          'shadow-lg transition-transform duration-300'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
