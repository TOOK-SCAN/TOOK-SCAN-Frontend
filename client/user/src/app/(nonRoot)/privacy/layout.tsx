'use client'

import type { MenuItem } from '@tookscan/components'
import { Banner, Tab } from '@tookscan/components'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import type { LayoutProps } from '../../../types/common'

const PrivacyLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const menuItems: MenuItem[] = [
    { label: '개인정보 수집목적 및 이용목적', link: '/privacy/purpose' },
    { label: '수집하는 개인정보 항목', link: '/privacy/items' },
    { label: '서비스 부정이용자 처리방안', link: '/privacy/misuse' },
    { label: '서비스 이용과정에서 수집되는 정보', link: '/privacy/usage' },
    { label: '개인정보의 수집 방법', link: '/privacy/methods' },
  ]

  const handleButtonClick = (link: string) => {
    router.push(link)
  }

  // 🖱️ 마우스 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 📱 터치 이벤트 핸들러 (모바일 대응)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="bg-blue-secondary">
      <Banner type={1} />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full px-4 py-[6.25rem] md:px-8">
          <div className="my-[3.5rem] w-full">
            <div className="text-start">
              <h1 className="text-blue-primary">이용약관 | 개인정보처리방침</h1>
              <h1 className="text-title2 mt-[0.8rem] font-semibold text-black">
                약관을 확인해주세요
              </h1>
            </div>
            <div
              ref={scrollRef}
              className="hide-scrollbar w-full cursor-grab overflow-x-auto active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="mx-auto my-[1.5rem] flex w-max gap-[0.5rem] whitespace-nowrap">
                {menuItems.map((item, index) => (
                  <Tab
                    key={index}
                    item={item}
                    pathname={pathname}
                    handleButtonClick={handleButtonClick}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[65rem] rounded-md bg-white p-6 shadow-md md:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyLayout
