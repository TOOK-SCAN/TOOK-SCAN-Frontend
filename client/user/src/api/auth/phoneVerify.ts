import { httpInstance } from '@tookscan/config'
import { PhoneVerifyRequest, PhoneVerifyResponse } from '@/types/api/phoneAuth'

export const patchPhoneVerify = async (
  phoneVerifyData: PhoneVerifyRequest
): Promise<PhoneVerifyResponse> => {
  const response = await httpInstance.patch('auth/authentication-code', {
    json: phoneVerifyData,
  })

  return response.json()
}
