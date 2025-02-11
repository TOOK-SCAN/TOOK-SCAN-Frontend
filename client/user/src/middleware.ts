import type { UserInfoRes } from '@tookscan/types'
import ky from 'ky'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value

  // ✅ 보호된 페이지 목록
  const protectedRoutes = ['/profile']

  // ✅ 로그인되지 않은 사용자는 로그인 페이지로 리디렉트
  if (
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // ✅ Access Token이 존재하면 userInfo 호출하여 유효성 검사
  if (accessToken) {
    try {
      const data: UserInfoRes = await ky
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/briefs`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .json()

      // ✅ 토큰이 유효한지 검사
      const isValidUser =
        data?.success && !data?.error && data?.data?.account_type !== 'GUEST'

      if (!isValidUser) {
        console.log('❌ Invalid User, redirecting to login...')
        return NextResponse.redirect(new URL('/login', req.url))
      }
    } catch (error) {
      console.error('❌ Error validating user:', error)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

// ✅ 적용할 라우트 설정 (로그인 필요 페이지)
export const config = {
  matcher: ['/profile/:path*'],
}
