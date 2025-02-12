'use client'

import type { LayoutProps } from '@/types/common'
import { Banner } from '@tookscan/components'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import type { MenuItem } from '@tookscan/components'
import { Tab } from '@tookscan/components'

const profileItems: MenuItem[] = [
  { label: '주문 내역 조회', link: '/profile/order' },
  { label: '개인정보 수정', link: '/profile/edit/info' },
  { label: '비밀번호 변경', link: '/profile/edit/password' },
]

const ProfileLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleButtonClick = (link: string) => {
    router.push(link)
  }
  const currentLabel = profileItems.find(
    (item) => item.link === pathname
  )?.label

  return (
    <div>
      <Banner type={3} />
      <main className="flex flex-col overflow-hidden bg-blue-secondary p-[2rem] lg:p-[5rem]">
        <div className="mx-auto mb-[2rem] flex w-full max-w-lg flex-col gap-6 lg:max-w-full lg:flex-row">
          {/*  1024px 미만에서는 Tab과 라벨을 상단 배치 */}
          <div className="w-full flex-col lg:hidden">
            {/*  라우팅 버튼 영역 */}
            <div className="flex w-full justify-start gap-1">
              {profileItems.map((item, index) => (
                <Tab
                  key={index}
                  item={item}
                  pathname={pathname}
                  handleButtonClick={handleButtonClick}
                />
              ))}
            </div>
            {/*  선택된 라벨*/}
            {currentLabel && (
              <h2 className="mt-[1rem] self-start title2">{currentLabel}</h2>
            )}
          </div>

          {/* 1024px 이상에서는 기존 사이드바 유지 */}
          <aside className="hidden flex-col items-start justify-start rounded-lg lg:flex">
            <h2 className="mb-[1.5rem] mr-[1.5rem] mt-[3.5rem] w-[15.625rem] text-[2rem] font-bold">
              마이페이지
            </h2>
            <ul className="w-[15.625rem] text-[1rem]">
              {profileItems.map((item, index) => (
                <Link href={item.link} key={index}>
                  <li
                    className={`flex cursor-pointer border-b border-blue-primary p-4 text-start ${
                      pathname === item.link
                        ? 'bg-blue-primary text-white'
                        : 'text-blue-primary'
                    } `}
                  >
                    {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          </aside>

          {/* 콘텐츠 영역 */}
          <div className="mt-8 flex w-full max-w-lg">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default ProfileLayout
