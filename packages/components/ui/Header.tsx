'use client'

import React from 'react'
import Link from 'next/link'
import Icon from '../ui/Icon/Icon'
import clsx from 'clsx'

interface HeaderProps {
  type: 'default' | 'logged-in' // 헤더 타입
  userName?: string // 로그인한 사용자 이름
}

const Header = ({ type, userName }: HeaderProps) => {
  const isMobile = false
  const textSize = isMobile ? 'text-[12px]' : 'text-[14px]'
  const heightSize = isMobile ? 'h-4' : 'h-[5.625rem]'

  return (
    <head className="flex">
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `,
        }}
      />
      {/* End Google Tag Manager */}

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
          {type === 'default' && (
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
          )}
          {type === 'logged-in' && (
            <>
              {/* 사용자 이름 출력 */}
              <span className="text-blue-primary">{userName}</span>
              <span className="text-black">|</span>
              <Link href="/profile" className="text-black hover:underline">
                마이페이지
              </Link>
              <Link href="/logout" className="text-black hover:underline">
                로그아웃
              </Link>
            </>
          )}
        </div>
      </div>
    </head>
  )
}

export default Header
