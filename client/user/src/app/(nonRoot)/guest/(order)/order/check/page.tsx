'use client'

import React from 'react'
import { Button, InputField } from '@tookscan/components'
import { useRouter } from 'next/navigation'

const GuestOrderInquiry = () => {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* 타이틀 */}
      <div className="mt-10 w-[440px] text-left">
        <div className="text-xs font-bold text-blue-primary">
          비회원 주문조회
        </div>
        <div className="mt-2 text-lg font-bold leading-tight text-black-800">
          <p>툭스캔과 함께라면</p>
          <p>간편해지는 나의 생활</p>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          비회원이실 경우, 주문시의 주문번호로 주문조회가 가능해요!
        </p>
      </div>

      {/* 상자 */}
      <div className="mt-6 w-[440px] rounded-lg bg-white p-6 shadow-md">
        {/* 상자 제목 */}
        <div className="text-center text-lg font-bold text-blue-primary">
          비회원 주문조회
        </div>
        <div className="mt-2 h-[2px] w-full bg-blue-500"></div> {/* 디바이더 */}
        {/* 입력 필드 */}
        <div className="mt-6 space-y-4">
          <InputField
            type="simple"
            placeholder="주문자명"
            value=""
            onChange={() => {}}
          />
          <InputField
            type="simple"
            placeholder="주문번호"
            value=""
            onChange={() => {}}
          />
        </div>
        {/* 조회 버튼 */}
        <Button
          className="mt-6 w-full"
          variant="primary"
          size="lg"
          onClick={() => {
            router.push('/guest/order/list')
          }}
        >
          조회
        </Button>
        {/* 하단 상자 */}
        <button className="mt-6 flex h-[50px] w-full items-center justify-center rounded-lg border border-gray-300 bg-gray-100 text-center text-sm text-gray-600 underline">
          주문번호를 잊었어요.
        </button>
      </div>
    </div>
  )
}

export default GuestOrderInquiry
