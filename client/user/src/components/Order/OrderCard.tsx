'use client'

import type { Order } from '@/types'
import { useModal } from '@tookscan/hooks'

export const OrderCard = ({ data }: { data: Order }) => {
  const { openModal } = useModal()
  return (
    <>
      <div className="mx-auto mt-[12px] w-full max-w-[500px] rounded-[2rem] bg-white p-[24px] shadow md:p-[32px]">
        {/* 상단 경로(진행단계) */}
        <nav className="mb-4 text-gray-500 btn2">
          발송완료 &gt; 업체도착 &gt; 스캔진행 &gt;
          <span className="text-blue-500">작업완료</span>
        </nav>

        {/* 제목 */}
        <div className="mb-4">
          <h1 className="font-semibold btn1 md:text-xl">
            {data.receiver_name} | {data.order_date}
          </h1>
        </div>

        {/* 구분선 */}
        <hr className="mb-4" />

        {/* 주문 상세 정보 */}
        <div className="mb-4 space-y-2 text-gray-700">
          <div>
            <span className="mr-[12px] font-medium btn2 md:text-sm">
              주문상품
            </span>
            <span className="font-semibold">{data.document_description}</span>
          </div>
          <div>
            <span className="mr-[12px] font-medium btn2 md:text-sm">
              주문번호
            </span>
            <span className="font-semibold">{data.order_number}</span>
          </div>
          <div>
            <span className="mr-[12px] font-medium btn2 md:text-sm">
              배송정보
            </span>
            <span className="font-semibold">{data.address}</span>
          </div>
          <div>
            <span className="mr-[12px] font-medium btn2 md:text-sm">
              결제수단
            </span>
            <span className="font-semibold">{data.easy_payment_provider}</span>
          </div>
        </div>

        {/* 가격 & 버튼 영역 */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col items-end">
            <div className="text-lg font-bold text-red-500">
              {data.payment_total
                ? `${data.payment_total.toLocaleString()}원`
                : '최종 견적 금액 확인 중'}
            </div>
          </div>

          {/* 버튼 그룹 (가로 정렬 유지) */}
          <div className="flex w-full flex-row justify-center space-x-2">
            <button className="border-1 h-[38px] w-full max-w-[13rem] rounded border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-50">
              배송조회
            </button>
            <button
              className="border-1 h-[38px] w-full max-w-[13rem] rounded border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-50"
              onClick={() => openModal(<></>)}
            >
              주문 상세
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
