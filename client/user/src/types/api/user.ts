import type { Common } from '@tookscan/types'

export type UserSummariesResponse = Common<{
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
}>

export type UserDetailRes = Common<{
  name: string
  provider: 'DEFAULT' | 'KAKAO' | 'GOOGLE'
  serial_id?: string
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
  is_receive_email: boolean
  is_receive_sms: boolean
}>

export interface UserDetailFetchRequest {
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
  is_receive_email: boolean
  is_receive_sms: boolean
}

export type UserDetailFetchRes = Common<null>

export type PWFetchRes = Common<null>
