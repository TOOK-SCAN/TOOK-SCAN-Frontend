'use client'

import { useMutation } from '@tanstack/react-query'
import { login } from '@tookscan/api'
import { Button, ConsentLabel, InputField } from '@tookscan/components'
import { ENV } from '@tookscan/config'
import type { ErrorRes, LoginRes } from '@tookscan/types'
import { devConsole, setCookie } from '@tookscan/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SocialLogin from './SocialLogin'

export const LoginForm = () => {
  const router = useRouter()
  const [authPreference, setAuthPreference] = useState({
    saveId: false,
    autoLogin: false,
  })

  const [credentials, setCredentials] = useState({
    id: '',
    password: '',
  })

  const { mutate: loginMutate, error } = useMutation<LoginRes, ErrorRes>({
    mutationFn: () => login(credentials.id, credentials.password),
    onSuccess: (data: LoginRes) => {
      if (data.success && !data.error) {
        devConsole.log('로그인 성공:', data)
        if (ENV.IS_DEV) {
          setCookie('access_token', data.data.access_token, 1)
          setCookie('refresh_token', data.data.refresh_token, 1)
        }
        router.push('/apply')
      }
    },
    onError: (err) => {
      devConsole.log('로그인 실패:', err)
    },
  })

  return (
    <div className="flex w-[440px] flex-col gap-8 rounded-lg bg-white p-6 shadow-md">
      {/* 로그인 헤더 */}
      <div className="border-b-2 border-blue-primary py-4 text-center text-lg font-semibold text-blue-primary">
        로그인
      </div>

      {/* 입력 영역 */}
      <div className="flex flex-col gap-4">
        <div className="flex w-full">
          {/* 아이디 저장 */}
          <div className="flex-1 space-x-1">
            <ConsentLabel
              content="아이디 저장"
              consentStatus={authPreference.saveId}
              size="lg"
              onClick={() =>
                setAuthPreference((prev) => ({
                  ...prev,
                  saveId: !prev.saveId,
                }))
              }
            />
          </div>
          {/* 자동 로그인 */}
          <div className="flex-1 space-x-1">
            <ConsentLabel
              content="자동 로그인"
              consentStatus={authPreference.autoLogin}
              size="lg"
              onClick={() =>
                setAuthPreference((prev) => ({
                  ...prev,
                  autoLogin: !prev.autoLogin,
                }))
              }
            />
          </div>
        </div>

        {/* 아이디, 비밀번호 입력 필드 */}
        <div className="mt-4 space-y-4">
          <InputField
            type="simple"
            placeholder="아이디"
            value={credentials.id}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, id: e.target.value }))
            }
          />
          <InputField
            type="password"
            placeholder="비밀번호"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {error?.error && (
            <p className="absolute text-xs text-red-500">
              {error?.error?.message || '로그인에 실패했습니다.'}
            </p>
          )}
        </div>

        {/* 아이디/비밀번호 찾기 링크 */}
        <div className="mt-6 flex justify-end text-xs text-gray-500">
          <Link href="/id/reset">아이디 · 비밀번호 찾기</Link>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <Button
        className="w-full"
        variant="primary"
        size="md"
        disabled={!credentials.id || !credentials.password}
        onClick={() => loginMutate()}
      >
        로그인
      </Button>

      {/* SNS 로그인 구분선 */}
      <div className="flex items-center space-x-4">
        <hr className="h-px flex-grow bg-gray-300" />
        <span className="text-sm text-gray-500">SNS 로그인</span>
        <hr className="h-px flex-grow bg-gray-300" />
      </div>

      {/* SNS 로그인 버튼 컴포넌트 */}
      <SocialLogin />

      {/* 회원가입 안내 영역 */}
      <div className="w-full p-4 text-center">
        <div className="text-sm font-semibold">아직 계정이 없으신가요?</div>
        <div className="mt-2 text-xs text-black-600">
          회원가입을 통해 툭스캔의 모든 서비스를 이용할 수 있습니다.
        </div>
        <Link href="/join">
          <Button className="mt-4 w-full" variant="secondary" size="md">
            회원가입
          </Button>
        </Link>
      </div>
    </div>
  )
}
