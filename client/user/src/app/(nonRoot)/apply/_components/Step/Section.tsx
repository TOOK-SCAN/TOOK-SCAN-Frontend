import type { LayoutProps } from '@/types/common'

const Section = ({ children }: LayoutProps) => {
  return <div className="flex flex-col gap-1">{children}</div>
}

export default Section
