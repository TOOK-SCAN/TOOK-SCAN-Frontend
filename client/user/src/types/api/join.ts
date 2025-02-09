import type { Common } from '@tookscan/types'

export interface SignUpDefaultRequest {
  name: string
  serial_id: string
  password: string
  phone_number: string
  marketing_allowed: boolean
}

export interface SignUpOAuthRequest {
  name: string
  phone_number: string
  marketing_allowed: boolean
}

export type SignUpResponse = Common<null>

export type SignUpIDCheckResponse = Common<{ is_valid: boolean }>
