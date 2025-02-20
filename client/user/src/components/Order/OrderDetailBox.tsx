'use client'

import { Button } from '@tookscan/components'
import DeliveryTracking from '@tookscan/components/ui/DeliveryTracking'
import { useModal } from '@tookscan/hooks'
import html2canvas from 'html2canvas'
import React from 'react'

interface DetailBoxProps {
  currentStatus?: string
  orderDate: string
  customer: string
  deliveryInfo: string
  productDetails: string
  paymentAmount: string
  paymentMethod: string
  isModal?: boolean
  onCloseModal?: () => void
}

export const OrderDetailBox = ({
  currentStatus,
  orderDate,
  customer,
  deliveryInfo,
  productDetails,
  paymentAmount,
  paymentMethod,
  isModal = false,
  onCloseModal,
}: DetailBoxProps) => {
  const { openModal } = useModal()

  // 배송조회 모달 열기
  const handleOpenTrackingModal = () => {
    openModal(<DeliveryTracking trackingNumber={deliveryInfo} />)
  }

  const handleSaveImage = async () => {
    try {
      const element = document.querySelector('.detail-box')
      if (!element) {
        alert('주문 상세 정보를 찾을 수 없습니다. 페이지를 새로고침해주세요.')
        return
      }

      const canvas = await html2canvas(element as HTMLElement)
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `주문상세_${orderDate}.png`
      link.click()
    } catch (error) {
      console.error('이미지 저장 중 오류 발생:', error)
      alert('이미지 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const getStatusClass = (status: string) => {
    return currentStatus === status ? 'text-blue-primary' : 'text-gray-500'
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    // 모달 외부 클릭 시 닫히도록 처리
    if (e.target === e.currentTarget && onCloseModal) {
      onCloseModal()
    }
  }

  const content = (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold h2">주문번호</h2>
        <span className="font-bold text-blue-primary h2">20204121721330</span>
      </div>
      <div className="detail-box mt-6 rounded-lg border border-gray-300 bg-white p-6">
        <div className="mb-6 flex items-center">
          <div className="flex items-center space-x-2 btn2">
            <span className={getStatusClass('발송완료')}>발송완료</span>
            <span className="text-black">&gt;</span>
            <span className={getStatusClass('업체도착')}>업체도착</span>
            <span className="text-black">&gt;</span>
            <span className={getStatusClass('스캔진행')}>스캔진행</span>
            <span className="text-black">&gt;</span>
            <span className={getStatusClass('작업완료')}>작업완료</span>
          </div>
        </div>
        <div className="mb-6 flex items-center gap-4">
          <strong className="rounded-xl bg-blue-secondary px-2 py-1 text-blue-primary btn2">
            {' '}
            주문 일시
          </strong>
          <p className="body2">{orderDate}</p>
        </div>
        <div className="mb-6 flex items-center gap-4">
          <strong className="rounded-xl bg-blue-secondary px-2 py-1 text-blue-primary btn2">
            {' '}
            주문자
          </strong>
          <p className="body2">{customer}</p>
        </div>
        <div className="mb-6 flex items-center gap-4">
          <strong className="rounded-xl bg-blue-secondary px-2 py-1 text-blue-primary btn2">
            {' '}
            배송 정보
          </strong>
          <div className="flex items-center space-x-2">
            <p className="body2">{deliveryInfo}</p>
            <Button
              className="h-[28px] w-[70px] px-[1rem] text-sm"
              variant="primary"
              onClick={handleOpenTrackingModal} // 배송조회 모달 열기
            >
              배송조회
            </Button>
          </div>
        </div>
        <div className="mb-6 flex items-center gap-4">
          <strong className="rounded-xl bg-blue-secondary px-2 py-1 text-blue-primary btn2">
            {' '}
            주문 상품
          </strong>
          <p className="body2">{productDetails}</p>
        </div>
        <div>
          <strong className="rounded-xl bg-blue-secondary px-2 py-1 text-blue-primary btn2">
            상세 정보
          </strong>
          <div className="mt-4 w-full rounded-lg bg-blue-secondary p-6">
            <div className="mb-2 flex justify-between">
              <p className="caption1">1. 노인과 바다 / 200page / 스프링</p>
              <p className="text-blue-primary caption1">16000원</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="caption1">2. 노인과 바다 / 200page / 스프링</p>
              <p className="text-blue-primary caption1">16000원</p>
            </div>
            <div className="flex justify-between">
              <p className="caption1">3. 노인과 바다 / 200page / 스프링</p>
              <p className="text-blue-primary caption1">16000원</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <span className="btn1">결제 금액</span>
            <strong className="text-blue-primary h3">{paymentAmount}</strong>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <span className="btn1">결제 수단</span>
            <span className="text-blue-primary h3">{paymentMethod}</span>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          {isModal && (
            <Button
              className="flex-1"
              variant="secondary"
              size="default"
              onClick={onCloseModal}
            >
              취소
            </Button>
          )}
          <Button
            className={isModal ? 'flex-1' : 'w-full'}
            variant="primary"
            size="default"
            onClick={handleSaveImage}
          >
            이미지 저장
          </Button>
        </div>
      </div>
    </div>
  )

  return isModal ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick} // 모달 외부 클릭 처리
    >
      <div className="w-[640px] rounded-lg bg-white p-6 shadow-lg">
        {content}
      </div>
    </div>
  ) : (
    content
  )
}
