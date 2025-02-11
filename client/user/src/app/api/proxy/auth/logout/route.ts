import { proxyInstance } from '@tookscan/config'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST() {
  try {
    const url = `${BACKEND_API_URL}/api/v1/auth/logout`

    // ✅ 클라이언트의 HttpOnly 쿠키에서 Access Token 가져오기
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    // ✅ 요청 헤더 설정 (Access Token 포함)
    const headers: HeadersInit = {}
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    // ✅ 백엔드로 로그아웃 요청 전송
    const backendResponse = await proxyInstance(url, {
      method: 'POST',
      headers,
    })

    // ✅ 응답 데이터 변환
    const data = await backendResponse.json()

    // ✅ 로그아웃 성공 시 쿠키 삭제 (HttpOnly 쿠키 만료)
    if (backendResponse.ok) {
      console.log('✅ 로그아웃 성공, 쿠키 삭제 중...')
      const response = NextResponse.json(
        { message: '로그아웃 완료' },
        { status: 200 }
      )

      response.cookies.set('access_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0, // 즉시 만료
      })

      response.cookies.set('refresh_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0, // 즉시 만료
      })

      return response
    }

    // ❌ 백엔드 로그아웃 실패 시 오류 반환
    return NextResponse.json(data, { status: backendResponse.status })
  } catch (error) {
    console.error('❌ Error in /api/proxy/auth/logout:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
