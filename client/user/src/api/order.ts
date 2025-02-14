import type { GetOrderListRes, OrderRequest, OrderResponse } from '@/types'
import { httpInstance } from '@tookscan/config'

// 회원/비회원 주문 API 호출 함수
export const postOrder = async (
  orderData: OrderRequest,
  isLogin: boolean
): Promise<OrderResponse> => {
  try {
    const response = await httpInstance.post(
      `${isLogin ? 'users' : 'guests'}/orders`,
      {
        json: orderData,
      }
    )

    return response.json()
  } catch (error) {
    console.error('주문 요청 실패', error)
    throw error
  }
}

export const getOrderList = async (
  page: number,
  size: number,
  search: string | null = '',
  sort: 'createdAt' = 'createdAt',
  direction: 'desc' | 'asc' = 'desc'
): Promise<GetOrderListRes> => {
  const response = await httpInstance.get('users/orders/overviews', {
    searchParams: {
      page,
      size,
      search: search ?? '',
      sort,
      direction,
    },
  })
  return response.json()
}
