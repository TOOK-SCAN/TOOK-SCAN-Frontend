// client/tailwind.config.ts 예시
import sharedConfig from '@shared/tailwind/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  ...sharedConfig,
  content: [
    // sharedConfig.content가 배열이라는 가정 하에 강제 캐스팅
    ...((sharedConfig.content as string[]) ?? []),
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/components/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
