'use client'

import clsx from 'clsx'
import * as React from 'react'
import { Icon } from '../../components'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'error'
  size?: 'default' | 'lg' | 'md' | 'sm'
  icon?: string // 아이콘 표시 여부
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'default',
      disabled,
      icon,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary disabled:pointer-events-none group'

    const variantStyles = {
      primary: 'bg-blue-primary text-white hover:bg-blue-dark hover:text-white',
      secondary:
        'w-full mx-auto bg-blue-secondary text-blue-primary hover:bg-blue-shadow hover:text-blue-dark',
      tertiary:
        'bg-white text-blue-primary border border-blue-primary hover:bg-blue-shadow hover:text-blue-dark',
      disabled: 'bg-black-100 text-black-400 cursor-not-allowed',
      error: 'bg-error text-white cursor-not-allowed',
    }

    const sizeStyles = {
      default: 'btn2 mx-auto w-full max-w-[6rem] py-2',
      lg: 'text-lg py-[1.125rem] px-[1.75rem] mx-auto  sm:w-full',
      md: 'text-sm py-[0.875rem] px-[1.75rem] mx-auto  sm:w-full',
      sm: 'text-xs py-[0.625rem] px-[1.25rem] mx-auto  sm:w-full',
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
        {icon && (
          <Icon
            id={icon}
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
