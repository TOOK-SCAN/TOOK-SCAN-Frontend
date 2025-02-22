'use client'

import { useMutation } from '@tanstack/react-query'
import { logout } from '@tookscan/api'
import { Icon } from '@tookscan/components'
import { useAuth, useToast } from '@tookscan/hooks'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const ClientHeader = () => {
  const pathname = usePathname()
  // 특정 페이지들일 때만 반투명 적용
  const isLanding = ['/', '/howToUse', '/pricing'].includes(pathname)
  const isMobile = false
  const textSize = isMobile ? 'text-[12px]' : 'text-[14px]'
  const heightSize = isMobile ? 'h-4' : 'h-[5.625rem]'
  const [menuOpen, setMenuOpen] = useState(false)

  const { username, isLogin, refetchAuth } = useAuth()
  const { showToast } = useToast()

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      refetchAuth()
      showToast('로그아웃 되었습니다.', 'success', 'check')
    },
  })

  return (
    <div className="z-50 flex">
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

      {/* 헤더 높이만큼 공간 확보 */}
      <div className={clsx('fixed flex w-full items-center', heightSize)}>
        {/* 실제 헤더 박스 */}
        <div
          className={clsx(
            'fixed w-full px-12',
            // 상대 위치로 설정해줘야 자식 absolute가 가운데 배치 가능
            'relative flex items-center justify-between',
            heightSize,
            isLanding ? 'bg-white/10 backdrop-blur-sm' : 'bg-white text-black'
          )}
        >
          {/* ------------------------
              1) 왼쪽: 로고
          ------------------------ */}
          <Link href="/" className="focus:outline-none">
            <Icon
              id="logo"
              className="text-blue-primary"
              width={isMobile ? 52 : 80}
              height={isMobile ? 24 : 36}
            />
          </Link>

          {/* ------------------------
              2) 중앙(absolute): 네비게이션
              md 이상일 때만 표시
          ------------------------ */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-[1.5rem] text-[0.875rem] md:flex">
            <Link href="/login" className="text-black hover:underline">
              가격안내
            </Link>
            <Link href="/apply" className="text-black hover:underline">
              스캔하기
            </Link>
            <Link href="/profile/order" className="text-black hover:underline">
              주문조회
            </Link>
          </nav>

          {/* ------------------------
              3) 오른쪽: 로그인 / 로그아웃
          ------------------------ */}
          <div className={clsx('flex gap-4', textSize)}>
            {!isLogin ? (
              <>
                <Link
                  href="/login"
                  className="flex items-center text-black hover:underline"
                >
                  로그인
                </Link>
                <span className="hidden text-black md:flex">|</span>
                <Link
                  href="/guest/order/check"
                  className="hidden text-black hover:underline md:flex"
                >
                  비회원 주문조회
                </Link>
                <Link
                  href="/join"
                  className="hidden text-black hover:underline md:flex"
                >
                  회원가입
                </Link>
                <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                  <Icon
                    id="menu"
                    width={28}
                    height={28}
                    className="text-black"
                  />
                </button>
              </>
            ) : (
              <>
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

          {menuOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div
                className="h-screen w-full bg-black/80 backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="z-50 mb-8 flex w-full items-center justify-end p-4"
                >
                  <Icon
                    id="close"
                    width={30}
                    height={30}
                    className="text-white"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
