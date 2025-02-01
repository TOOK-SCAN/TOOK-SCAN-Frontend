'use client'

import { Icon } from '@/components'
import clsx from 'clsx'
import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'error'
  size?: 'default' | 'lg' | 'md' | 'sm'
  showIcon?: boolean // 아이콘 표시 여부
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'default',
      disabled,
      showIcon = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary disabled:pointer-events-none group whitespace-nowrap'

    const variantStyles = {
      primary: 'bg-blue-primary text-white hover:bg-blue-dark hover:text-white',
      secondary:
        'bg-blue-secondary text-blue-primary hover:bg-blue-shadow hover:text-blue-dark',
      tertiary:
        'bg-white text-blue-primary border border-blue-primary hover:bg-blue-shadow hover:text-blue-dark',
      disabled: 'bg-black-100 text-black-400 cursor-not-allowed',
      error: 'bg-error text-white cursor-not-allowed',
    }

    const sizeStyles = {
      default: '',
      lg: 'text-lg py-[1.125rem] px-[1.75rem]',
      md: 'text-sm py-[0.875rem] px-[1.75rem]',
      sm: 'text-xs py-[0.625rem] px-[1.25rem]',
    }

    const isDisabled = disabled ? 'disabled' : variant

    return (
      <button
        className={clsx(
          baseStyles,
          variantStyles[isDisabled],
          sizeStyles[size],
          className
        )}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {/* 아이콘 렌더링 */}
        {showIcon && (
          <Icon
            id="plus"
            className={clsx(
              'mr-2',
              disabled
                ? 'text-black-400'
                : variant === 'secondary' || variant === 'tertiary'
                  ? 'text-blue-primary group-hover:text-white'
                  : 'text-white'
            )}
            width={20}
            height={20}
          />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
