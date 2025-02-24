import Image from 'next/image'
import { useRef } from 'react'
// effect 배열의 데이터 경로는 실제 프로젝트에 맞게 수정해주세요.
import { effect } from '../../_utils/effect'

const HowItWorks = () => {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
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
          모바일 전용: 카드 4개(단일 배열) 세로로 보여줌
          - md:hidden: 데스크톱에서는 숨기고 모바일에서만 표시
          - 'h-[37rem] w-[37rem]' 크기를 동일하게 지정
        */}
        <div className="block py-10 md:hidden">
          <div className="flex flex-col gap-6">
            {effect.map((feature, index) => (
              <div
                key={index}
                className="relative flex h-[37rem] w-[37rem] flex-shrink-0 overflow-hidden rounded-2xl bg-[#F2F7FF] p-6 shadow-md"
              >
                <div className="flex flex-col">
                  <h3 className="whitespace-pre-line font-semibold text-black h1">
                    {feature.title}
                  </h3>
                  <p className="mb-4 whitespace-pre-line text-black body2">
                    {feature.desc}
                  </p>
                  <div className="relative h-[25rem] w-[25rem]">
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
          데스크톱 전용: 슬라이드 구현을 위해 배열을 2번 펼쳐(8개) 가로 스크롤
          - hidden md:block: 모바일에서는 숨기고 데스크톱부터 표시
        */}
        <div className="hidden overflow-hidden py-10 md:block">
          <div
            ref={sliderRef}
            className="hide-scrollbar flex w-full flex-col gap-6 md:flex-row md:overflow-x-scroll"
            style={{ scrollBehavior: 'smooth' }}
          >
            {[...effect, ...effect].map((feature, index) => (
              <div
                key={index}
                className="relative flex h-[37rem] w-[37rem] flex-shrink-0 overflow-hidden rounded-2xl bg-[#F2F7FF] p-6 shadow-md"
              >
                <div className="flex flex-col">
                  <h3 className="whitespace-pre-line font-semibold text-black h1">
                    {feature.title}
                  </h3>
                  <p className="mb-4 whitespace-pre-line text-black body2">
                    {feature.desc}
                  </p>
                  <div className="relative h-[25rem] w-[25rem]">
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
  )
}

export default HowItWorks
