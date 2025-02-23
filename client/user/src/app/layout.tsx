'use server'

import { CommonLayout, Meta, Providers } from '@/app/_components'
import MaintenancePage from '@/app/maintenance/maintenance'
import { GoogleTagManagerNoScript } from '@/components'
import type { LayoutProps } from '@/types/common'
import '@tookscan/styles/globals.css'
import '@tookscan/styles/reset.css'

const RootLayout = async ({ children }: LayoutProps) => {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

  if (isMaintenanceMode) {
    return (
      <html lang="ko">
        <Meta />
        <body>
          <GoogleTagManagerNoScript />
          <Providers>
            <MaintenancePage />
          </Providers>
        </body>
      </html>
    )
  }
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
