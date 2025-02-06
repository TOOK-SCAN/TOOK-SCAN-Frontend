import type { UserSummariesResponse } from '@/types/api/apply/order'
import { httpInstance } from '@tookscan/config'

export const getUserSummaries = async (): Promise<UserSummariesResponse> => {
  const response = await httpInstance.get('users/summaries')

  return response.json()
}
