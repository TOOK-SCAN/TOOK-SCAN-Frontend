'use client'

import { getOrderList } from '@/api'
import { OrderCard } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const OrderHistory = () => {
  // 정렬 옵션
  const [sortOption, setSortOption] = useState<'desc' | 'asc'>('desc')
  const [pageChunk, setPageChunk] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const keyword = ''

  const { data: orders } = useQuery({
    queryKey: ['orderList', sortOption, currentPage],
    queryFn: () =>
      getOrderList(currentPage, 12, keyword, 'createdAt', sortOption),
  })

  // chunk별 페이지 목록(1,2,3,4 → 5,6,7,8)
  const getPagesForChunk = (chunk: number) => {
    if (chunk === 1) return [1, 2, 3, 4]
    if (chunk === 2) return [5, 6, 7, 8]
    return []
  }

  const pagesToRender = getPagesForChunk(pageChunk)

  // 왼쪽 화살표
  const handlePrevChunk = () => {
    // chunk는 1 이상
    setPageChunk((prev) => Math.max(prev - 1, 1))
  }

  // 오른쪽 화살표
  const handleNextChunk = () => {
    // chunk는 2까지만
    setPageChunk((prev) => Math.min(prev + 1, 2))
  }

  return (
    <div className="mx-auto w-full px-4">
      {/* 드롭다운 영역 */}
      <div className="flex justify-end">
        <select
          className="bg-transparent px-4 text-sm text-blue-primary focus:border-blue-400 focus:outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as 'desc' | 'asc')}
        >
          {/* 옵션은 bg-white로 지정 (열렸을 때 배경색) */}
          <option className="bg-white text-black" value="desc">
            최신순
          </option>
          <option className="bg-white text-black" value="asc">
            오래된순
          </option>
        </select>
      </div>

      {/* 주문 카드들 */}
      {orders?.data.orders.map((order, idx) => (
        <OrderCard key={idx} data={order} />
      ))}

      {/* 페이지네이션 */}
      <div className="mt-6 flex items-center justify-center space-x-4">
        {/* 왼쪽 화살표 버튼 */}
        <button
          onClick={handlePrevChunk}
          className="text-gray-500 hover:text-blue-500"
        >
          {/* 간단한 화살표 아이콘 (←) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 페이지 번호 */}
        {pagesToRender.map((pageNum) => (
          <span
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`cursor-pointer text-sm ${
              currentPage === pageNum
                ? 'font-semibold text-blue-500'
                : 'text-gray-700 hover:text-blue-500'
            } `}
          >
            {pageNum}
          </span>
        ))}

        {/* 오른쪽 화살표 버튼 */}
        <button
          onClick={handleNextChunk}
          className="text-gray-500 hover:text-blue-500"
        >
          {/* 간단한 화살표 아이콘 (→) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default OrderHistory
