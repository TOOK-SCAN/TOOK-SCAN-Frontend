'use client'

import React, { useState } from 'react'

export const FourthPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    '이미지 자리 1',
    '이미지 자리 2',
    '이미지 자리 3',
    '이미지 자리 4',
  ]

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="relative flex flex-col items-start justify-center bg-white">
      {/* 서비스 개요 */}
      <div
        className="rounded-full bg-blue-secondary font-medium text-blue-primary"
        style={{
          fontSize: '14px', // 글씨 크기
          padding: '10px 16px', // 패딩
          marginTop: '24px', // 상단 간격
        }}
      >
        서비스 개요
      </div>

      {/* 메인 타이틀 */}
      <h2
        className="font-bold text-blue-primary"
        style={{
          fontSize: '32px', // 글씨 크기
          marginTop: '16px', // 상단 간격
        }}
      >
        툭스캔, 이런 점이 좋아요!
      </h2>

      {/* 뷰페이저 */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: '1200px', // 뷰포트 너비
          height: '400px', // 뷰포트 높이
          overflow: 'hidden',
          marginLeft: 'auto',
          marginRight: 'auto', // 좌우 중앙 정렬
          marginTop: '24px', // 메인 타이틀과 뷰포트 사이 거리
        }}
      >
        {/* 왼쪽 이전 이미지 */}
        <div
          className="absolute left-0 flex h-full items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md"
          style={{
            width: '280px', // 이전 이미지 너비
            marginRight: '20px', // 이미지 사이 간격 추가
          }}
        >
          <p
            className="text-gray-400"
            style={{
              fontSize: '20px',
            }}
          >
            {images[(currentIndex - 1 + images.length) % images.length]}
          </p>
        </div>

        {/* 중앙 현재 이미지 */}
        <div
          className="flex h-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-lg"
          style={{
            width: '600px', // 중앙 이미지 너비
            margin: '0 auto',
          }}
        >
          <p
            className="text-gray-500"
            style={{
              fontSize: '24px',
            }}
          >
            {images[currentIndex]}
          </p>
        </div>

        {/* 오른쪽 다음 이미지 */}
        <div
          className="absolute right-0 flex h-full items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md"
          style={{
            width: '280px', // 다음 이미지 너비
            marginLeft: '20px', // 이미지 사이 간격 추가
          }}
        >
          <p
            className="text-gray-400"
            style={{
              fontSize: '20px',
            }}
          >
            {images[(currentIndex + 1) % images.length]}
          </p>
        </div>

        {/* 왼쪽 버튼 */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        >
          ◀
        </button>

        {/* 오른쪽 버튼 */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        >
          ▶
        </button>
      </div>

      {/* 인디케이터 (독립 컨테이너) */}
      <div
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform items-center justify-center gap-2"
        style={{
          marginTop: '24px',
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 cursor-pointer rounded-full ${
              currentIndex === index ? 'bg-blue-primary' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
