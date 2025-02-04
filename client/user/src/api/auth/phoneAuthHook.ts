'use client'

import { useMutation } from '@tanstack/react-query'
import { postPhoneAuth } from './phoneAuth'
import { PhoneAuthRequest, PhoneAuthResponse } from '@/types/api/phoneAuth'

export const usePhoneAuth = () => {
  return useMutation<PhoneAuthResponse, Error, PhoneAuthRequest>({
    mutationFn: postPhoneAuth,
  })
}

export default usePhoneAuth
