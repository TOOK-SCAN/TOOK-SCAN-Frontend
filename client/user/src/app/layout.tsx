import '@tookscan/styles/globals.css'
import '@tookscan/styles/reset.css'
import { LayoutProps } from '@/types/common'
import Head from 'next/head'
import {
  Header,
  Footer,
  SpriteSheet,
  CommonSpriteSheet,
  ModalProvider,
  ToastProvider,
  QueryProvider,
} from '@tookscan/components'

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
