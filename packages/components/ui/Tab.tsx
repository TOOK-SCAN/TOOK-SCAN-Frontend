'use client'

export interface MenuItem {
  label: string
  link: string
}

export interface TabProps {
  item: MenuItem
  pathname: string
  handleButtonClick: (link: string) => void
}

export const Tab = ({ item, pathname, handleButtonClick }: TabProps) => {
  return (
    <button
      className={`btn2 flex-1 items-center justify-center truncate rounded-full border px-3 py-2 transition-all duration-300 ${
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
