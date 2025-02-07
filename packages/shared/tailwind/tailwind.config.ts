import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { colors } from '../../config/color'

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
      const newUtilities = {
        '.title1': {
          fontSize: '1.75rem', // 28px
          lineHeight: '2.25rem', // 36px
          fontWeight: '700', // Bold
          '@screen lg': {
            fontSize: '2.5rem', // 40px
            lineHeight: '3.125rem', // 50px
          },
        },

        '.title2': {
          fontSize: '1.5rem', // 24px
          lineHeight: '1.875rem', // 30px
          fontWeight: '700',
          '@screen lg': {
            fontSize: '2rem', // 32px
            lineHeight: '2.5rem', // 40px
          },
        },

        '.h1': {
          fontSize: '1.25rem', // 20px
          lineHeight: '1.625rem', // 26px
          fontWeight: '600', // SemiBold
          '@screen lg': {
            fontSize: '1.75rem', // 28px
            lineHeight: '2.25rem', // 36px
          },
        },

        '.h2': {
          fontSize: '1.125rem', // 18px
          lineHeight: '1.5rem', // 24px
          fontWeight: '600',
          '@screen lg': {
            fontSize: '1.5rem', // 24px
            lineHeight: '1.875rem', // 30px
          },
        },

        '.h3': {
          fontSize: '1rem', // 16px
          lineHeight: '1.375rem', // 22px
          fontWeight: '600',
          '@screen lg': {
            fontSize: '1.25rem', // 20px
            lineHeight: '1.625rem', // 26px
          },
        },

        '.body1': {
          fontSize: '1rem', // 16px
          lineHeight: '1.375rem', // 22px
          fontWeight: '400',
          '@screen lg': {
            fontSize: '1.25rem', // 20px
            lineHeight: '1.625rem', // 26px
          },
        },

        '.btn1': {
          fontSize: '1rem', // 16px
          lineHeight: '1.375rem', // 22px
          fontWeight: '600',
          '@screen lg': {
            fontSize: '1rem', // 18px
            lineHeight: '1.5rem', // 24px
          },
        },

        '.body2': {
          fontSize: '0.875rem', // 14px
          lineHeight: '1.25rem', // 20px
          fontWeight: '400',
          '@screen lg': {
            fontSize: '1rem', // 16px
            lineHeight: '1.375rem', // 22px
          },
        },

        '.btn2': {
          fontSize: '0.75rem', // 14px
          lineHeight: '1.25rem', // 20px
          fontWeight: '600',
          letterSpacing: '-0.25%',
          '@screen lg': {
            fontSize: '0.875rem',
            lineHeight: '1.25rem', // 20px
            fontWeight: '600',
          },
        },

        '.caption1': {
          fontSize: '0.75rem', // 12px
          lineHeight: '1rem', // 16px
          fontWeight: '400',
          '@screen lg': {
            fontSize: '0.875rem', // 14px
            lineHeight: '1.125rem', // 18px
          },
        },

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

      addUtilities(newUtilities)
    }),
  ],
} satisfies Config

export default sharedConfig
