'use client'

import { useMutation } from '@tanstack/react-query'
import { logout } from '@tookscan/api'
import { Icon } from '@tookscan/components'
import { useAuth, useToast } from '@tookscan/hooks'
import { deleteCookie } from '@tookscan/utils'
import clsx from 'clsx'
import Link from 'next/link'

export const ClientHeader = () => {
  const isMobile = false
  const textSize = isMobile ? 'text-[12px]' : 'text-[14px]'
  const heightSize = isMobile ? 'h-4' : 'h-[5.625rem]'

  const { username, isLogin, refetchAuth } = useAuth()
  const { showToast } = useToast()

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      deleteCookie('access_token')
      deleteCookie('refresh_token')
      refetchAuth()
      showToast('로그아웃 되었습니다.', 'success', 'check')
    },
  })

  return (
    <div className="flex">
      <title>Took Scan</title>
      <meta
        name="description"
        content="비대면으로 간편하고, 안전하게! 북스캔의 새로운 기준을 소개드려요. 한 방에 툭스캔!"
      />
      <meta
        name="keywords"
        content="북스캔, pdf 스캔, pdf 제작, 셀프 스캔, 비대면 스캔, 비대면 셀프스캔"
      />
      <meta name="author" content="툭스캔" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="툭스캔, 가장 합리적인 비대면 스캔" />
      <meta
        property="og:description"
        content="비대면으로 간편하고, 안전하게! 북스캔의 새로운 기준을 소개드려요. 한 방에 툭스캔!"
      />
      <meta property="og:url" content="https://tookscan.com" />
      <meta property="og:image" content="/images/Logo.png" />
      <meta property="og:locale" content="ko_KR" />
      {/* Canonical Link */}
      <link rel="canonical" href="https://tookscan.com" />
      <link rel="icon" href="./favicon.png" />
      <div className={clsx('flex w-full', heightSize)} />
      <div
        className={clsx(
          'fixed flex w-full items-center justify-between bg-white px-6 lg:px-12',
          heightSize
        )}
      >
        {/* 로고 */}
        <Link href="/" className="focus:outline-none">
          <Icon
            id="logo"
            className="text-blue-primary"
            width={isMobile ? 52 : 80}
            height={isMobile ? 24 : 36}
          />
        </Link>

        {/* 텍스트 */}
        <div className={`flex items-center gap-4 ${textSize}`}>
          {!isLogin ? (
            <>
              <Link href="/login" className="text-blue-primary hover:underline">
                로그인
              </Link>
              <span className="text-black">|</span>
              <Link
                href="/guest/order/check"
                className="text-black hover:underline"
              >
                비회원 주문조회
              </Link>
              <Link href="/join" className="text-black hover:underline">
                회원가입
              </Link>
            </>
          ) : (
            <>
              {/* 사용자 이름 출력 */}
              <span className="text-blue-primary">{username}</span>
              <span className="text-black">|</span>
              <Link href="/profile" className="text-black hover:underline">
                마이페이지
              </Link>
              <button
                className="text-black hover:underline"
                onClick={() => logoutMutate()}
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
