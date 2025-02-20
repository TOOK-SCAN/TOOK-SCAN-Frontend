import type { Common } from '@tookscan/types'

export interface SignUpDefaultRequest {
  name: string
  serial_id: string
  password: string
  phone_number: string
  marketing_allowed: boolean
  is_receive_email: boolean
  is_receive_sms: boolean
}

export interface SignUpOAuthRequest {
  name: string
  phone_number: string
  marketing_allowed: boolean
}

export type SignUpRes = Common<null>

export type SignUpIDCheckRes = Common<{ is_valid: boolean }>
