'use client'
import type { LayoutProps } from '@/types/common'

const UserInfoLayout = ({ children }: LayoutProps) => {
  return (
    <section className="mx-auto min-w-full max-w-[37.5rem] flex-col rounded-[3rem] bg-white px-[1rem] py-[2rem] shadow-sm lg:ml-[5rem] lg:p-[3rem]">
      {children}
    </section>
  )
}

export default UserInfoLayout
