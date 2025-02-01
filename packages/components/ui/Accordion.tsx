'use client'
import clsx from 'clsx'
import { useState } from 'react'
import { CheckButton } from './CheckButton'
import { Icon } from './Icon/Icon'

interface AccordionProps {
  title: string
  contents?: string
  isCheck: boolean
  onClick: () => void
}
export const Accordion = ({
  title,
  contents,
  isCheck,
  onClick,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-blue-secondary w-full rounded-lg">
      <div className="flex items-center justify-between py-5 pl-2 pr-6 font-semibold">
        <CheckButton size="lg" isChecked={isCheck} onClick={onClick} />
        <h2 className="flex-1 text-start text-lg text-gray-800">{title}</h2>
        {contents && (
          <button
            className="flex h-6 w-6 items-center justify-center text-gray-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon
              id="arrow"
              className={clsx(
                'transition-transform',
                isOpen ? 'rotate-180' : 'rotate-0'
              )}
            />
          </button>
        )}
      </div>
      {contents && (
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ${
            isOpen ? 'max-h-40' : 'max-h-0'
          }`}
        >
          <div className="px-16 pb-4">
            <p className="text-{14px} text-gray-600">{contents}</p>
          </div>
        </div>
      )}
    </div>
  )
}
