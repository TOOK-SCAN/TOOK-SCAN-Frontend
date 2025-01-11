import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['ibb.co'],
    formats: ['image/webp'],
  },

  output: 'export',

  // i18n: {
  //   locales: ['ko', 'en'],
  //   defaultLocale: 'ko',
  // },
  // i18n은 국제화를 지원하지만, `output: 'export'`에서는 사용할 수 없어 주석 처리
}

export default nextConfig
