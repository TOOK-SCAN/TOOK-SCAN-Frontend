import React from 'react'
import { Banner } from '@tookscan/components'
import { LayoutProps } from '@/types/common'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <Banner type={1} />
      {children}
    </div>
  )
}
