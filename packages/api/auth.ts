import { httpInstance } from '../config'
import type { LoginRes, SendAuthCodeRes, UserInfoRes } from '../types/api'

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

export const sendAuthCode = async (
  username: string,
  phone: string
): Promise<SendAuthCodeRes> => {
  const response = await httpInstance.post('auth/authentication-code', {
    json: {
      name: username,
      phone_number: phone.replace(/-/g, ''),
    },
  })

  return response.json()
}

export const verifyAuthCode = async (phone: string, authCode: string) => {
  const response = await httpInstance.post('auth/authentication-code', {
    json: {
      phone_number: phone.replace(/-/g, ''),
      authentication_code: authCode,
    },
  })

  return response.json()
}
