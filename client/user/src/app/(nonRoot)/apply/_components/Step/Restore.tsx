import { RestoreIcon } from '@/app/(nonRoot)/apply/_components/Step/RestoreIcon'
import clsx from 'clsx'
import React from 'react'

interface RestoreProps {
  title: string
  price: number
  type: 'drop' | 'loose' | 'spiral'
  isClicked: boolean
  onClick: () => void
}

const Restore = ({ title, price, type, isClicked, onClick }: RestoreProps) => {
  return (
    <button
      className={clsx(
        'flex h-[7.5rem] items-center justify-between rounded-xl pl-12 pr-6 transition-colors',
        isClicked ? 'bg-blue-primary' : 'bg-blue-secondary'
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          'flex flex-col',
          isClicked ? 'text-white' : 'text-black-400'
        )}
      >
        <h3 className="flex whitespace-nowrap text-2xl font-bold">{title}</h3>
        <p className="flex text-xl">+{price.toLocaleString()}원</p>
      </div>
      <RestoreIcon type={type} isClicked={isClicked} />
    </button>
  )
}

export default Restore
