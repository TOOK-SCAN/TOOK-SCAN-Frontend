import { httpInstance } from '../config'
import type { LoginRes, UserInfoRes } from '../types/api'

export const userInfo = async (): Promise<UserInfoRes> => {
  const response = await httpInstance.get('auth/briefs')

  return response.json()
}

export const login = async (
  id: string,
  password: string
): Promise<LoginRes> => {
  const formData = new FormData()
  formData.append('serial_id', id)
  formData.append('password', password)

  const response = await httpInstance.post('auth/login', { body: formData })

  return response.json()
}

export const sendAuthCode = async (name: string, phoneNumber: string) => {
  return httpInstance.post('auth/authentication-code', {
    json: {
      name,
      phone_number: phoneNumber.replace(/-/g, ''),
    },
  })
}

export const verifyAuthCode = async (phoneNumber: string, code: string) => {
  return httpInstance.patch('auth/authentication-code', {
    json: {
      phone_number: phoneNumber.replace(/-/g, ''),
      authentication_code: code,
    },
  })
}
