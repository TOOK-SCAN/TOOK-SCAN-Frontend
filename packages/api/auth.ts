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
