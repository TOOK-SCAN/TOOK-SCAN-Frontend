'use client'

import React from 'react'
import Link from 'next/link'
import { Icon, Button } from '@tookscan/components'

const SuccessPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-secondary text-center">
      {/* 원 3개 */}
      <div className="mb-6 flex items-center justify-center space-x-3">
        <div className="h-4 w-4 rounded-full bg-gray-300"></div>
        <div className="h-4 w-4 rounded-full bg-blue-primary"></div>
        <div className="h-4 w-4 rounded-full bg-gray-300"></div>
      </div>

      {/* 로고 */}
      <div className="mb-6">
        <Icon id="logo" className="text-blue-primary" width={80} height={36} />
      </div>

      {/* 타이틀 */}
      <h1 className="mb-2 text-[24px] font-bold text-blue-primary">
        가입성공!
      </h1>
      <p className="text-[16px] text-black-700">TOOK로 가볍게 스캔해보세요!</p>

      {/* 버튼 */}
      <div className="mt-8 flex flex-col items-center space-y-4">
        {/* 로그인 버튼 */}
        <Link href="/signin" className="w-full">
          <Button className="w-64" variant="primary" size="lg">
            로그인
          </Button>
        </Link>

        {/* 홈으로 버튼 */}
        <Link href="/" className="w-full">
          <Button className="w-64" variant="secondary" size="lg">
            홈으로
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SuccessPage
