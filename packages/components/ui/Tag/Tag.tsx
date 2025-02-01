import clsx from 'clsx'
import React from 'react'

interface TagProps {
  type: 'default' | 'scanStatus' | 'orderPaymentStatus'
  size: 'sm' | 'md'
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}

const Type = {
  default: ({ children, size, variant }: TagProps) => (
    <div
      className={clsx(
        'flex items-center justify-center',
        variant === 'primary'
          ? 'bg-blue-primary text-white'
          : 'bg-blue-secondary text-blue-primary',
        size === 'sm'
          ? 'rounded-[0.25rem] px-2 py-1 text-xs'
          : 'rounded-full px-4 py-1.5 text-sm'
      )}
    >
      {children}
    </div>
  ),
  scanStatus: ({ children, size, variant }: TagProps) => (
    <div
      className={clsx(
        'rounded bg-blue-100 px-3 py-1',
        size === 'sm' ? 'text-xs' : 'text-base',
        variant === 'primary' ? 'font-bold text-blue-700' : 'text-blue-500'
      )}
    >
      {children}
    </div>
  ),
  orderPaymentStatus: ({ children, size, variant }: TagProps) => (
    <div
      className={clsx(
        'rounded bg-green-100 px-3 py-1',
        size === 'sm' ? 'text-xs' : 'text-base',
        variant === 'primary' ? 'font-bold text-green-700' : 'text-green-500'
      )}
    >
      {children}
    </div>
  ),
}

export const Tag = ({ type, size, variant, children }: TagProps) => {
  const TagComponent = Type[type as keyof typeof Type]

  return (
    <TagComponent size={size} variant={variant} type={type}>
      {children}
    </TagComponent>
  )
}
