import { httpInstance } from '@tookscan/config'
import { PhoneAuthRequest, PhoneAuthResponse } from '@/types/api/phoneAuth'

export const postPhoneAuth = async (
  endpoint: string,
  phoneAuthData: PhoneAuthRequest
): Promise<PhoneAuthResponse> => {
  const response = await httpInstance.post(endpoint.replace(/^\/+/, ''), {
    json: phoneAuthData,
  })

  return response.json()
}
