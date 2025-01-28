import sharedConfig from '@shared/tailwind/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  ...sharedConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
