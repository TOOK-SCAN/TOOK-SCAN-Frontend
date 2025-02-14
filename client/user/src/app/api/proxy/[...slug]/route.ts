/* eslint-disable @typescript-eslint/no-explicit-any */
import { kyInstance } from '@tookscan/config'
import type { ErrorRes, ReissueTokenRes } from '@tookscan/types'
import { cookieOptions, devConsole } from '@tookscan/utils'
import ky from 'ky'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL
const MAX_RETRY = 3 // 최대 3번 재발급 시도

/**
 * 백엔드 API 프록시 요청을 처리하는 함수
 * - 요청을 백엔드로 전달하고 응답을 클라이언트로 반환
 * - Access Token이 만료된 경우 최대 3번까지 Refresh Token으로 자동 갱신
 */

async function proxyRequest(
  request: Request,
  slug: string[],
  retryCount = 0
): Promise<NextResponse> {
  // 클라이언트의 HttpOnly 쿠키에서 Access Token, Refresh Token 가져오기
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('access_token')?.value
  let refreshToken = cookieStore.get('refresh_token')?.value

  // 백엔드 API 경로 생성 (ex: /api/v1/auth/login)
  const backendPath = slug.join('/')
  const url = new URL(`${BACKEND_API_URL}/api/v1/${backendPath}`)

  // 원래 요청의 쿼리 파라미터 유지
  const requestUrl = new URL(request.url)
  requestUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  // 요청 헤더 설정
  const headers = new Headers(request.headers)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  // 백엔드로 API 요청 전송
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
  } catch (error: any) {
    devConsole.error('🚨 API 요청 중 네트워크 오류 발생:', error)
    if (error) {
      backendResponse = error.response
      return NextResponse.json(error, { status: error.status })
    } else if (
      (error.error?.code === 40101 || error.error?.code === 40103) &&
      refreshToken
    ) {
      if (retryCount >= MAX_RETRY) {
        devConsole.log(
          '❌ Maximum token refresh attempts reached. Logging out...'
        )
        // 로그인 페이지로 리디렉트
        return NextResponse.redirect(new URL('/login', request.url))
      }

      devConsole.log(
        `🔄 Access Token expired. Attempting refresh... (${retryCount + 1}/${MAX_RETRY})`
      )
      // 재발급 API 호출 함수 정의
      const reissueToken = async (): Promise<ReissueTokenRes | ErrorRes> => {
        try {
          const response = await ky.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reissue/token`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
          if (!response.ok) {
            devConsole.error('❌ Error refreshing token:', response.statusText)
            cookieStore.delete('access_token')
            cookieStore.delete('refresh_token')
            return {
              success: false,
              data: null,
              error: {
                message: 'Token reissue failed',
                code: response.status,
              },
            }
          }
          return await response.json()
        } catch (error) {
          devConsole.error('❌ Exception during token reissue:', error)
          // 쿠키 초기화 후 실패 처리
          cookieStore.delete('access_token')
          cookieStore.delete('refresh_token')
          return {
            success: false,
            data: null,
            error: {
              message: 'Token reissue failed',
              code: 401,
            },
          }
        }
      }

      const refreshResponse = await reissueToken()

      if (refreshResponse.success) {
        accessToken = refreshResponse.data.access_token
        refreshToken = refreshResponse.data.refresh_token
        devConsole.log('✅ Access Token refreshed successfully')

        // 새 Access Token & Refresh Token을 쿠키에 저장 (예: 3600초, 604800초 만료)
        cookieStore.set('access_token', accessToken, cookieOptions())
        cookieStore.set('refresh_token', refreshToken, cookieOptions())

        // 새로운 Access Token으로 헤더 업데이트 후 재요청 (재귀 호출)
        headers.set('Authorization', `Bearer ${accessToken}`)
        return proxyRequest(request, slug, retryCount + 1)
      } else {
        devConsole.log(
          '❌ Refresh Token expired or reissue failed. Logging out...'
        )
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
    return NextResponse.json({ error: '네트워크 오류 발생' }, { status: 502 })
  }

  // Access Token이 만료되었거나 권한이 없을 경우 (401 또는 403) refreshToken으로 재발급 시도

  // 응답이 JSON인지 확인 후 변환 (예외 처리 포함)
  let data
  try {
    data = await backendResponse.json()
  } catch (error) {
    devConsole.error('⚠️ Error parsing JSON response:', error)
    return NextResponse.json(
      { error: '응답 데이터 파싱 오류' },
      { status: backendResponse.status }
    )
  }

  // 백엔드 응답 상태 코드 유지하여 클라이언트에 반환
  const response = NextResponse.json(data, { status: backendResponse.status })

  // 백엔드의 Set-Cookie 헤더가 있을 경우 클라이언트로 그대로 전달
  backendResponse.headers.forEach((value, key) => {
    if (key.toLowerCase().includes('set-cookie')) {
      response.headers.set(key, value)
    }
  })

  return response
}

// HTTP 메서드별 프록시 핸들러 (GET, POST, PUT, DELETE, PATCH)
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
