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

export interface SignUpResponse {
  success: boolean
  data: null
  error: null
}

export interface SignUpIDCheckResponse {
  success: boolean
  data: {
    is_valid: boolean
  }
  error: null
}
