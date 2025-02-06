'use client'

import { Banner } from '@tookscan/components'
import type { MenuItem } from '@tookscan/components'
import { Tab } from '@tookscan/components'
import { usePathname, useRouter } from 'next/navigation'
import type { LayoutProps } from '../../../types/common'

const PrivacyLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname() // 현재 경로를 가져옵니다.
  const router = useRouter() // 클라이언트 네비게이션을 위해 사용합니다.

  const menuItems: MenuItem[] = [
    { label: '개인정보 수집목적 및 이용목적', link: '/privacy/purpose' },
    { label: '수집하는 개인정보 항목', link: '/privacy/items' },
    { label: '서비스 부정이용자 처리방안', link: '/privacy/misuse' },
    { label: '서비스 이용과정에서 수집되는 정보', link: '/privacy/usage' },
    { label: '개인정보의 수집 방법', link: '/privacy/methods' },
  ]

  const handleButtonClick = (link: string) => {
    router.push(link) // 클라이언트 네비게이션을 사용해 새로고침 없이 이동
  }

  return (
    <div className="min-h-screen bg-blue-secondary">
      <Banner type={1}></Banner>
      <div className="flex flex-col items-center justify-center">
        <div className="py-[6.25rem]">
          <div className="my-[3.5rem]">
            <div className="">
              <h1 className="text-blue-primary">이용약관 | 개인정보처리방침</h1>
              <h1 className="text-title2 mt-[0.8rem] font-semibold text-black">
                약관을 확인해주세요
              </h1>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="my-[1.5rem] flex w-[65rem] gap-[0.5rem]">
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
          <div className="w-[65rem] rounded-md bg-white p-12 shadow-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyLayout
