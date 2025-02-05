import sharedConfig from '@shared/tailwind/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  ...sharedConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...sharedConfig.theme?.extend,
      fontSize: {
        title1: ['40px', { lineHeight: '50px', letterSpacing: '0%' }],
        title2: ['32px', { lineHeight: '40px', letterSpacing: '0%' }],
        h1: ['28px', { lineHeight: '36px', letterSpacing: '0%' }],
        h2: ['24px', { lineHeight: '30px', letterSpacing: '0%' }],
        h3: ['20px', { lineHeight: '26px', letterSpacing: '0%' }],
        body1: ['20px', { lineHeight: '26px', letterSpacing: '0%' }],
        btn1: ['18px', { lineHeight: '24px', letterSpacing: '-0.25%' }],
        body2: ['16px', { lineHeight: '22px', letterSpacing: '0%' }],
        btn2: ['14px', { lineHeight: '20px', letterSpacing: '-0.25%' }],
        caption1: ['14px', { lineHeight: '18px', letterSpacing: '-0.5%' }],
        caption2: ['12px', { lineHeight: '16px', letterSpacing: '-0.5%' }],
      },
      screens: {
        sm: '640px', // 모바일
        md: '768px', // 태블릿
        lg: '1024px', // 작은 데스크탑
        xl: '1280px', // 데스크탑
        '2xl': '1536px', // 큰 화면
      },
    },
  },
}

export default config
