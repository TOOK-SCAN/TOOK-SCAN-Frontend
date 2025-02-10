import type { LayoutProps } from '@/types/common'
import clsx from 'clsx'

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={clsx('min-h-full w-full bg-blue-secondary')}>
      {children}
    </div>
  )
}

export default Layout
