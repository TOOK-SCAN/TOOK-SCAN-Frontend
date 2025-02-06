export interface PhoneAuthRequest {
  name: string
  phone_number: string
}

export interface PhoneAuthResponse {
  success: boolean
  data: {
    try_cnt: number
  }
  error: string | null
}

export interface PhoneVerifyRequest {
  phone_number: string
  authentication_code: string
}

export interface PhoneVerifyResponse {
  success: boolean
  data: null
  error: string | null
}
