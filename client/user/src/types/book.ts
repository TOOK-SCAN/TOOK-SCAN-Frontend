export interface Books {
  id?: string
  name: string
  pages: number | undefined
  restoreOption: 'RAW' | 'SPRING' | 'DISCARD' | ''
}

export interface ShippingInfo {
  recipient: string
  phone: string
  email: string
  address: string
  addressDetail: string
  request: string
}

export interface Terms {
  terms1: boolean
  terms2: boolean
  terms3: boolean
  terms4: boolean
}

export const initialShippingInfo: ShippingInfo = {
  recipient: '',
  phone: '',
  email: '',
  address: '',
  addressDetail: '',
  request: '',
}

export const initialTerms: Terms = {
  terms1: false,
  terms2: false,
  terms3: false,
  terms4: false,
}
