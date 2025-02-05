import type { Common } from '@tookscan/types'

export type LoginRes = Common<{
  access_token: string
  refresh_token: string
}>
