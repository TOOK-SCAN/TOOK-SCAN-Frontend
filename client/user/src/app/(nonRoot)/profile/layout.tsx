'use client'

import type { LayoutProps } from '@/types/common'
import { Banner } from '@tookscan/components'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import type { MenuItem } from '../../_components/RoutingButton'
import RoutingButton from '../../_components/RoutingButton'

const profileItems: MenuItem[] = [
  { label: '개인정보 수정', link: '/profile/edit/info' },
  { label: '비밀번호 변경', link: '/profile/edit/password' },
  { label: '주문 내역 조회', link: '/profile/order' },
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
      <main
        className="flex-1 overflow-hidden bg-blue-secondary"
        style={{ paddingTop: '2rem' }}
      >
        <div className="relative mx-auto mb-[5rem] mt-[5rem] flex max-w-7xl gap-6 px-6 lg:flex-row">
          {/*  1024px 미만에서는 RoutingButton과 라벨을 상단 배치 */}
          <div className="flex w-full max-w-md flex-col items-center justify-start lg:hidden">
            {/*  라우팅 버튼 영역 */}
            <div className="flex w-full justify-start gap-1.5">
              {profileItems.map((item, index) => (
                <RoutingButton
                  key={index}
                  item={item}
                  pathname={pathname}
                  handleButtonClick={handleButtonClick}
                />
              ))}
            </div>
            {/* 📌 선택된 라벨을 버튼 바로 앞에 배치 */}
            {currentLabel && (
              <h2 className="text-title2 mt-0 self-start">{currentLabel}</h2>
            )}
          </div>

          {/* 📌 1024px 이상에서는 기존 사이드바 유지 */}
          <aside className="hidden flex-col items-start justify-start rounded-lg lg:flex">
            <h2 className="mb-[1.5rem] mr-[1.5rem] w-[15.625rem] text-[2rem] font-bold">
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

          {/* 📌 콘텐츠 영역 */}
          <div className="mt-[4rem] w-full">{children}</div>
        </div>
      </main>
    </div>
  )
}

export default ProfileLayout
