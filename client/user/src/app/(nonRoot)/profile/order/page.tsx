'use client'

import { getOrderList } from '@/api'
import type { Order } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { OrderCard } from './_components/OrderCard'

const PAGE_SIZE = 12

const OrderHistory = () => {
  const [sortOption, setSortOption] = useState<'desc' | 'asc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const keyword = ''

  const { data: ordersResponse } = useQuery({
    queryKey: ['orderList', sortOption, currentPage],
    queryFn: () =>
      getOrderList(currentPage, PAGE_SIZE, keyword, 'createdAt', sortOption),
  })

  const orders = ordersResponse?.data.orders ?? []
  const pageInfo = ordersResponse?.data.page_info
  const totalPages = pageInfo?.total_page ?? 0

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  )

  const handlePageClick = (page: number) => setCurrentPage(page)
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1)

  return (
    <div className="mx-auto w-full px-4">
      {/* 정렬 드롭다운 */}
      <div className="mb-4 flex justify-end">
        <select
          className="bg-transparent px-4 text-sm text-blue-primary focus:border-blue-400 focus:outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as 'desc' | 'asc')}
        >
          <option className="bg-white text-black" value="desc">
            최신순
          </option>
          <option className="bg-white text-black" value="asc">
            오래된순
          </option>
        </select>
      </div>

      {/* 주문 카드들 */}
      <div className="space-y-4">
        {orders.map((order: Order) => (
          <OrderCard key={order.id} data={order} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="text-gray-500 hover:text-blue-500"
          >
            Prev
          </button>
          {pages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`cursor-pointer text-sm ${
                currentPage === pageNum
                  ? 'font-semibold text-blue-500'
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="text-gray-500 hover:text-blue-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderHistory
