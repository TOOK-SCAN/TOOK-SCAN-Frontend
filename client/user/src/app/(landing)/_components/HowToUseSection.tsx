'use client'
import TookBg from '@/app/(landing)/_assets/image/home/tookbg.svg'
import MobileMock from '@/app/(landing)/_assets/image/howToUse/MobileMock.svg'
import Step1Mock from '@/app/(landing)/_assets/image/howToUse/Step1Mock.svg'
import Step2Mock from '@/app/(landing)/_assets/image/howToUse/Step2Mock.svg'
import Step3Mock from '@/app/(landing)/_assets/image/howToUse/step3Mock.svg'
import Step4Mock from '@/app/(landing)/_assets/image/howToUse/step4Mock.svg'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const features = [
  {
    title: '1. 신청하기',
    desc: '신청서를 작성하고 툭스캔으로 책을 보내주세요',
    img: Step1Mock,
  },
  {
    title: '2. 결제하기',
    desc: '책이 도착하면 결제를 요청드려요! \n 이후 발송된 스캔하기 버튼을 눌러 셀프 스캔을 시작해주세요',
    img: Step2Mock,
  },
  {
    title: '3. PDF파일 수령',
    desc: '셀프스캔이 완료되었어요 \n 제작된 PDF 파일을 이메일로 확인하세요!',
    img: Step3Mock,
  },
  {
    title: '4. 책 복원해서 돌려받기',
    desc: '선택하신 방법을 따라 \n 책을 복원해서 돌려드려요',
    img: Step4Mock,
  },
]

const HowToUseSection = () => {
  const sliderRef = useRef(null)
  useEffect(() => {
    const slider = sliderRef.current as unknown as HTMLElement
    let animationFrame: number

    const scroll = () => {
      if (slider) {
        slider.scrollLeft += 1
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0 // 무한 루프
        }
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div>
      <section
        id="section1"
        className="relative flex min-h-[25rem] w-full items-center overflow-hidden bg-[#262932]"
      >
        <Image
          src={TookBg}
          alt="툭스캔"
          width={400}
          height={400}
          className="absolute left-0 top-0 z-0 rotate-[-15deg] object-cover"
        />
        <div className="relative z-10 flex w-full flex-row items-center justify-center gap-[4rem]">
          <div className="text-center text-white title1">
            가벼운 나의 전공책, <br /> 툭스캔과 함께라면 당신의 일상이
            새로워질거예요
          </div>
        </div>
      </section>
      <section
        id="section2"
        className="flex w-full items-center justify-center bg-[#262932] px-[1rem] md:px-[9rem] md:py-[6.25rem]"
      >
        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 md:flex-row md:items-center">
          {/* 왼쪽: 모바일 화면 mockup */}
          <div className="flex justify-center md:w-1/2">
            <div className="relative h-[480px] w-[240px] sm:h-[550px] sm:w-[275px]">
              {/* 사진이름은 MobileMock와 구분하기 위해 HTUMobileMock으로 이름 지어놨습니다(How To Use) */}
              <Image
                src={MobileMock}
                alt="모바일 화면"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 오른쪽: 텍스트 영역 */}
          <div className="w-full">
            <h2 className="mb-4 font-bold leading-snug text-blue-400 title1">
              비대면으로 <br />
              간편하게 접수하고
              <br />
              빠르게 PDF를 제작해요
            </h2>
            <p className="text-gray-300 body1">
              신청부터 완료까지 쉽고 빠르게!
              <br />
              스캔 진행 상황을 실시간으로 확인할 수 있어요!
            </p>
          </div>
        </div>
      </section>
      <section
        id="section3"
        className="bg-white px-[1rem] py-[6.25rem] text-black md:px-[9rem]"
      >
        <div className="mx-auto max-w-screen-xl px-4">
          {/* 상단 소개 영역 */}
          <div className="mb-8">
            <span className="text-[1.25rem] font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 title1">
              불필요한 시간은 줄이고 <br />
              안전하게 이용할 수 있는 스캔서비스, 이렇게 사용하세요!
            </h2>
          </div>

          {/*
      모바일 전용: 카드 4개만(단일 배열) 세로로 보여줌
      - md:hidden: 데스크톱에서는 숨기고 모바일(기본)에서만 표시
    */}
          <div className="block py-10 md:hidden">
            <div className="flex flex-col gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative flex h-auto w-full flex-shrink-0 overflow-hidden rounded-2xl bg-[#F2F7FF] p-6 shadow-md"
                >
                  {/* 카드 내용 (제목, 설명, 이미지) 그대로 */}
                  <div className="flex flex-col">
                    <h3 className="whitespace-pre-line font-semibold text-black h1">
                      {feature.title}
                    </h3>
                    <p className="mb-4 whitespace-pre-line text-black body2">
                      {feature.desc}
                    </p>
                    <div className="relative h-[25rem] w-full md:w-[25rem]">
                      <Image
                        src={feature.img || ''}
                        alt={feature.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*
      데스크톱 전용: 슬라이드 구현을 위해 배열을 2번 펼쳐서(8개) 가로 스크롤
      - hidden md:block: 모바일에서는 숨기고 데스크톱부터 표시
    */}
          <div className="hidden overflow-hidden py-10 md:block">
            <div
              ref={sliderRef}
              className="hide-scrollbar flex w-full flex-col gap-6 md:flex-row md:overflow-x-scroll"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[...features, ...features].map((feature, index) => (
                <div
                  key={index}
                  className="relative flex h-auto w-full flex-shrink-0 overflow-hidden rounded-2xl bg-[#F2F7FF] p-6 shadow-md md:h-[37rem] md:w-[37rem]"
                >
                  {/* 카드 내용 (제목, 설명, 이미지) 그대로 */}
                  <div className="flex flex-col">
                    <h3 className="whitespace-pre-line font-semibold text-black h1">
                      {feature.title}
                    </h3>
                    <p className="mb-4 whitespace-pre-line text-black body2">
                      {feature.desc}
                    </p>
                    <div className="relative h-[25rem] w-full md:w-[25rem]">
                      <Image
                        src={feature.img || ''}
                        alt={feature.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowToUseSection
