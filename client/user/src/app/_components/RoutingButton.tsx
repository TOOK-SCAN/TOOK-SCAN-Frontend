'use client'

export interface MenuItem {
  label: string
  link: string
}

interface RoutingButtonProps {
  item: MenuItem
  pathname: string
  handleButtonClick: (link: string) => void
}

const RoutingButton = ({
  item,
  pathname,
  handleButtonClick,
}: RoutingButtonProps) => {
  return (
    <button
      className={`text-btn2 h-8 flex-1 items-center justify-center truncate rounded-full border px-5 py-[0.3rem] transition-all duration-300 ${
        pathname === item.link
          ? 'bg-blue-primary text-white'
          : 'bg border-gray-300 bg-white text-gray-300'
      }`}
      onClick={() => handleButtonClick(item.link)}
      title={item.label}
    >
      {item.label}
    </button>
  )
}

export default RoutingButton
