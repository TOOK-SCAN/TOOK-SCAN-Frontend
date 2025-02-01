'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon, Tag, Button, useToast } from '@tookscan/components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Success = () => {
  const searchParams = useSearchParams() || ''
  const router = useRouter()
  const order = searchParams.get('order')
  const showToast = useToast()

  return (
    <div className="flex min-h-screen w-[36rem] flex-col items-center gap-12">
      <div className="flex flex-col items-center">
        <Icon id="logo" width={150} height={66} className="text-blue-primary" />
        <h1 className="mt-8 text-2xl font-bold text-blue-primary">
          신청이 완료되었습니다!
        </h1>
        <div className="mt-4 flex flex-col items-center text-lg font-semibold text-black">
          Took Scan을 이용해 주셔서 감사합니다. <br />
          <div>
            신청 내역은{' '}
            <Link href={'/profile'} className="text-blue-primary">
              마이페이지
            </Link>
            에서 볼 수 있어요!
          </div>
        </div>
      </div>

      {/* TODO: 컴포넌트화 하기 */}
      <div className="flex w-full flex-col gap-8 rounded-3xl bg-white p-12">
        <div className="flex w-full flex-row justify-between border-b pb-6 text-2xl font-semibold">
          <h2 className="text-black">주문 번호</h2>
          <p className="flex flex-row text-blue-primary">
            {order}
            <button
              onClick={() => {
                if (order) {
                  navigator.clipboard.writeText(order).then(
                    () => {
                      showToast(
                        '주문번호가 복사되었습니다.',
                        'success',
                        'done-circle'
                      )
                    },
                    (err) => {
                      showToast(
                        '주문번호 복사에 실패했습니다. : ' + err,
                        'error',
                        'warning-2'
                      )
                    }
                  )
                }
              }}
            >
              <Icon id="duplicate" className="ml-2" width={26} height={26} />
            </button>
          </p>
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div>
            <span className="text-blue-primary">신청 완료</span> &gt; 업체 도착
            &gt; 스캔 진행 &gt; 작업 완료
          </div>
          <div className="flex w-full items-center gap-3">
            <Tag type="default" size="md" variant="secondary">
              <p className="flex w-14 justify-center">주문일시</p>
            </Tag>
            <p>2025.01.26 (일) 20:00</p>
          </div>
          <div className="flex w-full items-center gap-3">
            <Tag type="default" size="md" variant="secondary">
              <p className="flex w-14 justify-center">받는 이</p>
            </Tag>
            <p>이종석</p>
          </div>
          <div className="flex w-full items-center gap-3">
            <Tag type="default" size="md" variant="secondary">
              <p className="flex w-14 justify-center">주문 상품</p>
            </Tag>
            <p>노인과 바다 외 2건</p>
          </div>
          <div className="flex w-full items-center gap-3">
            <Tag type="default" size="md" variant="secondary">
              <p className="flex w-14 justify-center">예상 견적</p>
            </Tag>
            <p>25,500원</p>
          </div>
          <div className="flex w-full items-center gap-3">
            <Tag type="default" size="md" variant="secondary">
              <p className="flex w-14 justify-center">배송지</p>
            </Tag>
            <p>경기도 시흥시 산기대학로 237 TIP, 1203호</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <Button
          className="flex w-full"
          variant="primary"
          size="lg"
          onClick={() => router.push('/profile')}
        >
          마이페이지
        </Button>
        <Link href="/">
          <Button className="flex w-full" variant="tertiary" size="lg">
            홈으로
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Success
