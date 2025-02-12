import type {
  PWFetchRes,
  UserDetailFetchRequest,
  UserDetailFetchRes,
  UserDetailRes,
  UserSummariesResponse,
} from '@/types'
import { httpInstance } from '@tookscan/config'

export const getUserSummaries = async (): Promise<
  UserSummariesResponse['data'] | null
> => {
  const response = await httpInstance.get('users/summaries')
  const result: UserSummariesResponse = await response.json()
  return result?.data ?? null
}
export const getUserDetail = async (): Promise<
  UserDetailRes['data'] | null
> => {
  const response = await httpInstance.get('users/detail')
  const result: UserDetailRes = await response.json()
  return result?.data ?? null
}

export const updateUserDetail = async (
  requestBody: UserDetailFetchRequest
): Promise<UserDetailFetchRes> => {
  return await httpInstance.put('users', { json: requestBody }).json()
}

export const updatePW = async (
  old_password: string,
  new_password: string
): Promise<PWFetchRes> => {
  const response = await httpInstance.patch('auth/password', {
    json: {
      old_password: old_password,
      new_password: new_password,
    },
  })
  return response.json()
}
