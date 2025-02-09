'use client'

import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
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

  // 드롭다운 열림 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
          <div className="pt-6 text-center font-bold text-black">오류 발생</div>
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

  // ✅ 함수 분리 (switch + 서브 함수)
  const isButtonDisabled = () => {
    // 책이 하나도 없으면 비활성화
    if (books.length === 0) return true

    switch (pageIndex) {
      case 1:
        // 낙장X 책이 하나라도 있으면 주소+상세주소까지
        // 아니면 수령인/전화번호만
        return hasNonDropBooks(books)
          ? !isValidFullAddress()
          : !isValidBasicInfo()
      case 2:
        // 약관 3개 모두 동의해야 활성화
        return !isAllTermsAccepted()
      default:
        // 그 외 단계는 기본 false (비활성화 X)
        return false
    }
  }

  const isValidFullAddress = () =>
    shippingInfo.recipient &&
    shippingInfo.phone &&
    shippingInfo.address &&
    shippingInfo.addressDetail

  const isValidBasicInfo = () => shippingInfo.recipient && shippingInfo.phone

  const isAllTermsAccepted = () => terms.terms1 && terms.terms2 && terms.terms3

  // 신청 함수
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

    localStorage.setItem('lastOrder', JSON.stringify(orderRequest))
    orderMutation.mutate(orderRequest)
  }

  return (
    <div
      // 전체 컨테이너
      className="mx-auto flex w-full min-w-[375px] flex-col rounded-3xl bg-white px-4 pb-8 pt-3 sm:max-w-[800px] sm:px-6 lg:gap-6"
    >
      {/* 헤더 영역: 제목 / 총액 / 드롭다운 아이콘(모바일 전용) */}
      <div className="flex items-center justify-between border-b border-black-800 py-4 sm:py-6">
        <h2 className="font-bold h3">예상 총 금액</h2>

        <div className="flex items-center gap-2">
          <p className="font-bold text-blue-primary h2">
            {calculateTotalPrice({ books }).toLocaleString()}원
          </p>
          {/* 모바일 구간에서만 보이는 화살표 버튼 */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="block lg:hidden"
          >
            {/* Heroicons 예시 (chevron-down) */}
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

      {/* lg 이상에서는 항상 리스트 보이도록 */}
      <div className="hidden w-full rounded-xl bg-blue-secondary p-4 sm:p-6 lg:block">
        <ul className="flex flex-col gap-2">
          {books.map((book) => (
            <li key={book.id}>
              <BookInCart {...book} />
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between px-2 pt-4 sm:px-4 sm:pt-8">
          <p className="btn2">배송비</p>
          <p>
            {hasNonDropBooks(books) ? (
              '2,500원'
            ) : (
              <span className="text-blue-primary caption1">
                <del className="text-black">2,500원</del> 0원
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 모바일 전용 드롭다운 영역 */}
      {isDropdownOpen && (
        <div className="block w-full rounded-xl bg-blue-secondary p-4 sm:p-6 lg:hidden">
          <ul className="flex flex-col gap-2">
            {books.map((book) => (
              <li key={book.id}>
                <BookInCart {...book} />
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between px-2 pt-4 sm:px-4 sm:pt-8">
            <p className="caption1">배송비</p>
            <p>
              {hasNonDropBooks(books) ? (
                '2,500원'
              ) : (
                <span className="text-blue-primary caption1">
                  <del className="text-black">2,500원</del> 0원
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* 버튼 영역 */}
      <div className="w-full pt-2 sm:pt-4">
        <Button
          size="lg"
          className="w-full"
          variant="primary"
          disabled={isButtonDisabled()}
          onClick={() => {
            if (pageIndex === 0 || pageIndex === 1) {
              setPageIndex((prev: number) => prev + 1)
            } else if (pageIndex === 2) {
              // 결제(최종) 단계
              openModal(
                <div className="flex w-full flex-col">
                  <div className="pt-6 text-center font-bold text-black btn1">
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
    </div>
  )
}

export default Purchase
