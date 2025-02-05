// TODO : 프록시 API 라우트를 작성 마저 완성 필요

import { httpInstance } from '@tookscan/config'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || 'https://backend.example.com'

async function proxyRequest(request: Request, slug: string[]) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accesstoken')?.value

  const backendPath = slug.join('/')
  const url = new URL(`${BACKEND_API_URL}/${backendPath}`)

  const requestUrl = new URL(request.url)
  requestUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  const headers = new Headers(request.headers)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  const backendResponse = await httpInstance(url.toString(), {
    method: request.method,
    headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.text()
        : undefined,
  })

  const data = await backendResponse.text()

  return NextResponse.json(JSON.parse(data), { status: backendResponse.status })
}

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
