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
  username: string
  phone_number: string
}>
