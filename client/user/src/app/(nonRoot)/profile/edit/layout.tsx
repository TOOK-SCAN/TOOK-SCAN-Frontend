'use client'
import type { LayoutProps } from '@/types/common'

const UserInfoLayout = ({ children }: LayoutProps) => {
  return (
    <section className="mx-auto min-w-full max-w-[37.5rem] flex-col rounded-[3rem] bg-white p-[50px] shadow-sm lg:ml-[5rem]">
      {children}
    </section>
  )
}

export default UserInfoLayout
