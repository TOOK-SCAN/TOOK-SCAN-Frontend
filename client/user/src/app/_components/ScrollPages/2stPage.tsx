'use client'

import React from 'react'
import GradientCard from '../GradientCard'
import Book from '@/assets/images/landing/Book.svg'
import Hammer from '@/assets/images/landing/Hammer.svg'

export const SecondPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {/* 서비스 소개 */}
      <div
        className="rounded-full bg-blue-secondary text-center font-medium text-blue-primary"
        style={{
          fontSize: '14px', // 고정 글씨 크기
          padding: '10px 16px', // 고정 패딩
          marginTop: '24px', // 고정 상단 간격
        }}
      >
        서비스 소개
      </div>

      {/* 메인 타이틀 */}
      <h2
        className="text-center font-bold text-blue-primary"
        style={{
          fontSize: '32px', // 고정 글씨 크기
          marginTop: '16px', // 고정 상단 간격
        }}
      >
        국내 유일 스캔 서비스 툭스캔
      </h2>

      {/* 카드 */}
      <div
        className="flex flex-wrap justify-center"
        style={{
          marginTop: '24px', // 고정 카드 상단 간격
          gap: '24px', // 고정 카드 간격
        }}
      >
        {/* 첫 번째 카드 */}
        <GradientCard
          title="가벼운 나의 전공책, 시작하기"
          description="신청서를 작성하고 책을 보내면, 툭스캔이 여러분의 책을 스캔하고 보내드려요."
          iconSrc={Book}
        />

        {/* 두 번째 카드 */}
        <GradientCard
          title="합법적인 툭_스캔, 저작권 법을 준수해요"
          description="툭스캔은 저작권 법을 준수합니다., 법률 자문을 통해 건전한 스캔 환경을, 만들어가고 있어요."
          iconSrc={Hammer}
        />
      </div>
    </div>
  )
}
