import { httpInstance } from '@tookscan/config'
import type { PhoneAuthRequest, PhoneAuthResponse } from '../types'

// 휴대폰 인증 코드 요청 함수
export const postPhoneAuth = async (
  phoneAuthData: PhoneAuthRequest
): Promise<PhoneAuthResponse> => {
  const response = await httpInstance.post('auth/authentication-code', {
    json: phoneAuthData,
  })

  return response.json()
}
