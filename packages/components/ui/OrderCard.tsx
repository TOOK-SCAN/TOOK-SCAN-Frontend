'use client'

import { useState } from 'react'
import { DetailBox } from '../../components'

export interface OrderInfo {
  userName: string
  dateTime: string
  productName: string
  orderNumber: string
  address: string
  payment: string
  price: number
  currentStatus: string
}

interface OrderCardProps {
  data: OrderInfo
}

export const OrderCard = ({ data }: OrderCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="mx-auto mt-[12px] w-full max-w-[500px] rounded-[2rem] bg-white p-[24px] shadow md:p-[32px]">
        {/* 상단 경로(진행단계) */}
        <nav className="btn2 mb-4 text-gray-500">
          발송완료 &gt; 업체도착 &gt; 스캔진행 &gt;{' '}
          <span className="text-blue-500">작업완료</span>
        </nav>

        {/* 제목 */}
        <div className="mb-4">
          <h1 className="btn1 font-semibold md:text-xl">
            {data.userName} | {data.dateTime}
          </h1>
        </div>

        {/* 구분선 */}
        <hr className="mb-4" />

        {/* 주문 상세 정보 */}
        <div className="mb-4 space-y-2 text-gray-700">
          <div>
            <span className="btn2 mr-[12px] font-medium md:text-sm">
              주문상품{' '}
            </span>
            <span className="font-semibold">{data.productName}</span>
          </div>
          <div>
            <span className="btn2 mr-[12px] font-medium md:text-sm">
              주문번호{' '}
            </span>
            <span className="font-semibold">{data.orderNumber}</span>
          </div>
          <div>
            <span className="btn2 mr-[12px] font-medium md:text-sm">
              배송정보{' '}
            </span>
            <span className="font-semibold">{data.address}</span>
          </div>
          <div>
            <span className="btn2 mr-[12px] font-medium md:text-sm">
              결제수단{' '}
            </span>
            <span className="font-semibold">{data.payment}</span>
          </div>
        </div>

        {/* 가격 & 버튼 영역 */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col items-end">
            <div className="text-lg font-bold text-red-500">
              {data.price.toLocaleString()}원
            </div>
          </div>

          {/* 버튼 그룹 (가로 정렬 유지) */}
          <div className="flex w-full flex-row justify-center space-x-2">
            <button className="border-1 h-[38px] w-full max-w-[13rem] rounded border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-50">
              배송조회
            </button>
            <button
              className="border-1 h-[38px] w-full max-w-[13rem] rounded border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-50"
              onClick={handleOpenModal}
            >
              주문 상세
            </button>
          </div>
        </div>
      </div>

      {/* DetailBox 모달 */}
      {isModalOpen && (
        <DetailBox
          currentStatus={data.currentStatus}
          orderDate={data.dateTime}
          customer={data.userName}
          deliveryInfo={data.address}
          productDetails={data.productName}
          paymentAmount={`${data.price.toLocaleString()}원`}
          paymentMethod={data.payment}
          isModal={true}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}
