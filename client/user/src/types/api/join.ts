export interface defaultResponse<T, E = unknown> {
  success: boolean
  data: T
  error: E | null
}
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

export type SignUpResponse = defaultResponse<null>

export type SignUpIDCheckResponse = defaultResponse<{ is_valid: boolean }>
