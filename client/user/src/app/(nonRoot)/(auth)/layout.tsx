import React from 'react'
import Banner from '@tookscan/components/ui/Banner/Banner'
import type { LayoutProps } from '@/types/common'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Banner type={1} />
      {children}
    </div>
  )
}
