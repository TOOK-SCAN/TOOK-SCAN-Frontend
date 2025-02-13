'use client'

import { OrderDetailBox } from '@tookscan/components'
import Link from 'next/link'

const TestPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* 이전으로 링크 */}
      <div className="mt-6 w-full max-w-[40rem] text-left">
        <Link href="/guest/order/check" className="text-blue-primary btn1">
          &lt; 이전으로
        </Link>
      </div>

      {/* 타이틀 */}
      <div className="mt-8 w-full max-w-[40rem] text-left">
        <div className="font-bold text-blue-primary btn1">비회원 주문조회</div>
        <div className="mb-2 mt-2 w-full font-bold leading-tight text-black-800 title2">
          비회원 고객님도 <br />
          간편하게 작업상태를 확인할 수 있어요!
        </div>
      </div>

      {/* 상자 */}
      <div className="mx-4 mt-6 w-full max-w-[40rem] rounded-lg bg-white p-6 shadow-md">
        <OrderDetailBox
          currentStatus="업체도착"
          orderDate="2024.12.25 (월) 12:45"
          customer="홍길동"
          deliveryInfo="경기도 시흥시 산기대학로 237 TIP, 1203호"
          productDetails="스캔된 자료 2건"
          paymentAmount="47,000원"
          paymentMethod="TOSS / 무통장 입금"
          isModal={false}
        />
      </div>
    </div>
  )
}

export default TestPage
