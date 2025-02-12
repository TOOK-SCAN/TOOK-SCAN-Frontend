import type { UserSummariesResponse } from '@/types/api/apply/order'
import { httpInstance } from '@tookscan/config'

export const getUserSummaries = async (): Promise<
  UserSummariesResponse['data'] | null
> => {
  const response = await httpInstance.get('users/summaries')
  const result: UserSummariesResponse = await response.json()
  return result?.data ?? null
}
export const getUserDetail = async (): Promise<
