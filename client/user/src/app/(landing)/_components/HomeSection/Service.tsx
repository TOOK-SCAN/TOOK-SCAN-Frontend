'use client'

import { Button } from '@tookscan/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import BookBg from '../../_assets/image/home/bookBg.svg'

const Service = () => {
  const router = useRouter()

  return (
    <section
      id="section2"
      className="relative flex w-full items-center justify-center"
    >
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-col">
          <div className="px-[1rem] py-[7rem] sm:p-[7rem]">
            <div className="mb-[0.25rem] text-[1.255rem] text-blue-primary">
              서비스 소개
            </div>
            <div className="mb-[1rem] title1">
              무거운 고민, <br /> 가볍게 해결해요!
            </div>
            <div className="mb-[5rem] text-gray-500 body1">
              당신을 위한 비대면 셀프스캔 서비스,
              <br />
              무거운 전공책·서적을 PDF로 스캔해보세요!
            </div>
            <div className="mb-[1rem] w-fit rounded-md bg-black px-[1rem] py-[0.5rem] text-[1.125rem] text-white">
              🏅 업계 최고에요 🏅
            </div>
            {/* 박스 3개 배치 */}
            <div className="flex w-full flex-col gap-4 whitespace-nowrap">
              <div className="flex items-center justify-start gap-1 rounded-lg bg-blue-secondary p-6">
                <p className="relative w-fit text-blue-primary btn1 after:absolute after:bottom-[-2px] after:left-0 after:h-[4px] after:w-full after:bg-yellow-300">
                  빠른 변환 속도
                </p>
                <p className="text-black btn1">단 몇 초 만에 PDF 변환</p>
              </div>

              <div className="flex items-center justify-start gap-1 rounded-lg bg-blue-secondary p-6">
                <p className="relative text-blue-primary btn1 after:absolute after:bottom-[-2px] after:left-0 after:h-[4px] after:w-full after:bg-yellow-300">
                  높은 보안성
                </p>
                <p className="text-black btn1">데이터 암호화 및 보호</p>
              </div>

              <div className="flex items-center justify-start gap-1 rounded-lg bg-blue-secondary p-6">
                <p className="relative w-fit text-blue-primary btn1 after:absolute after:bottom-[-2px] after:left-0 after:h-[4px] after:w-full after:bg-yellow-300">
                  다양한 포맷 지원
                </p>
                <p className="text-black btn1">PDF, Word, Excel, PPT 변환</p>
              </div>
            </div>

            <Button
              className="z-10 mt-[2rem] w-full"
              variant="primary"
              size="md"
              onClick={() => router.push('/apply')}
            >
              신청하러가기
            </Button>
          </div>
        </div>
        <Image src={BookBg} alt="툭스캔" className="w-full max-w-[30rem]" />
      </div>
    </section>
  )
}

export default Service
