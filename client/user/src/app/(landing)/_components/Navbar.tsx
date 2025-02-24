import clsx from 'clsx'

interface NavBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const NavBar = ({ activeTab, onTabChange }: NavBarProps) => {
  const navItems = [
    { label: '툭스캔은?', href: 'home' },
    { label: '이용방법', href: 'howToUse' },
    { label: '가격안내', href: 'pricing' },
  ]

  return (
    <nav className="flex h-[4rem] items-center justify-center space-x-[1rem] bg-black text-white h1 lg:h-[7rem] lg:space-x-[1.5rem]">
      {navItems.map(({ label, href }) => (
        <button
          key={href}
          onClick={() => onTabChange(href)}
          className={clsx(
            'relative px-4 py-2 transition-colors duration-300 after:absolute after:bottom-[-0.7rem] after:left-0 after:h-[4px] after:w-full hover:text-blue-primary hover:after:bg-blue-primary lg:after:bottom-[-1.8rem]',
            activeTab === href
              ? 'text-blue-primary after:bg-blue-primary'
              : 'text-white after:bg-transparent'
          )}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
export default NavBar
