import React, { Suspense } from 'react'
import type { LayoutProps } from '@/types/common'
const layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full justify-center px-36 pb-12 pt-20">
      <Suspense fallback={<div>Loading page content...</div>}>
        {children}
      </Suspense>
    </div>
  )
}

export default layout
