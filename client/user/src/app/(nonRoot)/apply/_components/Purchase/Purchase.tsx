'use client'

import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type { TouchEvent } from 'react'
import { useState } from 'react'

import { postOrder } from '@/api/order'
import { BookInCart } from '@/app/(nonRoot)/apply/_components'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import {
  calculateTotalPrice,
  hasNonDropBooks,
} from '@/app/(nonRoot)/apply/_utils/calculateBookPrice'
import type { OrderRequest, OrderResponse } from '@/types/api/apply/order'

import { Button } from '@tookscan/components'
import { useAuth, useModal } from '@tookscan/hooks'

const Purchase = () => {
  const {
    books,
    pageIndex,
    setPageIndex,
    terms,
    ignoreBeforeUnload,
    shippingInfo,
  } = useApplyContext()
  const { isLogin } = useAuth()
  const router = useRouter()
  const { openModal, closeModal } = useModal()

  // 책 리스트 펼침/접힘 상태 (모바일에서만 사용)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Bottom Sheet 드래그 상태 (모바일)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [translateY, setTranslateY] = useState(0)

  // react-query 뮤테이션
  const orderMutation = useMutation<OrderResponse, unknown, OrderRequest>({
    mutationFn: (orderRequest) => postOrder(orderRequest, isLogin),
    onSuccess: (response) => {
      if (response?.success && response.data?.order_number) {
        ignoreBeforeUnload.current = true
        router.push(`/apply/success?order=${response.data.order_number}`)
      } else {
        throw new Error('올바른 응답이 아닙니다.')
      }
    },
    onError: (error) => {
      console.error('신청 실패:', error)
      closeModal()

      let errorMessage = '알 수 없는 오류가 발생했습니다.'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: string }).message === 'string'
      ) {
        errorMessage = (error as { message: string }).message
      } else {
        errorMessage = JSON.stringify(error)
      }

      openModal(
        <div className="flex w-full flex-col">
          <div className="pt-6 text-center text-lg font-bold text-black">
            오류 발생
          </div>
          <div className="mt-4 h-[1px] w-full bg-gray-300" />
          <p className="whitespace-pre-line px-6 py-8 text-center text-red-500">
            {errorMessage}
          </p>
          <div className="flex gap-2 px-6 pb-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full flex-1"
              onClick={closeModal}
            >
              닫기
            </Button>
          </div>
        </div>
      )
    },
  })

  // 주문 요청 함수
  const apply = async () => {
    const orderRequest: OrderRequest = {
      documents: books.map((book) => ({
        name: book.name,
        request: '',
        page_prediction: book.pages ?? 0,
        recovery_option: book.restoreOption.toUpperCase() as
          | 'DISCARD'
          | 'RAW'
          | 'SPRING',
      })),
      delivery_info: {
        receiver_name: shippingInfo.recipient,
        phone_number: shippingInfo.phone.replace(/-/g, ''),
        email: shippingInfo.email,
        request: shippingInfo.request,
        address: {
          address_name: shippingInfo.address,
          region_1depth_name: shippingInfo.region_1depth_name,
          region_2depth_name: shippingInfo.region_2depth_name,
          region_3depth_name: shippingInfo.region_3depth_name,
          region_4depth_name: shippingInfo.region_4depth_name,
          address_detail: shippingInfo.addressDetail,
          longitude: shippingInfo.longitude,
          latitude: shippingInfo.latitude,
        },
      },
    }

    orderMutation.mutate(orderRequest)
  }

  // 버튼 비활성화 로직
  const isButtonDisabled = () => {
    if (books.length === 0) return true

    // pageIndex === 2인데, 약관 동의 X
    if (
      pageIndex === 2 &&
      !(
        terms.terms1 &&
        terms.terms2 &&
        terms.terms3 &&
        terms.terms4 &&
        terms.terms5
      )
    ) {
      return true
    }
    if (pageIndex === 1) {
      if (hasNonDropBooks(books)) {
        return !(
          shippingInfo.recipient &&
          shippingInfo.phone &&
          shippingInfo.address &&
          shippingInfo.addressDetail
        )
      }
      return !(shippingInfo.recipient && shippingInfo.phone)
    }
    return false
  }

  // =======================
  // 터치 드래그 이벤트
  // =======================
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartY) return

    const currentY = e.touches[0].clientY
    const deltaY = currentY - touchStartY

    // 아래로 당길 때만 translateY 증가
    if (deltaY < 0) {
      setTranslateY(0)
    } else {
      setTranslateY(Math.min(deltaY, 300))
    }
  }

  const handleTouchEnd = () => {
    // 150px 이상 내렸으면 시트 닫기
    if (translateY > 150) {
      setIsDropdownOpen(false)
    }
    setTranslateY(0)
    setTouchStartY(null)
  }

  return (
    <div
      // z-40으로 설정하여 주소 모달(z-50)보다 아래에 위치
      className={clsx(
        'z-40 flex w-full flex-col gap-6 rounded-t-3xl bg-white',
        // 패딩 줄임: px-4, py-4
        'px-4 py-4',
        'lg:static lg:shadow-none',
        // 모바일에서 그림자
        'shadow-[0_-2px_12px_rgba(0,0,0,0.1)]',
        // 터치 스크롤 해제
        '[touch-action:none]'
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${translateY}px)`,
        transition: touchStartY ? 'none' : 'transform 0.2s ease-out',
      }}
    >
      {/* 드래그 바 (시각적) - 상단에 작은 막대 표시 */}
      <div className="mx-auto mb-1 mt-2 h-1 w-10 rounded-full bg-gray-300 lg:hidden" />

      {/* 상단 영역: 총 금액, 드롭다운 토글 버튼 */}
      <div
        className={clsx(
          'flex items-center justify-between border-b border-black-800',
          'px-2 py-4 font-bold'
        )}
      >
        <h2 className="h3">예상 총 금액</h2>
        <div className="flex items-center gap-2">
          <p className="h2 text-blue-primary">
            {calculateTotalPrice({ books }).toLocaleString()}원
          </p>
          {/* 모바일: 책 목록 펼침/접힘 토글 */}
          <button
            className="block lg:hidden"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={clsx(
                'h-6 w-6 transition-transform duration-200',
                isDropdownOpen && 'rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일에서만 책 리스트를 토글 (isDropdownOpen) */}
      <div
        className={clsx(
          'w-full rounded-xl bg-blue-secondary',
          // 패딩 줄임
          'p-4',
          'lg:block',
          isDropdownOpen ? 'block' : 'hidden'
        )}
      >
        <ul className="flex flex-col gap-2">
          {books.map((book) => (
            <li key={book.id}>
              <BookInCart {...book} />
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between px-2 pt-6">
          <p className="btn2 font-semibold">배송비</p>
          <p>
            {hasNonDropBooks(books) ? (
              '2,500원'
            ) : (
              <span className="caption1 text-blue-primary">
                <del className="caption1 text-black">2,500원</del> 0원
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 하단 버튼: 사이즈 md로 줄이기 */}
      <Button
        size="md"
        className="mt-2 w-full"
        variant="primary"
        disabled={isButtonDisabled()}
        onClick={() => {
          if (pageIndex === 0 || pageIndex === 1) {
            setPageIndex((prev: number) => prev + 1)
          } else if (pageIndex === 2) {
            openModal(
              <div className="flex w-full flex-col">
                <div className="pt-6 text-center text-lg font-bold text-black">
                  스캔 신청
                </div>
                <div className="mt-4 h-[1px] w-full bg-gray-300" />
                <p className="px-6 py-8">스캔신청을 하시겠습니까?</p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={closeModal}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full flex-1"
                    onClick={async () => {
                      closeModal()
                      apply()
                    }}
                  >
                    신청
                  </Button>
                </div>
              </div>
            )
          }
        }}
      >
        {pageIndex === 2 ? '결제하기' : '다음'}
      </Button>
    </div>
  )
}

export default Purchase
