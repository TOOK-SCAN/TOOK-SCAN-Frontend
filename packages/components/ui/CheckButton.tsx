import React from 'react'
import { Icon } from './Icon/Icon'

interface CheckButtonProps {
  isChecked?: boolean
  onClick: any
  size: 'sm' | 'lg'
}

export const CheckButton = ({ isChecked, onClick, size }: CheckButtonProps) => {
  const buttonSize = size === 'lg' ? 'h-[24px] w-[24px]' : 'h-[16px] w-[16px]'
  const iconSize =
    size === 'lg' ? { width: 16, height: 16 } : { width: 10, height: 10 }

  return (
    <div className="flex px-4 py-2">
      <button
        className={`flex items-center justify-center rounded-full ${buttonSize} ${
          isChecked
            ? 'bg-blue-500 text-white'
            : 'border border-gray-300 bg-white'
        }`}
        onClick={onClick}
      >
        {isChecked && <Icon id="check" {...iconSize} />}
      </button>
    </div>
  )
}
