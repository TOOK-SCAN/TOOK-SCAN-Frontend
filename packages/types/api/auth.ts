import type { Common } from '../api'

export type LoginRes = Common<{
  access_token: string
  refresh_token: string
}>

export type UserInfoRes = Common<{
  account_type: 'USER' | 'ADMIN'
  name: string
}>

export type SendAuthCodeRes = Common<{
  try_cnt: number
}>

export type VerifyAuthCodeRes = Common<{}>

export type FindSerialIdRes = Common<{
  provider: 'DEFAULT' | 'KAKAO' | 'GOOGLE'
  serial_id: string
}>
