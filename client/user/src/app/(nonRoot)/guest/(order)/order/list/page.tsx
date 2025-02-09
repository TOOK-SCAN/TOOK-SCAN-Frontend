'use client'

import { Button, DetailBox as OrderDetailBox } from '@tookscan/components'
import html2canvas from 'html2canvas'
import Link from 'next/link'
import { useState } from 'react'

const OrderDetails = () => {
  const [showDetails, setShowDetails] = useState(false) // 자세히 버튼 상태

  const handleSaveImage = async () => {
    if (!showDetails) {
      setShowDetails(true) // 상자를 렌더링
    }

    setTimeout(async () => {
      try {
        const element = document.querySelector('.order-details')
        if (!element) throw new Error('저장할 요소를 찾을 수 없습니다.')

        // html2canvas로 캡처
        const canvas = await html2canvas(element as HTMLElement)
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'order-details.png'
        link.click()
      } catch (error) {
        console.error('이미지 저장 중 오류 발생:', error)
        alert('이미지 저장에 실패했습니다. 다시 시도해주세요.')
      }
    }, 100) // DOM 업데이트를 기다림
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* 이전으로 링크 */}
      <div className="mt-6 w-[640px] text-left">
        <Link href="/guest/order/check" className="text-blue-primary">
          &lt; 이전으로
        </Link>
      </div>

      {/* 타이틀 */}
      <div className="mt-8 w-[640px] text-left">
        <div className="text-xs font-bold text-blue-primary">
          비회원 주문조회
        </div>
        <div className="mt-2 text-lg font-bold leading-tight text-black-800">
          비회원 고객님도 <br /> 편하게 주문을 조회해보아요
        </div>
      </div>

      {/* 상자 */}
      <div className="mt-6 w-[640px] rounded-lg bg-white p-6 shadow-md">
        {/* 상자 제목 */}
        <div className="text-left text-lg font-bold text-black-800">
          비회원 주문조회
        </div>

        {/* 그리드 레이아웃 */}
        <div className="mt-4 grid grid-cols-6 gap-4 bg-blue-secondary p-2 text-center text-sm font-bold text-blue-primary">
          <div>주문 번호</div>
          <div>주문 일시</div>
          <div>상품 수량</div>
          <div>주문 금액</div>
          <div>작업 상태</div>
          <div>세부 내용</div>
        </div>

        {/* 데이터 */}
        <div className="grid grid-cols-6 items-center gap-4 p-2 text-center text-sm text-black-800">
          <div>24112700</div>
          <div>2024.12.27</div>
          <div>2건</div>
          <div>24,000원</div>
          <div>진행중</div>
          <div className="flex justify-center">
            <Button
              className="h-[28px] w-[70px] text-sm"
              variant="primary"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              자세히
            </Button>
          </div>
        </div>

        {showDetails && (
          <div className="order-details mt-6 rounded-lg border border-gray-300 bg-white p-6">
            <div className="mb-6 flex items-center">
              <strong className="w-[150px]">1. 작업 상태</strong>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-black">발송완료</span>
                <span className="text-black">&gt;</span>
                <span className="text-black">업체도착</span>
                <span className="text-black">&gt;</span>
                <span className="text-black">스캔진행</span>
                <span className="text-black">&gt;</span>
                <span className="text-black">작업완료</span>
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <strong className="w-[150px]">2. 주문 일시</strong>
              <p className="text-sm text-black">2024.12.25 (월) 12:45</p>
            </div>
            <div className="mb-6 flex items-center">
              <strong className="w-[150px]">3. 주문자</strong>
              <p className="text-sm text-black">홍길동</p>
            </div>
            <div className="mb-6 flex items-center">
              <strong className="w-[150px]">4. 배송 정보</strong>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-black">
                  경기도 시흥시 산기대학로 237 TIP, 1203호
                </p>
                <Button className="h-[28px] w-[70px] text-sm" variant="primary">
                  배송조회
                </Button>
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <strong className="w-[150px]">5. 주문 상품</strong>
              <p className="text-sm text-black">스캔된 자료 2건</p>
            </div>
            <div>
              <strong>6. 상세 정보</strong>
              <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
              <div className="mt-4 flex justify-between">
                <span>문서 작업 (200페이지)</span>
                <span>16,000원</span>
              </div>
              <div className="mt-4 flex justify-between">
                <span>문서 작업 (300페이지)</span>
                <span>24,000원</span>
              </div>
              <div className="mt-4 h-[1px] w-full bg-gray-300"></div>
              <div className="mt-4 flex justify-between">
                <strong>결제 금액</strong>
                <strong className="text-red-500">47,000원</strong>
              </div>
              <div className="mt-4 flex justify-between">
                <span>결제 수단</span>
                <span>TOSS / 무통장 입금</span>
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              variant="primary"
              size="lg"
              onClick={handleSaveImage}
            >
              이미지 저장
            </Button>
          </div>
        )}
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

export default OrderDetails
