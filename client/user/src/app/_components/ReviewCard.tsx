'use client'

import { Icon } from '@tookscan/components'
import Image from 'next/image'

interface ReviewCardProps {
  review: string
  name: string
  rating: number
  imageSrc?: string // 사진 URL 받기
}

const ReviewCard = ({ review, name, rating, imageSrc }: ReviewCardProps) => {
  return (
    <div
      style={{
        width: '350px',
        height: '250px',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '16px',
      }}
    >
      {/* 사진 */}
      <div
        style={{
          width: '100%',
          height: '80px', // 사진 영역
          backgroundColor: '#F3F3F3',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '8px', // 사진 아래 간격 조정
          overflow: 'hidden', // 이미지 잘림 방지
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="User Photo"
            layout="fill" // 이미지가 컨테이너를 가득 채우도록 설정
            objectFit="cover" // 이미지 비율 유지
            style={{
              borderRadius: '8px',
            }}
          />
        ) : (
          <span style={{ color: '#A0A0A0', fontSize: '14px' }}>사진 자리</span>
        )}
      </div>

      {/* 리뷰 */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333333',
          marginBottom: '6px', // 이름과의 간격
        }}
      >
        {review}
      </p>

      {/* 이름 */}
      <p
        style={{
          fontSize: '14px',
          color: '#666666',
          marginBottom: '4px', // 별과의 간격
        }}
      >
        {name}
      </p>

      {/* 별 */}
      <div
        style={{
          display: 'flex',
          gap: '4px', // 별 간격
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            id="star"
            width={16}
            height={16}
            className={index < rating ? 'text-blue-primary' : 'text-gray-300'}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewCard
