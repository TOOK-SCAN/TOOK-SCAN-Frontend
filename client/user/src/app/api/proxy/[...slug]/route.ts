import { proxyInstance } from '@tookscan/config'
import { devConsole } from '@tookscan/utils'
import ky from 'ky'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * 백엔드 API 프록시 요청을 처리하는 함수
 * - 요청을 백엔드로 전달하고 응답을 클라이언트로 반환
 * - Access Token이 만료된 경우 Refresh Token으로 자동 갱신
 */
async function proxyRequest(request: Request, slug: string[]) {
  // ✅ 클라이언트의 HttpOnly 쿠키에서 Access Token, Refresh Token 가져오기
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value

  // ✅ 백엔드 API 경로 생성 (ex: /api/v1/auth/login)
  const backendPath = slug.join('/')
  const url = new URL(`${BACKEND_API_URL}/api/v1/${backendPath}`)

  // ✅ 원래 요청의 쿼리 파라미터 유지
  const requestUrl = new URL(request.url)
  requestUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  // ✅ 요청 헤더 설정
  const headers = new Headers(request.headers)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  // ✅ 백엔드로 API 요청 전송
  let backendResponse = await proxyInstance(url.toString(), {
    method: request.method,
    headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.text()
        : undefined,
  })

  // ✅ Access Token이 만료된 경우 Refresh Token을 이용해 재발급 후 재요청
  if (backendResponse.status === 401 && refreshToken) {
    devConsole.log('🔄 Access Token expired. Trying to refresh token...')
    const refreshResponse = await ky.post(
      `${BACKEND_API_URL}/auth/reissue/token`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    )

    if (refreshResponse.ok) {
      const refreshData = (await refreshResponse.json()) as {
        access_token: string
      }
      accessToken = refreshData.access_token
      devConsole.log('✅ Access Token refreshed successfully')

      // ✅ 새 Access Token을 쿠키에 저장 (보안 설정 포함)
      const response = NextResponse.json(
        { message: 'Token refreshed, retrying request' },
        { status: 200 }
      )
      if (accessToken) {
        response.cookies.set('access_token', accessToken, {
          httpOnly: true, // XSS 방지를 위해 클라이언트에서 접근 불가
          secure: true, // HTTPS 환경에서만 전송
          path: '/',
        })
      }

      // ✅ 새로운 Access Token으로 백엔드 API 재요청
      headers.set('Authorization', `Bearer ${accessToken}`)
      backendResponse = await proxyInstance(url.toString(), {
        method: request.method,
        headers,
        body:
          request.method !== 'GET' && request.method !== 'HEAD'
            ? await request.text()
            : undefined,
      })
    }
  }

  // ✅ 응답이 JSON인지 확인 후 변환 (예외 처리 포함)
  let data
  try {
    data = await backendResponse.json()
  } catch (error) {
    devConsole.error('⚠️ Error parsing JSON response:', error)
    data = await backendResponse.text()
  }

  const response = NextResponse.json(data, { status: backendResponse.status })

  // ✅ 백엔드의 Set-Cookie 헤더가 있을 경우 클라이언트로 전달
  backendResponse.headers.forEach((value, key) => {
    if (key.toLowerCase().includes('set-cookie')) {
      response.headers.set(key, value)
    }
  })

  return response
}

// ✅ HTTP 메서드별 프록시 핸들러 (GET, POST, PUT, DELETE, PATCH)
export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  return proxyRequest(request, params.slug)
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  return proxyRequest(request, params.slug)
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  return proxyRequest(request, params.slug)
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  return proxyRequest(request, params.slug)
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  return proxyRequest(request, params.slug)
}
