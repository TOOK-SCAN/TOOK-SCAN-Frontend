import type { UserInfoRes } from '@tookscan/types'
import { cookieOptions } from '@tookscan/utils'
import ky from 'ky'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value
  const refreshToken = req.cookies.get('refresh_token')?.value
  const protectedRoutes = ['/profile']

  if (
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Access Token이 있으면 유효성 검사
  if (accessToken) {
    try {
      const data: UserInfoRes = await ky
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/briefs`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .json()

      const isValidUser =
        data?.success && !data?.error && data?.data?.account_type !== 'GUEST'

      if (!isValidUser) {
        throw new Error('Token invalid')
      }
    } catch (error) {
      // 토큰 검증 실패 시(예: 만료된 토큰) 재발급 시도
      if (refreshToken) {
        try {
          const reissueRes = await ky
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reissue/token`,
              {
                headers: { Authorization: `Bearer ${refreshToken}` },
              }
            )
            .json<{
              success: boolean
              data: { access_token: string; refresh_token: string }
            }>()

          if (reissueRes.success) {
            // 새로운 토큰으로 쿠키 업데이트
            const response = NextResponse.next()
            response.cookies.set(
              'access_token',
              reissueRes.data.access_token,
              cookieOptions(3600)
            )
            response.cookies.set(
              'refresh_token',
              reissueRes.data.refresh_token,
              cookieOptions()
            )
            // 토큰 재발급 성공 시, middleware에서 바로 다음 단계로 진행
            return response
          }
        } catch (reissueError) {
          console.error('❌ Token reissue failed:', reissueError)
        }
      }
      // 재발급 실패 시 /login으로 리디렉션
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*'],
}
