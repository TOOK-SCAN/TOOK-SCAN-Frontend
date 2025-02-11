import { kyInstance } from '@tookscan/config'
import type { LoginRes } from '@tookscan/types'
import { NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(request: Request) {
  try {
    const url = `${BACKEND_API_URL}/api/v1/auth/login`
    const formData = new FormData()

    // ✅ 요청의 Content-Type 확인 후 JSON or FormData 변환
    const contentType = request.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      // JSON 요청을 받아 FormData로 변환
      const requestBody = await request.json()
      Object.entries(requestBody).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
    } else {
      // 이미 FormData 형태로 요청이 온 경우 그대로 사용
      const requestFormData = await request.formData()
      requestFormData.forEach((value, key) => {
        formData.append(key, value)
      })
    }

    // ✅ 백엔드 서버로 로그인 요청 전송
    const backendResponse = await kyInstance(url, {
      method: 'POST',
      body: formData,
    })

    // ✅ 백엔드 응답을 LoginRes 타입으로 파싱
    const data: LoginRes = await backendResponse.json()

    // ✅ 백엔드 응답에서 Access Token과 Refresh Token 추출
    const accessToken = data?.data?.access_token
    const refreshToken = data?.data?.refresh_token

    if (!accessToken || !refreshToken) {
      // 토큰이 없으면 400 에러 반환
      return NextResponse.json(
        { error: '토큰이 포함되지 않은 응답입니다.' },
        { status: 400 }
      )
    }

    // ✅ HttpOnly 쿠키로 Access Token 및 Refresh Token 설정 (보안 강화)
    const response = NextResponse.json(data, { status: backendResponse.status })

    response.cookies.set('access_token', accessToken, {
      httpOnly: true, // 클라이언트에서 접근 불가 (XSS 공격 방지)
      secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 HTTPS 필수
      sameSite: 'strict', // CSRF 방지
      path: '/', // 모든 페이지에서 쿠키 사용 가능
    })

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    return response
  } catch (error) {
    // ❌ 예외 발생 시 500 에러 응답
    console.error('❌ Error in /api/proxy/auth/login:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
