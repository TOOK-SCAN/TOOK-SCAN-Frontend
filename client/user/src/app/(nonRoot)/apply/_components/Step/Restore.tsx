import { RestoreIcon } from '@/app/(nonRoot)/apply/_components/Step/RestoreIcon'
import clsx from 'clsx'

interface RestoreProps {
  title: string
  price: number
  type: 'DISCARD' | 'RAW' | 'SPRING'
  isClicked: boolean
  onClick: () => void
}

const Restore = ({ title, price, type, isClicked, onClick }: RestoreProps) => {
  return (
    <button
      className={clsx(
        'mx-auto flex max-h-[5rem] w-full items-center justify-between overflow-hidden rounded-xl pl-6 pr-6 transition-colors',

        'py-4',
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
        <h3 className="mx-auto flex h-3 whitespace-nowrap font-bold">
          {title}
        </h3>
        <p className="flex body2">+{price.toLocaleString()}원</p>
      </div>
      <RestoreIcon type={type} isClicked={isClicked} />
    </button>
  )
}

export default Restore
