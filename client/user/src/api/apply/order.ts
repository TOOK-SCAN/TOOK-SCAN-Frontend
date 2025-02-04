import { httpInstance } from '@tookscan/config'
import { OrderRequest, OrderResponse } from '@/types/api/apply/order'

// 로컬 스토리지에서 토큰 가져오기
const getAccessToken = () => localStorage.getItem('access_token') || ''

// 회원/비회원 주문 API 호출 함수
export const postOrder = async (
  endpoint: string,
  orderData: OrderRequest,
  isMember: boolean
): Promise<OrderResponse> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // 회원 주문일 경우 Bearer Token 추가
  if (isMember) {
    headers.Authorization = `Bearer ${getAccessToken()}`
  }

  const response = await httpInstance.post(endpoint.replace(/^\/+/, ''), {
    json: orderData,
    headers,
  })

  return response.json()
}
