'use server'

import { CommonLayout, Meta, Providers } from '@/app/_components'
import { GoogleTagManagerNoScript } from '@/components'
import type { LayoutProps } from '@/types/common'
import '@tookscan/styles/globals.css'
import '@tookscan/styles/reset.css'

const RootLayout = async ({ children }: LayoutProps) => {
  return (
    <html lang="ko">
      <Meta />
      <body>
        <GoogleTagManagerNoScript />
        <Providers>
          <CommonLayout>{children}</CommonLayout>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
