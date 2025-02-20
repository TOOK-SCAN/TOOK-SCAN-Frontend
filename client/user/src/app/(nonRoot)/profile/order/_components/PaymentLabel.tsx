import type { EasyPaymentProvider, PaymentMethod } from '@/types'
import React from 'react'
import { easyPayMapping, PaymentMapping } from '../_utils/order'

interface PaymentLabelProps {
  label: string
  value?: PaymentMethod
  easyPayment?: EasyPaymentProvider
}

export const PaymentLabel: React.FC<PaymentLabelProps> = ({
  label,
  value,
  easyPayment,
}) => {
  if (label !== '결제수단') {
    return <span className="truncate btn2">{value}</span>
  }

  if (!value) {
    return <span className="truncate btn2">결제 필요</span>
  }

  if (value.toUpperCase() === 'EASY_PAY') {
    if (easyPayment) {
      const key = easyPayment.toLowerCase() as keyof typeof easyPayMapping
      const mapped = easyPayMapping[key] || {
        label: easyPayment,
        color: 'text-gray-500',
      }
      return (
        <span className="truncate btn2" title={`간편 결제 / ${mapped.label}`}>
          간편 결제 / <span className={mapped.color}>{mapped.label}</span>
        </span>
      )
    }
    return <span className="truncate btn2">간편 결제</span>
  } else {
    const mapped =
      PaymentMapping[value.toUpperCase() as keyof typeof PaymentMapping] ||
      value
    return <span className="truncate btn2">{mapped}</span>
  }
}
