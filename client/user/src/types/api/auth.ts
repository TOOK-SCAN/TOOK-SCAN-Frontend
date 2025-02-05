import type { Common } from '@/types/api'

export type LoginRes = Common<{
  access_token: string
  refresh_token: string
}>
