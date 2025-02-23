export const easyPayMapping = {
  tosspay: { label: '토스페이', color: 'text-blue-500' },
  naverpay: { label: '네이버페이', color: 'text-green-500' },
  samsungpay: { label: '삼성페이', color: 'text-blue-800' },
  applepay: { label: '애플페이', color: 'text-blue-800' },
  lpay: { label: 'L.PAY', color: 'text-sky-500' },
  kakaopay: { label: '카카오페이', color: 'text-yellow-500' },
  pinpay: { label: '핀페이', color: 'text-indigo-700' },
  payco: { label: '페이코', color: 'text-red-500' },
  ssg: { label: 'SSG페이', color: 'text-pink-500' },
}

export const PaymentMapping = {
  CARD: '카드',
  VERTUAL_ACCOUNT: '가상계좌',
  EAEASY_PAYSY: '간편 결제',
  PHONE: '휴대폰 결제',
  ACCOUNT_TRANSFER: '계좌이체',
  GIFT_VOUCHER: '상품권',
}

export const steps = [
  {
    label: '신청 완료',
    value: 'APPLY_COMPLETED',
    cta: '송신 주소 조회',
    ctaIcon: null,
  },
  {
    label: '업체 도착',
    value: 'COMPANY_ARRIVED',
    cta: '결제',
    ctaIcon: 'wallet2',
  },
  {
    label: '결제 완료',
    value: 'PAYMENT_COMPLETED',
    cta: '스캔',
    ctaIcon: 'barcode-read',
  },
  {
    label: '스캔 중',
    value: 'SCAN_IN_PROGRESS',
    cta: '스캔 중',
    ctaIcon: null,
  },
  {
    label: '작업 완료',
    value: 'ALL_COMPLETED',
    cta: '배송 조회',
    ctaIcon: null,
  },
]

export const orderInfo = (data: {
  document_description: string
  order_number: number
  address: string
  payment_method?: string
}) => [
  { label: '주문 상품', value: data.document_description },
  { label: '주문 번호', value: data.order_number.toString() },
  { label: '배송 정보', value: data.address },
  { label: '결제 수단', value: data.payment_method },
]
