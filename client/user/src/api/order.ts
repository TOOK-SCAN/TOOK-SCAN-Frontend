import type { OrderRequest, OrderResponse } from '@/types'
import { httpInstance } from '@tookscan/config'

// 회원/비회원 주문 API 호출 함수
export const postOrder = async (
  orderData: OrderRequest,
  isLogin: boolean
): Promise<OrderResponse> => {
  const response = await httpInstance.post(
    `${isLogin ? 'users' : 'guests'}/orders`,
    {
      json: orderData,
    }
  )

  return response.json()
}
