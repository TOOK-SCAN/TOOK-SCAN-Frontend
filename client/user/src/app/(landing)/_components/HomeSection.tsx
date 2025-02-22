'use client'
import { Button } from '@tookscan/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import BookBg from '../_assets/image/home/bookBg.svg'

import EngBg from '../_assets/image/home/engBg.svg'
import Feature1Img from '../_assets/image/home/Feature1Img.svg'
import Feature2Img from '../_assets/image/home/Feature2Img.svg'
import Feature3Img from '../_assets/image/home/Feature3Img.svg'
import Feature4Img from '../_assets/image/home/Feature4Img.svg'
import HeavyBag from '../_assets/image/home/HeavyBag.svg'
import LongTime from '../_assets/image/home/LongTime.svg'
import MemojiThinking from '../_assets/image/home/MemojiThinking.svg'

import MobileGroup from '../_assets/image/home/mobileGroup.svg'
import Picture from '../_assets/image/home/picture.svg'
import Selcect from '../_assets/image/home/selectBook.svg'

import TookBg from '../_assets/image/home/tookbg.svg'
import Section4 from './HomeSection/section4'

// const features = [
//   {
//     id: 0,
//     title: '합법적인 스캔',
//     desc: '법률 자료부터 특허 출원까지! \n 툭스캔에서 2년간 꼼꼼히 준비했어요',
//     image: Document,
//   },
//   {
//     id: 1,
//     title: '업계 최저가 도전',
//     desc: '1페이지에 단, 10원! 믿겨지시나요? \n 업계 최저가로 툭스캔을 만나보세요',
//     image: MinPrice,
//   },
//   {
//     id: 2,
//     title: '빠른신청 & 간편한 결제',
//     desc: '시간을 아끼고, 더 큰 가치를 만드세요! \n소중한 시간을 절약하세요',
//     image: Speed,
//   },
// ]
const features2 = [
  {
    title: '간단한 신청 \n & 완벽한 결과',
    desc: '여러분의 시간은 소중하니까! \n 신청은 간단하게, 결과물은 완벽하도록 책임질게요',
    img: Feature1Img,
    alt: '간단한 신청',
    tag: '간단한 신청',
  },
  {
    title: '편리하게 \n 카카오톡으로 알려드려요',
    desc: '톡스캔의 모든 과정을 \n 카카오톡 알림을 통해 확인할 수 있어요',
    img: Feature2Img,
    alt: '카카오톡 연동',
    tag: '카카오톡 연동',
  },
  {
    title: '저렴하게 \n 최고의 품질을 보장해요!',
    desc: '가장 저렴하지만, 가장 높은 퀄리티 \n 믿겨지시나요?',
    img: Feature3Img,
    alt: '저렴한 가격',
    tag: '합리적인 가격 | 최고의 품질',
  },
  {
    title: '신속하게 \n PDF를 전달해요!',
    desc: '월요일에 보내주시면 \n PDF는 수요일에 도착해요!',
    img: Feature4Img,
    alt: '신속한 서비스',
    tag: '신속한 서비스',
  },
]

