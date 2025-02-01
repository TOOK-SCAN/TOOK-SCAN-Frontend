'use client'
import { useState } from 'react'
import { Banner } from '@tookscan/components'
import { LayoutProps } from '@/types/common'
import Link from 'next/link'

const ProfileLayout = ({ children }: LayoutProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const profileItems = [
    {
      title: '개인정보 수정',
      link: '/profile/edit/info',
    },
    {
      title: '비밀번호 변경',
      link: '/profile/edit/password',
    },
    {
      title: '주문내역 조회',
      link: '/profile/order',
    },
  ]

  const handleClick = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div>
      <Banner type={3} />
      <main
        className="flex-1 overflow-hidden bg-blue-secondary"
        style={{ paddingTop: '80' }}
      >
        <div className="mx-auto mb-[80px] mt-[80px] flex max-w-7xl gap-6 px-6">
          <aside className="rounded-lg p-6">
            <h2 className="mb-[24px] mt-[50px] w-[250px] text-[32px] font-bold">
              마이페이지
            </h2>
            <ul className="w-[250px] text-[16px]">
              {profileItems.map((item, index) => (
                <Link href={`${item.link}`} key={index}>
                  <li
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`flex cursor-pointer border-b border-blue-primary p-4 text-start ${
                      activeIndex === index
                        ? 'bg-blue-primary text-white'
                        : 'text-blue-primary'
                    } `}
                  >
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </aside>
          {children}
        </div>
      </main>
    </div>
  )
}

export default ProfileLayout
