'use server'

import { GoogleTagManager } from '@/components'
import Head from 'next/head'

export const Meta = async () => {
  return (
    <Head>
      <GoogleTagManager />
      <link rel="icon" type="image/png" href="/images/Logo.png" />
      <meta property="og:image" content="/images/Logo.png" />
      <meta property="og:url" content="https://tookscan.com" />
      <meta property="og:locale" content="ko_KR" />
    </Head>
  )
}
