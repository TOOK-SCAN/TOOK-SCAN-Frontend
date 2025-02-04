import { httpInstance } from '@tookscan/config'
import { UserSummariesResponse } from '@/types/api/apply/order'

const getAccessToken = () => localStorage.getItem('access_token') || ''

export const getUserSummaries = async (): Promise<UserSummariesResponse> => {
  const token = getAccessToken()

  if (!token) {
    throw new Error('Access Token이 없습니다.')
  }

  try {
    console.log('[GET 요청] 회원 정보 조회')
    const response = await httpInstance.get('users/summaries', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data: UserSummariesResponse = await response.json()
    console.log('[응답 데이터]', data)

    if (!data.success || !data.data) {
      throw new Error('올바르지 않은 응답입니다.')
    }

    return data
  } catch (error) {
    console.error('[회원 정보 조회 실패]', error)
    throw error
  }
}
