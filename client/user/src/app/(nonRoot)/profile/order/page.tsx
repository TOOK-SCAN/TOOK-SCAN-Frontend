'use client' // Next.js 13+ (App Router)에서 클라이언트 컴포넌트일 경우 선언
import React, { useState } from 'react'
import type { OrderInfo} from '@tookscan/components';
import { OrderCard } from '@tookscan/components'

const OrderHistory = () => {
  // 주문 리스트 (예시)
  const [orders] = useState<OrderInfo[]>([
    {
      userName: '민경훈',
      dateTime: '2024.12.15 (12시 45분)',
      productName: '노인과 바다 외 2건',
      orderNumber: '20241215010203',
      address: '경기도 시흥시 산기대학로 237 TIP, 1203호',
      payment: '간편결제/토스페이',
      price: 47600,
      currentStatus: '업체도착',
    },
    {
      userName: '민경훈',
      dateTime: '2024.12.15 (12시 45분)',
      productName: '노인과 바다 외 2건',
      orderNumber: '20241215010203',
      address: '경기도 시흥시 산기대학로 237 TIP, 1203호',
      payment: '무통장입금',
      price: 47600,
      currentStatus: '작업완료',
    },
    {
      userName: '민경훈',
      dateTime: '2024.12.15 (12시 45분)',
      productName: '노인과 바다 외 2건',
      orderNumber: '20241215010203',
      address: '경기도 시흥시 산기대학로 237 TIP, 1203호',
      payment: '카드결제',
      price: 47600,
      currentStatus: '업체도착',
    },
    {
      userName: '민경훈',
      dateTime: '2024.12.15 (12시 45분)',
      productName: '노인과 바다 외 2건',
      orderNumber: '20241215010203',
      address: '경기도 시흥시 산기대학로 237 TIP, 1203호',
      payment: 'TOSS/무통장 입금',
      price: 47600,
      currentStatus: '업체도착',
    },
  ])

  // 정렬 옵션
  const [sortOption, setSortOption] = useState('latest')
  // 페이지네이션: 간단히 1~4 / 5~8 두 구간(chunk)만 예시
  const [pageChunk, setPageChunk] = useState(1)
  // 현재 선택된 페이지
  const [currentPage, setCurrentPage] = useState(1)

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
    <div className="mx-auto max-w-[600px] p-4">
      {/* 드롭다운 영역 */}
      <div className="mb-4 flex justify-end">
        <select
          className="bg-transparent px-4 py-2 text-sm text-blue-primary focus:border-blue-400 focus:outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          {/* 옵션은 bg-white로 지정 (열렸을 때 배경색) */}
          <option className="bg-white text-black" value="latest">
            최신순
          </option>
          <option className="bg-white text-black" value="oldest">
            오래된순
          </option>
        </select>
      </div>

      {/* 주문 카드들 */}
      {orders.map((order, idx) => (
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
