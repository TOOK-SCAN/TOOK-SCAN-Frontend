'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon, Tag, Button, useToast } from '@tookscan/components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Success = () => {
  const searchParams = useSearchParams() || ''
  const router = useRouter()
  const order = searchParams.get('order')
  const showToast = useToast()
  const [orderData, setOrderData] = useState<{
    orderDate?: string
    delivery_info?: {
      receiver_name: string
      address: { address_name: string; address_detail: string }
    }
    documents?: {
      name: string
      page_prediction: number
      recovery_option: string
    }[]
  } | null>(null)

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder')
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder)
        console.log('주문 데이터 로드됨:', parsedOrder)
        setOrderData(parsedOrder)
      } catch (error) {
        console.error('JSON 파싱 오류:', error)
      }
    }
  }, [])
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
            <p>
              {orderData?.orderDate
                ? new Date(orderData.orderDate).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '시간 정보 없음'}
            </p>
          </div>
          {orderData?.delivery_info && (
            <div className="flex w-full items-center gap-3">
              <Tag type="default" size="md" variant="secondary">
                <p className="flex w-14 justify-center">받는 이</p>
              </Tag>
              <p>{orderData.delivery_info.receiver_name}</p>
            </div>
          )}
          {orderData?.documents && (
            <div className="flex w-full items-center gap-3">
              <Tag type="default" size="md" variant="secondary">
                <p className="flex w-14 justify-center">주문 상품</p>
              </Tag>
              <p>
                {orderData.documents.length > 1
                  ? `${orderData.documents[0].name} 외 ${orderData.documents.length - 1}건`
                  : orderData.documents[0].name}
              </p>
            </div>
          )}
          {orderData?.documents && (
            <div className="flex w-full items-center gap-3">
              <Tag type="default" size="md" variant="secondary">
                <p className="flex w-14 justify-center">예상 견적</p>
              </Tag>
              <p>
                {orderData.documents
                  .reduce(
                    (total, book) =>
                      total +
                      book.page_prediction * 10 +
                      (book.recovery_option === 'SPRING' ? 4000 : 0),
                    0
                  )
                  .toLocaleString()}
                원
              </p>
            </div>
          )}
          {orderData?.delivery_info?.address?.address_name && (
            <div className="flex w-full items-center gap-3">
              <Tag type="default" size="md" variant="secondary">
                <p className="flex w-14 justify-center">배송지</p>
              </Tag>
              <p>
                {orderData.delivery_info.address.address_name}{' '}
                {orderData.delivery_info.address.address_detail}
              </p>
            </div>
          )}
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