const HomeSection = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0)
  const sliderRef = useRef(null)
  const router = useRouter()

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
      {/* 🔹 섹션 방식으로 추가 */}
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
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-[1.5rem] md:flex-row md:gap-[4rem]">
          <div className="text-center title1 md:text-start">
            <div className="text-white">국내 최고의</div>
            <div className="text-blue-primary">비대면 셀프스캔</div>
            <div className="text-white">툭스캔을 소개드려요!</div>
          </div>
          <div className="text-[#7B7B7B] body1">
            툭스캔, 무거운 책을 가벼운 PDF로, <br />
            툭스캔 산업의 새로운 기준.
          </div>
        </div>
      </section>
      <section
        id="section2"
        className="relative flex w-full items-center justify-center"
      >
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-full flex-col">
            <div className="p-[1rem] sm:p-[7rem]">
              <div className="mb-[0.25rem] text-[1.255rem] text-blue-primary">
                서비스 소개
              </div>
              <div className="mb-[1rem] title1">
                무거운 고민, <br /> 가볍게 해결해요!
              </div>
              <div className="mb-[5rem] text-gray-500 body1">
                당신을 위한 비대면 셀프스캔 서비스,<br></br>
                무거운 전공책·서적을 PDF로 스캔해보세요!
              </div>
              <div className="mb-[1rem] w-fit rounded-md bg-black px-[1rem] py-[0.5rem] text-[1.125rem] text-white">
                🏅 업계 최고에요 🏅
              </div>
              {/* 🔹 박스 3개 배치 */}
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
      <section
        id="section3"
        className="flex h-screen bg-[#262932] px-[1rem] py-[5rem] sm:px-[9rem]"
      >
        <div className="mt-[3rem] w-full flex-1 flex-col justify-start">
          <div className="text-white h1">500페이지 스캔, 직접 하면 60분?</div>
          <div className="text-blue-primary title1">
            툭스캔에 맡기는 시간은 단 2분!
          </div>
          <div className="mt-[5rem] flex w-full flex-col items-end justify-center gap-[1rem] md:flex-row">
            <div className="max-h-[20rem] w-full max-w-[30rem] rounded-[1.5rem] bg-[#838A94] pr-[1rem] opacity-60">
              <div className="p-[2rem]">
                <div className="text-[1.5rem] font-semibold text-white">
                  직접 촬영
                </div>
                <div className="text-white body2">
                  60분 소요 + 10,030원 시간 비용 + 낮은 품질
                </div>
              </div>

              <Image src={Picture} alt="툭스캔" width={400} height={300} />
            </div>
            <div className="max-h-[25rem] w-full max-w-[30rem] overflow-hidden rounded-[2rem] bg-blue-primary">
              <div className="p-[2rem]">
                <div className="text-white title2">최고의 선택, 툭스캔</div>
                <div className="text-white body2">
                  2분 신청 + 페이지당 10원! + 최고 품질
                </div>
              </div>
              <div className="relative mt-[60%] flex h-40 items-end justify-center">
                <Image
                  src={Selcect}
                  alt="툭스캔"
                  width={700}
                  height={700}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section4 />

      <section
        id="section5"
        className="bg-white px-[1rem] py-[5rem] text-black md:px-[9rem]"
      >
        <div className="w-full px-4">
          {/* 상단 소개 영역 */}
          <div className="mb-8">
            <span className="text-[1.25rem] font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 title1">
              이런점이 <br /> 너무 불편해요!
            </h2>
            <p className="mt-2 text-gray-600 body1">
              이런 경험, 한 번쯤 있지 않나요? <br className="hidden sm:block" />
              툭스캔이 해결해드릴게요.
            </p>
          </div>

          {/* 카드 3개 영역 */}
          <div className="flex w-full flex-col gap-3 md:flex-row">
            {/* 카드 1 */}
            <div className="max-h-[25rem] max-w-[23rem] flex-row overflow-hidden rounded-xl bg-[#F2F7FF] shadow-sm md:flex-1 md:flex-col">
              <div className="p-6">
                <h3 className="mb-2 btn1">너무 무거워요!</h3>
                <p className="mb-4 text-gray-700 body2">
                  매일 2~3권 수업... 모든 책들 들고 다니기엔 가방이 너무
                  무거워요!
                </p>
              </div>
              <div className="relative mt-[30%] flex h-40 items-end justify-center">
                <Image
                  src={HeavyBag}
                  alt="무거운 가방"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* 카드 2 */}
            <div className="max-h-[25rem] max-w-[23rem] flex-row overflow-hidden rounded-xl bg-[#F2F7FF] shadow-sm md:flex-1 md:flex-col">
              <div className="p-6">
                <h3 className="mb-2 btn1">너무 오래걸려요!</h3>
                <p className="mb-4 text-sm text-gray-700 body2">
                  아이패드로 직접 찍어봤지만... 500페이지 촬영은 너무 오래
                  걸려서 1시간이나 써버렸어요!
                </p>
              </div>
              <div className="relative mt-[70%] flex h-40 items-end justify-center">
                <Image
                  src={LongTime}
                  alt="오래 걸리는 작업"
                  width={380}
                  height={200}
                />
              </div>
            </div>

            {/* 카드 3 */}
            <div className="max-h-[25rem] max-w-[23rem] flex-row overflow-hidden rounded-xl bg-[#F2F7FF] shadow-sm md:flex-1 md:flex-col">
              <div className="p-6">
                <h3 className="mb-2 btn1">북스캔, 고민중이에요!</h3>
                <p className="mb-4 text-gray-700 body2">
                  비대면 업체는 스캔 품질이 아쉬워요... <br />
                  가격도, 품질도 만족스러운 곳... 정말 없을까요?
                </p>
              </div>
              <div className="relative mt-[30%] flex h-40 items-end justify-center">
                <Image
                  src={MemojiThinking}
                  alt="고민하는 사람"
                  width={250}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="section6"
        className="flex justify-center bg-white px-[1rem] md:px-[9rem] md:py-[5rem]"
      >
        <div className="w-full max-w-screen-xl">
          <div className="mb-8 w-full">
            <span className="text-[1.25rem] font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 title1">
              이런점이 <br /> 우리만 할 수 있어요
            </h2>
            <p className="mt-2 text-gray-600 body1">
              툭스캔에서 자신있게 소개드려요.
            </p>
          </div>

          {/* 슬라이드 카드 영역 */}
          <div className="flex w-full items-center justify-center overflow-hidden py-10">
            <div
              ref={sliderRef}
              className="hide-scrollbar flex w-full gap-6 overflow-x-scroll"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[...features2, ...features2].map((feature, index) => (
                <div
                  key={index}
                  className="relative flex h-[20rem] w-full max-w-[20rem] flex-shrink-0 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#5592FC_0%,#5894FC_50%,#81AEFD_100%)] p-6 shadow-md md:max-w-[30rem]"
                >
                  <div className="flex flex-row">
                    <div className="z-10 flex flex-col justify-end">
                      <div>
                        {/* 태그 디자인 */}
                        <div className="mb-3 flex flex-row flex-wrap gap-2">
                          {feature.tag.split('|').map((tagItem, i) => (
                            <span
                              key={i}
                              className="inline-block rounded-full bg-white px-3 py-1 text-[0.875rem] font-semibold text-blue-primary shadow"
                            >
                              {tagItem.trim()}
                            </span>
                          ))}
                        </div>

                        {/* 제목 & 설명 */}
                        <h3 className="whitespace-pre-line font-semibold text-white h1">
                          {feature.title}
                        </h3>
                        <p className="mb-4 whitespace-pre-line text-white body2">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                    {/* 이미지 */}
                    <div className="absolute right-[-1.8rem] top-1/2 z-0 h-[13rem] w-[13rem] -translate-y-1/2 md:h-[18rem] md:w-[18rem]">
                      <Image
                        src={feature.img || ''}
                        alt={feature.alt || 'default alt text'}
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
      <section
        id="section7"
        className="min-h-[40rem] w-full bg-white px-[1rem] pt-[9rem] md:px-[9rem]"
      >
        <div className="flex w-full flex-col items-start justify-start md:flex-row md:gap-12">
          {/* 왼쪽 텍스트 영역 */}
          <div className="flex flex-col">
            <div className="mb-8 flex w-full flex-col justify-start">
              <span className="text-[1.25rem] font-semibold text-blue-500">
                서비스 소개
              </span>
              <h2 className="mt-2 title1">
                언제 어디서나 <br /> 편리하게!
              </h2>
              <p className="mt-2 text-gray-600 body1">
                태블릿·PC·모바일에서 간편하게
                <br />
                비대면 셀프 스캔 신청하고,
                <br /> 제작된 파일을 다양한 환경에서 활용해요.
              </p>
            </div>
          </div>

          {/* 모바일 */}
          <div className="relative flex h-full w-full justify-end">
            {/* 데스크탑(오른쪽 위) */}
            <div className="top-15 right-0 z-0 h-[500px] w-[500px] md:absolute">
              <Image
                src={MobileGroup}
                alt="데스크탑 화면"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="section8"
        className="relative w-full bg-[#111827] py-16 text-white"
      >
        <Image
          src={EngBg}
          alt="데스크탑 화면"
          className="absolute top-0 z-0 h-full w-full"
        />

        <div className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4">
          <h2 className="mb-3 text-base font-semibold text-gray-300">
            한방에 툭스캔!
          </h2>
          <h1 className="mb-6 text-3xl font-bold text-blue-400 sm:text-4xl">
            툭스캔 신청해보세요
          </h1>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-white px-6 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
            onClick={() => router.push('/apply')}
          >
            신청하러가기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomeSection
