'use client'

import clsx from 'clsx'
import { HelperLabel, Icon } from '@/components'
import clsx from 'clsx'
import React, { useState } from 'react'
import { InputType } from 'zlib'
import { HelperLabel, Icon } from '../../components'

interface InputFieldProps {
  type: 'simple' | 'number' | 'search' | 'password'
  value?: string | number | undefined
  inputRef?: React.RefObject<HTMLInputElement>
  name?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  suffix?: string
  placeholder?: string
  helperText?: string
  disabled?: boolean
  isError?: boolean
  isSuccess?: boolean
}

export const InputField = ({
  type,
  value,
  inputRef,
  name,
  onChange,
  suffix,
  placeholder,
  helperText,
  disabled,
  isError,
  isSuccess,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    type !== 'password'
  )

  const getInputType = (type: InputType, isPasswordVisible: boolean) => {
    if (type === 'password') return isPasswordVisible ? 'text' : 'password'
    if (type === 'number') return 'number'
    return 'text'
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className={clsx(
          'bg-blue-secondary flex h-[3.125rem] flex-row items-center gap-1 rounded-lg px-[1.12rem] py-3',
          disabled && 'bg-black-200 text-black-800 cursor-not-allowed',
          isError && !disabled && 'border-status-error rounded-lg border',
          isSuccess && !disabled && 'border-status-success border'
        )}
      >
        {type === 'search' && (
          <Icon
            id="search"
            width={16}
            height={16}
            className={clsx(
              disabled && 'text-black-800',
              isFocused ? 'text-blue-primary' : 'text-black-600'
            )}
          />
        )}

        <input
          ref={inputRef}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          disabled={disabled}
          type={getInputType(type, isPasswordVisible)}
          placeholder={placeholder}
          name={name}
          className="text-black-800 w-full bg-transparent outline-none"
        />
        {suffix && <p className="text-black-400">{suffix}</p>}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 표시'}
            aria-pressed={isPasswordVisible}
          >
            <Icon
              id={isPasswordVisible ? 'openEyes' : 'closeEyes'}
              width={24}
              height={24}
              className="text-black-800"
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {helperText && (
        <span
          className={clsx(
            'text-[0.75rem]',
            isError && 'text-status-error',
            isSuccess && 'text-status-success'
          )}
        >
          <HelperLabel
            size="sm"
            type={isError ? 'error' : isSuccess ? 'success' : 'default'}
          >
            {helperText}
          </HelperLabel>
        </span>
      )}
    </div>
  )
}
