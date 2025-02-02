'use client'

import { useMutation } from '@tanstack/react-query'
import { postOrder } from '@/api/order'
import { OrderRequest, OrderResponse } from '../types/api/order'

// 회원 주문 훅
export const useUserApply = () => {
  return useMutation<OrderResponse, Error, OrderRequest>({
    mutationFn: (orderData) => postOrder('users/orders', orderData, true),
  })
}

// 비회원 주문 훅
export const useGuestApply = () => {
  return useMutation<OrderResponse, Error, OrderRequest>({
    mutationFn: (orderData) => postOrder('guests/orders', orderData, false),
  })
}
