import type { LayoutProps } from '@/types/common'
import { Banner } from '@tookscan/components'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Banner type={1} />
      <div className="flex p-4">{children}</div>
    </div>
  )
}
