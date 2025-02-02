export interface OrderRequest {
  documents: {
    name: string
    request: string
    page_prediction: number
    recovery_option: 'DISCARD' | 'RAW' | 'SPRING'
  }[]
  delivery_info: {
    receiver_name: string
    phone_number: string
    email: string
    authentication_code?: string
    request: string
    address: {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
      region_4depth_name?: string
      address_detail: string
      longitude: number
      latitude: number
    }
  }
}

export interface OrderResponse {
  success: boolean
  data?: {
    order_number: string
    name: string
    payment_prediction: number
    email: string
    address: string
  }
  error?: string
}

export interface UserSummariesResponse {
  success: boolean
  data: {
    name: string
    phone_number: string
    email?: string
    address?: {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
      region_4depth_name?: string
      address_detail: string
      longitude: number
      latitude: number
    }
  }
  error?: string | null
}
