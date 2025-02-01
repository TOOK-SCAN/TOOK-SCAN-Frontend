'use client'

import React from 'react'
import Image from 'next/image'
import MainCard from '@/assets/images/landing/MainCard.svg'
import { Button, Icon } from '@tookscan/components'
import { useRouter } from 'next/navigation'

export const FirstPage = () => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center bg-blue-primary">
      <div
        className="flex w-full items-center justify-between"
        style={{
          maxWidth: '1400px', // 고정 최대 너비
          height: '100%',
          padding: '0 32px', // px-4를 하드코딩
        }}
      >
        {/* 왼쪽 콘텐츠 */}
        <div
          className="flex flex-col items-start justify-center"
          style={{
            flex: '1 1 50%',
            minWidth: '300px',
            gap: '16px', // 텍스트와 버튼 사이 간격
          }}
        >
          {/* 로고 */}
          <Icon id="logo" width={150} height={66} className="text-white" />

          {/* 텍스트 */}
          <h1
            className="text-left font-bold text-white"
            style={{
              fontSize: '40px', // 폰트 크기
              lineHeight: '1.5', // 라인 높이
            }}
          >
            가벼운 대학생활
            <br />
            톡스캔에서 시작하자!
          </h1>

          {/* 버튼 */}
          <Button
            variant="secondary"
            size="lg"
            className="w-96 hover:bg-blue-secondary"
            onClick={() => {
              // 신청 페이지로 이동
              router.push('/apply')
            }}
          >
            신청하러가기
          </Button>
        </div>

        {/* 오른쪽 이미지 */}
        <div
          className="flex items-center justify-center"
          style={{
            flex: '1 1 50%',
            width: '900px', // 가로 길이
            height: '520px', // 세로 길이
            borderRadius: '50px', // 라운드 처리
            marginLeft: '-220px', // 텍스트와 이미지 간 간격
          }}
        >
          <Image
            src={MainCard}
            alt="Main Card"
            className="object-cover"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'inherit', // 부모의 라운드 처리 상속
            }}
          />
        </div>
      </div>
    </div>
  )
}
