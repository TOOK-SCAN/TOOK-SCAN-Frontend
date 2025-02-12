import { kyInstance } from '@tookscan/config'
import type { ReissueTokenRes } from '@tookscan/types'
import { devConsole } from '@tookscan/utils'
import ky from 'ky'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL
const MAX_RETRY = 3 // ✅ 최대 3번 재발급 시도

/**
 * 백엔드 API 프록시 요청을 처리하는 함수
 * - 요청을 백엔드로 전달하고 응답을 클라이언트로 반환
 * - Access Token이 만료된 경우 최대 3번까지 Refresh Token으로 자동 갱신
 */
async function proxyRequest(request: Request, slug: string[], retryCount = 0) {
  // ✅ 클라이언트의 HttpOnly 쿠키에서 Access Token, Refresh Token 가져오기
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('access_token')?.value
  let refreshToken = cookieStore.get('refresh_token')?.value

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
  let backendResponse: Response
  try {
    backendResponse = await kyInstance(url.toString(), {
      method: request.method,
      headers,
      body:
        request.method !== 'GET' && request.method !== 'HEAD'
          ? await request.text()
          : undefined,
    })
  } catch (error) {
    devConsole.error('🚨 API 요청 중 네트워크 오류 발생:', error)
    if (typeof error === 'object' && error !== null && 'error' in error) {
      const err = error as { error?: { code: number } }
      if (err.error?.code === 40101 || err.error?.code === 40001) {
        devConsole.log('🔒 Access Token expired. Attempting refresh...')
        if (retryCount >= MAX_RETRY) {
          devConsole.log(
            '❌ Maximum token refresh attempts reached. Logging out...'
          )

          // ✅ 쿠키 초기화 (토큰 삭제)
          cookieStore.delete('access_token')
          cookieStore.delete('refresh_token')

          // ✅ 로그인 페이지로 리디렉트
          return NextResponse.redirect(new URL('/login', request.url))
        }

        devConsole.log(
          `🔄 Access Token expired. Attempting refresh... (${retryCount + 1}/${MAX_RETRY})`
        )

        const reissueToken = async (): Promise<ReissueTokenRes> => {
          const response = await ky.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reissue/token`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          )

          return response.json()
        }

        const refreshResponse = await reissueToken()

        if (refreshResponse.success) {
          accessToken = refreshResponse.data.access_token
          refreshToken = refreshResponse.data.refresh_token
          devConsole.log('✅ Access Token refreshed successfully')

          // ✅ 새 Access Token & Refresh Token을 쿠키에 저장
          cookieStore.set('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            path: '/',
          })
          cookieStore.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            path: '/',
          })

          // ✅ 새로운 Access Token으로 백엔드 API 재요청 (재귀 호출)
          headers.set('Authorization', `Bearer ${accessToken}`)
          return proxyRequest(request, slug, retryCount + 1)
        }
      }
    }
    return NextResponse.json({ error: '네트워크 오류 발생' }, { status: 502 })
  }

  // ✅ 응답이 JSON인지 확인 후 변환 (예외 처리 포함)
  let data
  try {
    data = await backendResponse.json()
  } catch (error) {
    devConsole.error('⚠️ Error parsing JSON response:', error)
    return NextResponse.json(
      { error: '응답 데이터 파싱 오류' },
      { status: backendResponse.status } // 원래 상태 코드 유지
    )
  }

  // ✅ 백엔드 응답 상태 코드 유지하여 클라이언트에 반환
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
