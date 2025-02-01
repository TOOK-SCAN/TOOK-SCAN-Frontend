'use client'

import React from 'react'
import SmallCard from '../SmallCard'
import { Button } from '@tookscan/components'
import { useRouter } from 'next/navigation'

export const ThirdPage = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {/* 서비스 흐름도 */}
      <div
        className="rounded-full bg-blue-secondary font-medium text-blue-primary"
        style={{
          fontSize: '14px', // 고정 글씨 크기
          padding: '10px 16px', // 고정 패딩
          marginTop: '24px', // 고정 상단 간격
        }}
      >
        서비스 흐름도
      </div>

      {/* 메인 타이틀 */}
      <h2
        className="text-center font-bold text-blue-primary"
        style={{
          fontSize: '32px', // 고정 글씨 크기
          marginTop: '16px', // 고정 상단 간격
        }}
      >
        톡스캔, 이렇게 사용하세요!
      </h2>

      {/* 메인 콘텐츠 */}
      <div
        className="mt-12 flex flex-col items-center gap-8 lg:flex-row lg:items-start"
        style={{
          marginTop: '24px', // 고정 콘텐츠 상단 간격
        }}
      >
        {/* 큰 이미지 */}
        <div
          className="flex items-center justify-center rounded-lg bg-gray-200 shadow-md"
          style={{
            width: '580px', // 고정 너비
            height: '460px', // 고정 높이
            backgroundColor: '#F3F3F3',
          }}
        >
          {/* 큰 이미지 자리 */}
        </div>

        {/* 작은 카드들 */}
        <div
          className="flex flex-col gap-4"
          style={{
            height: '460px', // 고정 세로 길이
          }}
        >
          <SmallCard
            iconId="apply"
            title="신청하기"
            description="신청서를 작성해요."
          />
          <SmallCard
            iconId="send"
            title="책 보내기"
            description="툭스캔으로 책을 보내요."
          />
          <SmallCard
            iconId="pay"
            title="결제하기"
            description="책이 도착하면 비용을 결제해주세요."
          />
          <SmallCard
            iconId="scan"
            title="스캔하기"
            description="카카오톡으로 전송된 스캔 버튼을 눌러주세요."
          />
          <SmallCard
            iconId="getPDF"
            title="PDF 받기"
            description="이메일에 도착한 파일을 확인해요."
          />
          <SmallCard
            iconId="return"
            title="책 돌려받기"
            description="책은 복원해서 돌려받아요."
          />
        </div>
      </div>

      {/* 버튼 */}
      <div
        className="mt-12"
        style={{
          marginTop: '24px', // 고정 버튼 상단 간격
        }}
      >
        <Button
          size="lg"
          variant="secondary"
          onClick={() => router.push('/apply')}
          className="w-96"
        >
          스캔하러가기
        </Button>
      </div>
    </div>
  )
}
