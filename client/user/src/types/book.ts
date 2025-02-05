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
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_name: string
  region_4depth_name?: string
  addressDetail: string
  longitude: number
  latitude: number
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
  region_1depth_name: '',
  region_2depth_name: '',
  region_3depth_name: '',
  region_4depth_name: '',
  addressDetail: '',
  longitude: 0,
  latitude: 0,
  request: '',
}

export const initialTerms: Terms = {
  terms1: false,
  terms2: false,
  terms3: false,
  terms4: false,
}
