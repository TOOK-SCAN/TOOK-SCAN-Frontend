import { httpInstance } from '@tookscan/config'
import { PhoneVerifyRequest, PhoneVerifyResponse } from '@/types/api/phoneAuth'

export const patchPhoneVerify = async (
  phoneVerifyData: PhoneVerifyRequest
): Promise<PhoneVerifyResponse> => {
  try {
    console.log('요청 데이터:', phoneVerifyData) // 요청 데이터 확인

    const response = await httpInstance.patch('auth/authentication-code', {
      json: phoneVerifyData,
    })

    console.log('응답 상태 코드:', response.status)

    const responseData = (await response.json()) as PhoneVerifyResponse
    console.log('API 응답 데이터:', responseData)

    return responseData
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error)
    throw error
  }
}
