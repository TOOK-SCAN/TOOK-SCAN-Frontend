import type {
  SignUpDefaultRequest,
  SignUpIDCheckResponse,
  SignUpOAuthRequest,
  SignUpResponse,
} from '@/types'
import { httpInstance } from '@tookscan/config'

// 기본 회원가입
export const signUpDefault = async (
  userData: SignUpDefaultRequest
): Promise<SignUpResponse> =>
  httpInstance.post('auth/users/sign-up-default', { json: userData }).json()

// 소셜 회원가입 - 헤더에 일회용 토큰 필요, 수정해야함
export const signUpOAuth = async (
  userData: SignUpOAuthRequest
): Promise<SignUpResponse> =>
  httpInstance.post('auth/users/sign-up-oauth', { json: userData }).json()

// 아이디 중복검사
export const signUpIDCheck = async (
  serial_id: string
): Promise<SignUpIDCheckResponse> =>
  httpInstance
    .get(`auth/existence/serial-id?serial-id=${encodeURIComponent(serial_id)}`)
    .json()
