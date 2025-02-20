'use client'
import { Button, Icon } from '@tookscan/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import BookBg from './_assets/image/bookBg.svg'
import Box from './_assets/image/boxes.svg'
import Document from './_assets/image/documents.svg'
import EngBg from './_assets/image/engBg.svg'
import Feature1Img from './_assets/image/Feature1Img.svg'
import Feature2Img from './_assets/image/Feature2Img.svg'
import Feature3Img from './_assets/image/Feature3Img.svg'
import Feature4Img from './_assets/image/Feature4Img.svg'
import HeavyBag from './_assets/image/HeavyBag.svg'
import LongTime from './_assets/image/LongTime.svg'
import MemojiThinking from './_assets/image/MemojiThinking.svg'
import MinPrice from './_assets/image/minPrice.svg'
import MobileGroup from './_assets/image/mobileGroup.svg'
import Picture from './_assets/image/picture.svg'
import Selcect from './_assets/image/selectBook.svg'
import Speed from './_assets/image/speed.svg'
import TookBg from './_assets/image/tookbg.svg'

const features = [
  {
    id: 0,
    title: '합법적인 스캔',
    desc: '법률 자료부터 특허 출원까지! \n 툭스캔에서 2년간 꼼꼼히 준비했어요',
    image: Document,
  },
  {
    id: 1,
    title: '업계 최저가 도전',
    desc: '1페이지에 단, 10원! 믿겨지시나요? \n 업계 최저가로 툭스캔을 만나보세요',
    image: MinPrice,
  },
  {
    id: 2,
    title: '빠른신청 & 간편한 결제',
    desc: '시간을 아끼고, 더 큰 가치를 만드세요! \n소중한 시간을 절약하세요',
    image: Speed,
  },
]
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

const LandingPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
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
        <div className="relative z-10 flex w-full flex-row items-center justify-center gap-[4rem]">
          <div className="title1">
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
        <div className="flex w-full flex-row">
          <div className="flex w-[40%] flex-col">
            <div className="p-[7rem]">
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
              <Image
                src={Box}
                height={240}
                alt="박스"
                className="mb-[5rem] w-full"
              />
              <Button
                className="z-10 w-[5rem] flex-1"
                variant="primary"
                size="md"
                onClick={() => router.push('/apply')}
              >
                신청하러가기
              </Button>
            </div>
          </div>
          <Image src={BookBg} alt="툭스캔" className="w-[60%]" />
        </div>
      </section>
      <section
        id="section3"
        className="flex h-screen bg-[#262932] px-[9rem] py-[5rem]"
      >
        <div className="mt-[3rem] flex-1 flex-col justify-start">
          <div className="text-white h1">500페이지 스캔, 직접 하면 60분?</div>
          <div className="text-blue-primary title1">
            툭스캔에 맡기는 시간은 단 2분!
          </div>
          <div className="mt-[5rem] flex w-full flex-row items-end justify-center gap-[1rem]">
            <div className="max-h-[20rem] max-w-[32rem] rounded-[1.5rem] bg-[#838A94] pr-[1rem] opacity-60">
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
            <div className="h-[30rem] w-[32rem] overflow-hidden rounded-[2rem] bg-blue-primary">
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
      <section
        id="section4"
        className="flex items-center justify-center bg-[#262932] px-[9rem] pt-[5rem]"
      >
        <div className="flex flex-col pt-[12rem]">
          {/* 히어로 영역 */}
          <div className="mb-16 text-start">
            <div className="text-black-400 h1">톡스캔을 이용하면,</div>
            <div className="text-blue-primary title1">
              더 나은 품질과 시간 절약까지!
            </div>
            <div className="mt-2 text-black-400 body1">
              잠깐! 500페이지 스캔, 정말 한장씩 직접 찍으시려구요...? <br />{' '}
              툭스캔을 사용하는게 훨씬 합리적이에요!
              <br /> 그 이유는 바로,
            </div>
          </div>

          {/* 버튼 및 설명 영역 */}
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full min-w-[70rem] flex-col rounded-t-xl bg-white px-[2rem] pt-[3rem]">
              <div className="flex justify-between">
                {features.map((feature, index) => {
                  const isActive = selectedIndex === index
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setSelectedIndex(index)}
                      className={`flex flex-col gap-2 p-6 text-start transition-colors ${
                        isActive ? 'text-blue-primary' : 'text-gray-500'
                      }`}
                    >
                      <div className="flex flex-row gap-2 text-xl btn1">
                        <Icon
                          id="barcode-read"
                          width={22}
                          height={22}
                          className={`${
                            isActive ? 'text-blue-primary' : 'text-gray-300'
                          }`}
                        />
                        {feature.title}
                      </div>
                      <p className="whitespace-pre-line leading-relaxed body2">
                        {feature.desc}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* 스크린샷 mockup */}
              <div className="mt-16 flex flex-col">
                <div className="flex-1">
                  <div className="h-full w-full rounded-t-lg bg-[#C2DCFF]">
                    <Image
                      src={features[selectedIndex].image || ''}
                      alt="톡스캔 메인화면"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="section5"
        className="bg-white p-[3rem] text-black lg:px-[9rem] lg:py-[5rem]"
      >
        <div className="mx-auto max-w-screen-xl px-4">
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
          <div className="flex gap-3">
            {/* 카드 1 */}
            <div className="h-[25rem] w-[23rem] flex-1 flex-col overflow-hidden rounded-xl bg-[#F2F7FF] shadow-sm">
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
            <div className="h-[25rem] w-[23rem] flex-1 flex-col overflow-hidden rounded-xl bg-[#F2F7FF] shadow-sm">
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
            <div className="h-[25rem] w-[23rem] flex-1 flex-col overflow-hidden rounded-xl bg-[#F2F7FF] shadow-sm">
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
        className="bg-white p-[3rem] lg:px-[9rem] lg:py-[5rem]"
      >
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mb-8">
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
          <div className="overflow-hidden py-10">
            <div
              ref={sliderRef}
              className="hide-scrollbar flex w-full gap-6 overflow-x-scroll"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[...features2, ...features2].map((feature, index) => (
                <div
                  key={index}
                  className="relative flex h-[20rem] w-[30rem] flex-shrink-0 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#5592FC_0%,#5894FC_50%,#81AEFD_100%)] p-6 shadow-md"
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
                    <div className="absolute right-[-1.5rem] top-1/2 z-0 h-[18rem] w-[18rem] -translate-y-1/2">
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
        className="bg-white px-[3rem] pt-[3rem] lg:px-[9rem] lg:pt-[5rem]"
      >
        <div className="flex w-full justify-between gap-8 md:flex-row md:gap-12">
          {/* 왼쪽 텍스트 영역 */}
          <div className="mb-8">
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

          {/* 오른쪽 mockup 이미지 영역 */}
          <div className="relative h-[400px] w-full md:h-[500px] md:w-1/2">
            {/* 데스크탑(오른쪽 위) */}
            <div className="absolute bottom-0 right-0 z-0 h-[500px] w-[500px] md:w-[700px] lg:h-[600px]">
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

export default LandingPage
