import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import { Button } from '@tookscan/components'
import {
  calculateTotalPrice,
  hasNonDropBooks,
} from '@/app/(nonRoot)/apply/_utils/calculateBookPrice'
import clsx from 'clsx'
import { BookInCart } from '@/app/(nonRoot)/apply/_components/index'
import { useModal } from '@tookscan/hooks'
import { useRouter } from 'next/navigation'

const 주문번호 = '20204121721330' // TODO: 주문번호 API 연결
const 신청함수 = async () => {}

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
                    onClick={() => {
                      신청함수()
                        .then(() => {
                          router.push(`/apply/success?order=${주문번호}`)
                          closeModal()
                          ignoreBeforeUnload.current = true
                        })
                        .catch(() => {
                          closeModal()
                        })
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
