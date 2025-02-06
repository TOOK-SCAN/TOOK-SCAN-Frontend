import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { colors } from '../../config/color'
// 이외 필요 라이브러리나 파일 import...

const sharedConfig: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // ...프로젝트 내 사용하는 모든 파일 경로
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: [
          'Pretendard',
          'ui-sans-serif',
          'system-ui',
          'Arial',
          'sans-serif',
        ],
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      /**
       *  원하는 모든 커스텀 클래스(.title1, .h1 등) 정의
       *  - 모바일(기본) vs @screen lg(데스크톱)로 구분
       *  - rem 단위를 사용
       */
      const newUtilities = {
        // ---------------------
        // 1) Title1
        // 모바일(기본): 28px / 36px / Bold
        // 데스크톱(>=1024px): 40px / 50px / Bold
        // ---------------------
        '.title1': {
          fontSize: '1.75rem', // 28px
          lineHeight: '2.25rem', // 36px
          fontWeight: '700', // Bold
          '@screen lg': {
            fontSize: '2.5rem', // 40px
            lineHeight: '3.125rem', // 50px
          },
        },
        // ---------------------
        // 2) Title2
        // 모바일: 24px / 30px / Bold
        // 데스크톱: 32px / 40px / Bold
        // ---------------------
        '.title2': {
          fontSize: '1.5rem', // 24px
          lineHeight: '1.875rem', // 30px
          fontWeight: '700',
          '@screen lg': {
            fontSize: '2rem', // 32px
            lineHeight: '2.5rem', // 40px
          },
        },
        // ---------------------
        // 3) H1
        // 모바일: 20px / 26px / SemiBold
        // 데스크톱: 28px / 36px / SemiBold
        // ---------------------
        '.h1': {
          fontSize: '1.25rem', // 20px
          lineHeight: '1.625rem', // 26px
          fontWeight: '600', // SemiBold
          '@screen lg': {
            fontSize: '1.75rem', // 28px
            lineHeight: '2.25rem', // 36px
          },
        },
        // ---------------------
        // 4) H2
        // 모바일: 18px / 24px / SemiBold
        // 데스크톱: 24px / 30px / SemiBold
        // ---------------------
        '.h2': {
          fontSize: '1.125rem', // 18px
          lineHeight: '1.5rem', // 24px
          fontWeight: '600',
          '@screen lg': {
            fontSize: '1.5rem', // 24px
            lineHeight: '1.875rem', // 30px
          },
        },
        // ---------------------
        // 5) H3
        // 모바일: 16px / 22px / SemiBold
        // 데스크톱: 20px / 26px / SemiBold
        // ---------------------
        '.h3': {
          fontSize: '1rem', // 16px
          lineHeight: '1.375rem', // 22px
          fontWeight: '600',
          '@screen lg': {
            fontSize: '1.25rem', // 20px
            lineHeight: '1.625rem', // 26px
          },
        },
        // ---------------------
        // 6) Body1
        // 모바일: 16px / 22px / Regular
        // 데스크톱: 20px / 26px / Regular
        // ---------------------
        '.body1': {
          fontSize: '1rem', // 16px
          lineHeight: '1.375rem', // 22px
          fontWeight: '400',
          '@screen lg': {
            fontSize: '1.25rem', // 20px
            lineHeight: '1.625rem', // 26px
          },
        },
        // ---------------------
        // 7) Btn1
        // 모바일: 16px / 22px / SemiBold
        // 데스크톱: 18px / 24px / SemiBold
        // ---------------------
        '.btn1': {
          fontSize: '1rem', // 16px
          lineHeight: '1.375rem', // 22px
          fontWeight: '600',
          '@screen lg': {
            fontSize: '1.125rem', // 18px
            lineHeight: '1.5rem', // 24px
          },
        },
        // ---------------------
        // 8) Body2
        // 모바일: 14px / 20px / Regular
        // 데스크톱: 16px / 22px / Regular
        // ---------------------
        '.body2': {
          fontSize: '0.875rem', // 14px
          lineHeight: '1.25rem', // 20px
          fontWeight: '400',
          '@screen lg': {
            fontSize: '1rem', // 16px
            lineHeight: '1.375rem', // 22px
          },
        },
        // ---------------------
        // 9) Btn2
        // 모바일, 데스크톱 동일: 14px / 20px / SemiBold
        // ---------------------
        '.btn2': {
          fontSize: '0.875rem', // 14px
          lineHeight: '1.25rem', // 20px
          fontWeight: '600',
        },
        // ---------------------
        // 10) Caption1
        // 모바일: 12px / 16px / Regular
        // 데스크톱: 14px / 18px / Regular
        // ---------------------
        '.caption1': {
          fontSize: '0.75rem', // 12px
          lineHeight: '1rem', // 16px
          fontWeight: '400',
          '@screen lg': {
            fontSize: '0.875rem', // 14px
            lineHeight: '1.125rem', // 18px
          },
        },
        // ---------------------
        // 11) Caption2
        // 모바일: 9px / 14px / Regular
        // 데스크톱: 12px / 16px / Regular
        // ---------------------
        '.caption2': {
          fontSize: '0.5625rem', // 9px
          lineHeight: '0.875rem', // 14px
          fontWeight: '400',
          '@screen lg': {
            fontSize: '0.75rem', // 12px
            lineHeight: '1rem', // 16px
          },
        },
      }

      // 새 유틸리티들을 추가. responsive 옵션으로 @screen 처리 가능
      addUtilities(newUtilities)
    }),
  ],
} satisfies Config

export default sharedConfig
