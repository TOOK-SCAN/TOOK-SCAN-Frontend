'use client'

import { useMutation } from '@tanstack/react-query'
import { patchPhoneVerify } from './phoneVerify'
import { PhoneVerifyRequest, PhoneVerifyResponse } from '@/types/api/phoneAuth'

export const phoneVerify = () => {
  return useMutation<PhoneVerifyResponse, Error, PhoneVerifyRequest>({
    mutationFn: (phoneVerifyData) => patchPhoneVerify(phoneVerifyData),
  })
}
