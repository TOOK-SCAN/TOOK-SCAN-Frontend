import type { LoginRes } from '@/types/api'
import { httpInstance } from '@tookscan/config'

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
