import { httpInstance } from '@tookscan/config'
import { PhoneAuthRequest, PhoneAuthResponse } from '@/types/api/phoneAuth'

export const postPhoneAuth = async (
  phoneAuthData: PhoneAuthRequest
): Promise<PhoneAuthResponse> => {
  try {
    const response = await httpInstance.post('auth/authentication-code', {
      json: phoneAuthData,
    })

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[phoneAuth] 인증 요청 실패:', error)
    throw error
  }
}
