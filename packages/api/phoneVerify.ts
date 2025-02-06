import { httpInstance } from '@tookscan/config'
import type { PhoneVerifyRequest, PhoneVerifyResponse } from '../types'

export const patchPhoneVerify = async (
  phoneVerifyData: PhoneVerifyRequest
): Promise<PhoneVerifyResponse> => {
  const response = await httpInstance.patch('auth/authentication-code', {
    json: phoneVerifyData,
  })

  return response.json()
}
