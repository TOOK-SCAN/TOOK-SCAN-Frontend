'use client'
import type { LayoutProps } from '@/types/common'
import { Button } from '@tookscan/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Took from './_assets/image/eyes.svg'
import Background from './_assets/image/mainbg.svg'

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  return (
    <div>
      <div className="relative z-0 h-screen w-full">
        {/* 배경 이미지 */}
        <Image
          src={Background}
          alt="배경"
          layout="fill" // 이미지가 부모 div를 가득 채움
          objectFit="cover" // 화면 크기에 맞게 조정
          objectPosition="center" // 중앙 정렬
          priority // 성능 최적화를 위해 우선 로드
        />
        <div className="flex h-full w-full items-center justify-center">
          <div className="juistify-center flex max-w-[30rem] flex-col items-center gap-[3.12rem]">
            {/* 로고 */}
            <Image
              src={Took}
              alt="툭스캔"
              width={240}
              height={150}
              className="transform"
            />
            <div className="z-10 flex w-full flex-col items-center justify-center">
              <div className="font-bold text-white title1">기벼운 대학생활</div>
              <div className="font-bold text-white title1">
                툭스캔으로 시작하자!
              </div>
            </div>
            <Button
              className="z-10 w-full flex-1"
              variant="primary"
              size="md"
              onClick={() => router.push('/apply')}
            >
              신청하러가기
            </Button>
          </div>
        </div>
      </div>

      {/* 🔹 페이지별 콘텐츠 */}
      <main>{children}</main>
    </div>
  )
}
export default Layout
