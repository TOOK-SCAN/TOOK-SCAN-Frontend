'use client'
import MobileMock from '@/app/(landing)/_assets/image/MobileMock.svg'
import Step1Mock from '@/app/(landing)/_assets/image/Step1Mock.svg'
import Step2Mock from '@/app/(landing)/_assets/image/Step2Mock.svg'
import Step3Mock from '@/app/(landing)/_assets/image/step3Mock.svg'
import Step4Mock from '@/app/(landing)/_assets/image/step4Mock.svg'
import TookBg from '@/app/(landing)/_assets/image/TookBg.svg'
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

const HowToUse = () => {
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
        className="flex w-full items-center justify-center bg-[#262932] px-4 py-16"
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
        className="bg-white p-[3rem] text-black lg:px-[9rem] lg:py-[5rem]"
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
          {/* 슬라이드 카드 영역 */}
          <div className="overflow-hidden py-10">
            <div
              ref={sliderRef}
              className="hide-scrollbar flex w-full gap-6 overflow-x-scroll"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[...features, ...features].map((feature, index) => (
                <div
                  key={index}
                  className="relative flex h-[37rem] w-[37rem] flex-shrink-0 overflow-hidden rounded-2xl bg-[#F2F7FF] p-6 shadow-md"
                >
                  <div className="flex flex-col">
                    <div className="z-10 flex flex-col justify-start">
                      <div>
                        {/* 제목 & 설명 */}
                        <h3 className="whitespace-pre-line font-semibold text-black h1">
                          {feature.title}
                        </h3>
                        <p className="mb-4 whitespace-pre-line text-black body2">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                    {/* 이미지 */}
                    <div className="absolute bottom-0 h-[25rem] w-[25rem]">
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

              {/* 카드 영역 (3개 예시) */}
              {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> */}
              {/* 카드 1 */}
              {/* <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                신청하기
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                신청서를 작성하고
                <br />
                톡스캔으로 책을 보내주세요
              </p>
              <div className="relative h-44 w-full">
                <Image
                  src={Step1Mock}
                  alt="신청하기 단계"
                  fill
                  className="object-contain"
                />
                <div className="flex h-full w-full items-center justify-center rounded-md bg-white text-sm text-gray-400">
                  Step1 이미지
                </div>
              </div>
            </div> */}

              {/* 카드 2 */}
              {/* <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                결제하고 스캐하기
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                책이 도착하면 견적 세팅 후 결제를 요청드려요!
                <br />
                결제 완료 후, 스캔하기 버튼을 눌러 셀프 스캔을 시작해주세요
              </p>
              <div className="relative h-44 w-full">
                <Image
                  src={Step2Mock}
                  alt="결제하고 스캐하기 단계"
                  fill
                  className="object-contain"
                />
                <div className="flex h-full w-full items-center justify-center rounded-md bg-white text-sm text-gray-400">
                  Step2 이미지
                </div>
              </div>
            </div> */}

              {/* 카드 3 (예: 결과받기) */}
              {/* <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                결과받기
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                스캔이 완료되면 PDF·이미지 파일을
                <br />
                안전하게 받아보세요!
              </p>
              <div className="relative h-44 w-full">
                
                <div className="flex h-full w-full items-center justify-center rounded-md bg-white text-sm text-gray-400">
                  Step3 이미지
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowToUse
