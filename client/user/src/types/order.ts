export type OrderStatus =
  | 'APPLY_COMPLETED'
  | 'COMPANY_ARRIVED'
  | 'PAYMENT_COMPLETED'
  | 'SCAN_IN_PROGRESS'
  | 'ALL_COMPLETED'
  | 'CANCEL'
  | 'AS'

export type PaymentMethod =
  | 'CARD'
  | 'VERTUAL_ACCOUNT'
  | 'EASY_PAY'
  | 'PHONE'
  | 'ACCOUNT_TRANSFER'
  | 'GIFT_VOUCHER'

export type EasyPaymentProvider =
  | 'TOSSPAY'
  | 'NAVERPAY'
  | 'SAMSUNGPAY'
  | 'APPLEPAY'
  | 'LPAY'
  | 'KAKAOPAY'
  | 'PINPAY'
  | 'PAYCO'
  | 'SSG'

export interface Order {
  id: number
  status: OrderStatus
  document_description: string
  order_number: number
  order_date: string
  receiver_name: string
  address: string
  payment_method?: PaymentMethod
  easy_payment_provider?: EasyPaymentProvider
  payment_total?: number
}
