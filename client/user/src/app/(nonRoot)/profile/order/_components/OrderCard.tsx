'use client'

import { PaymentLabel } from '@/app/(nonRoot)/profile/order/_components/PaymentLabel'
import type { Order } from '@/types'
import { Button, Confirm, Icon } from '@tookscan/components'
import { useModal } from '@tookscan/hooks'
import { devConsole } from '@tookscan/utils'
import React from 'react'
import { orderInfo, steps } from '../_utils/order'

export const OrderCard = ({ data }: { data: Order }) => {
  const { openModal, closeModal } = useModal()
  const currentStatus = data.order_status
    ? data.order_status.trim().toUpperCase()
    : ''
  const currentStepIndex = Math.max(
    steps.findIndex(
      (step) => step.value.trim().toUpperCase() === currentStatus
    ),
    0
  )

  const getVariant = () => {
    if (
      data.order_status === 'COMPANY_ARRIVED' ||
      data.order_status === 'PAYMENT_COMPLETED'
    ) {
      return 'primary'
    } else if (
      data.order_status === 'ALL_COMPLETED' ||
      data.order_status === 'APPLY_COMPLETED'
    ) {
      return 'tertiary'
    } else if (data.order_status === 'SCAN_IN_PROGRESS') {
      return 'disabled'
    }
    return 'disabled'
  }

  const stepForButton = steps.find(
    (step) =>
      step.value.trim().toUpperCase() ===
      data.order_status?.trim().toUpperCase()
  )

  const handleCtaClick = () => {
    const status = data.order_status
    if (status === 'APPLY_COMPLETED') {
      openModal(
        <Confirm title="송신 주소 조회">
          <div className="text-center">
            <h2 className="font-semibold">루원시티 대성베르힐 더 센트로</h2>
            <Button
              variant="primary"
              size="md"
              className="mt-4 w-full"
              onClick={() => closeModal()}
            >
              확인
            </Button>
          </div>
        </Confirm>
      )
    } else if (status === 'COMPANY_ARRIVED') {
      openModal(<></>)
    } else if (status === 'PAYMENT_COMPLETED') {
      openModal(<></>)
    } else if (status === 'SCAN_IN_PROGRESS') {
      // 동작 없음
    } else if (status === 'ALL_COMPLETED') {
      openModal(<></>)
    } else {
      devConsole.log('status not matched')
    }
  }

  return (
    <>
      <div className="mx-auto mt-[12px] w-full max-w-[500px] rounded-[2rem] bg-white p-[24px] shadow md:p-[32px]">
        {/* 상단 경로(진행단계) */}
        <nav className="mb-4 flex items-center gap-1.5">
          {steps.map((step, idx) => (
            <React.Fragment key={step.value}>
              <span
                className={
                  idx <= currentStepIndex
                    ? 'font-semibold text-blue-500'
                    : 'text-gray-500'
                }
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <span className="text-gray-400"> &gt; </span>
              )}
            </React.Fragment>
          ))}
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
        <div className="mb-4 space-y-2">
          {orderInfo(data).map(({ label, value }, index) => (
            <div key={index} className="flex flex-row items-center">
              <span className="mr-3 whitespace-nowrap text-black-400 caption2 md:text-sm">
                {label}
              </span>

              <span className="truncate btn2">
                {label === '결제 수단' ? (
                  value ? (
                    <PaymentLabel
                      label="결제수단"
                      value={
                        data.payment_method ? data.payment_method : undefined
                      }
                      easyPayment={data.easy_payment_provider}
                    />
                  ) : (
                    '결제 필요'
                  )
                ) : (
                  value
                )}
              </span>
            </div>
          ))}
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
          <div className="flex w-full flex-row justify-center gap-3">
            <Button
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={() => openModal(<></>)}
            >
              주문 상세
            </Button>
            <Button
              variant={getVariant()}
              size="md"
              className="flex-1"
              onClick={handleCtaClick}
            >
              {stepForButton ? (
                <>
                  {stepForButton.ctaIcon && (
                    <Icon
                      id={stepForButton.ctaIcon}
                      className="mr-2"
                      width={16}
                      height={16}
                    />
                  )}
                  {stepForButton.cta}
                </>
              ) : (
                data.order_status
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
