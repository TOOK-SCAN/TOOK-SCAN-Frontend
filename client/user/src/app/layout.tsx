import { Footer, Header } from '@/components'
import type { LayoutProps } from '@/types/common'
import {
  CommonSpriteSheet,
  ModalProvider,
  QueryProvider,
  SpriteSheet,
  ToastProvider,
} from '@tookscan/components'
import '@tookscan/styles/globals.css'
import '@tookscan/styles/reset.css'
import Head from 'next/head'

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components'

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <Head>
        <GoogleTagManager />
        <link rel="icon" type="image/png" href="/images/Logo.png" />
        <meta property="og:image" content="/images/Logo.png" />
        <meta property="og:url" content="https://tookscan.com" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <body>
        {SpriteSheet}
        {CommonSpriteSheet}
        <GoogleTagManagerNoScript />
        <QueryProvider>
          <ToastProvider>
            <ModalProvider>
              <div className="flex min-h-screen flex-col">
                <Header type="default" />
                <main className="flex-1 overflow-hidden">{children}</main>
                <div className="mt-auto">
                  <Footer />
                </div>
              </div>
            </ModalProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
