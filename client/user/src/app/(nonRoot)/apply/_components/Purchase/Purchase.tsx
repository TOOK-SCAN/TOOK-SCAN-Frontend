import { postOrder } from '@/api/order'
import { BookInCart } from '@/app/(nonRoot)/apply/_components/index'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import {
  calculateTotalPrice,
  hasNonDropBooks,
} from '@/app/(nonRoot)/apply/_utils/calculateBookPrice'
import type { OrderRequest, OrderResponse } from '@/types/api/apply/order'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@tookscan/components'
import { useAuth, useModal } from '@tookscan/hooks'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

const Purchase = () => {
  const {
    books,
    pageIndex,
    setPageIndex,
    terms,
    ignoreBeforeUnload,
    shippingInfo,
  } = useApplyContext()
  const { openModal, closeModal } = useModal()
  const router = useRouter()
  const { isLogin } = useAuth()

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
        typeof error.message === 'string'
      ) {
        errorMessage = error.message
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

  const apply = async () => {
    const orderRequest = {
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
      orderDate: new Date().toISOString(),
    }

    localStorage.setItem('lastOrder', JSON.stringify(orderRequest))
    orderMutation.mutate(orderRequest)
  }
  return (
    <div
      className={clsx(
        'flex w-full flex-col gap-6 rounded-3xl bg-white px-6 pb-8 pt-3'
      )}
    >
      <div
        className={clsx(
          'flex justify-between border-b border-black-800 px-3 py-6 text-2xl font-bold'
        )}
      >
        <h2 className="">예상 총 금액</h2>
        <p className="text-blue-primary">
          {calculateTotalPrice({ books }).toLocaleString()}원
        </p>
      </div>
      <hr className="-mt-6 border-[1px]" />
      <div className={clsx('w-full rounded-xl bg-blue-secondary p-6')}>
        <ul className="flex flex-col gap-2">
          {books.map((book) => (
            <li key={book.id}>
              <BookInCart {...book} />
            </li>
          ))}
        </ul>

        <div className={clsx('flex items-center justify-between px-4 pt-8')}>
          <p className="font-semibold">배송비</p>
          <p>
            {hasNonDropBooks(books) ? (
              '2,500원'
            ) : (
              <span className="text-lg text-blue-primary">
                <del className="text-black">2,500원</del> 0원
              </span>
            )}
          </p>
        </div>
      </div>
      <Button
        size="lg"
        className="w-full"
        variant="primary"
        disabled={
          books.length === 0 ||
          (!(terms.terms1 && terms.terms2 && terms.terms3) &&
            pageIndex === 2) ||
          (pageIndex === 1 &&
            (hasNonDropBooks(books)
              ? !(
                  shippingInfo.recipient &&
                  shippingInfo.phone &&
                  shippingInfo.address &&
                  shippingInfo.addressDetail
                )
              : !(shippingInfo.recipient && shippingInfo.phone)))
        }
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
