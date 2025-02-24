import type { LayoutProps } from '@/types/common'
import clsx from 'clsx'

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={clsx('mt-[5rem] min-h-full w-full bg-blue-secondary')}>
      {children}
    </div>
  )
}

export default Layout
