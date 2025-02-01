'use client'
import type { LayoutProps } from '@/types/common'

const UserInfoLayout = ({ children }: LayoutProps) => {
  return (
    <section className="w-[600px] justify-center rounded-lg bg-white p-[50px] shadow-sm">
      {children}
    </section>
  )
}

export default UserInfoLayout
