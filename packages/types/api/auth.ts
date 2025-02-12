import { AccountType } from '../'
import type { Common } from '../api'

export type LoginRes = Common<{
  access_token: string
  refresh_token: string
}>

export type UserInfoRes = Common<{
  account_type: AccountType
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

export type FindPasswordRes = Common<{
  temporary_password: string
}>

export type ReissueTokenRes = Common<{
  access_token: string
  refresh_token: string
}>
