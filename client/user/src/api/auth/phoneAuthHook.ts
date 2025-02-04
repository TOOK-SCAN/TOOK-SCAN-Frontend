'use client'

import { useMutation } from '@tanstack/react-query'
import { postPhoneAuth } from './phoneAuth'
import { PhoneAuthRequest, PhoneAuthResponse } from '@/types/api/phoneAuth'

export const phoneAuth = () => {
  return useMutation<PhoneAuthResponse, Error, PhoneAuthRequest>({
    mutationFn: (phoneAuthData) =>
      postPhoneAuth('auth/authentication-code', phoneAuthData),
  })
}
