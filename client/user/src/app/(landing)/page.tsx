'use client'
import { Button } from '@tookscan/components'
import Image from 'next/image'
import BookBg from './components/image/bookBg.svg'
import Box from './components/image/boxes.svg'
import DesktopMock from './components/image/DesktopMock.svg'
import Document from './components/image/documents.svg'
import Feature1Img from './components/image/Feature1Img.svg'
import Feature2Img from './components/image/Feature2Img.svg'
import Feature3Img from './components/image/Feature3Img.svg'
import Feature4Img from './components/image/Feature4Img.svg'
import HeavyBag from './components/image/HeavyBag.svg'
import LongTime from './components/image/LongTime.svg'
import MemojiThinking from './components/image/MemojiThinking.svg'
import MobileMock from './components/image/MobileMock.svg'
import Picture from './components/image/picture.svg'
import Selcect from './components/image/selectBook.svg'
import TabletMock from './components/image/TabletMock.svg'
import TookBg from './components/image/tookbg.svg'

const LandingPage = () => {
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
            <div className="rounded-[1.5rem] bg-[#838A94] p-[1rem] opacity-60">
              <div className="text-white">직접 촬영</div>
              <div className="text-white body2">
                60분 소요 + 10,030원 시간 비용 + 낮은 품질
              </div>
              <Image
                src={Picture}
                alt="툭스캔"
                width={300}
                height={400}
                className="left-0 top-0"
              />
            </div>
            <div className="rounded-[2rem] bg-blue-primary p-[2rem]">
              <div className="text-white title2">최고의 선택, 툭스캔</div>
              <div className="text-white body1">
                2분 신청 + 페이지당 10원! + 최고 품질
              </div>
              <Image
                src={Selcect}
                alt="툭스캔"
                width={500}
                height={500}
                className="left-0 top-0"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="section4" className="flex bg-[#262932] px-[9rem] py-[5rem]">
        <div className="flex flex-col">
          {/* 메인 컨테이너 */}
          <div className="mx-auto max-w-[1200px] px-4 py-10 lg:py-20">
            {/* 히어로 영역 */}
            <div className="mb-16 text-center">
              <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                톡스캔을 이용하면,
                <br className="hidden sm:block" />더 나은 품질과 시간 절약까지!
              </h1>
              <p className="mt-4 text-base text-gray-300 sm:text-lg lg:text-xl">
                잠깐 500페이지 스캔, 정말 합법적 직접 ‘직스캔’이구요...? <br />
                톡스캔을 사용하는게 훨씬 합리적이에요!
              </p>
            </div>

            {/* 특장점 3가지 */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-[#1F2937] p-6">
                <h2 className="mb-2 text-xl font-semibold">합법적인 스캔</h2>
                <p className="text-sm leading-relaxed text-gray-300">
                  법률 자료부터 특허 출원까지! <br />
                  톡스캔에서 2년간 꼼꼼히 준비했어요
                </p>
              </div>

              <div className="rounded-xl bg-[#1F2937] p-6">
                <h2 className="mb-2 text-xl font-semibold">업계 최저가 도전</h2>
                <p className="text-sm leading-relaxed text-gray-300">
                  1페이지에 1원, 10원에 맡기시나요?
                  <br />
                  업계 최저가로 톡스캔을 만나보세요
                </p>
              </div>

              <div className="rounded-xl bg-[#1F2937] p-6">
                <h2 className="mb-2 text-xl font-semibold">
                  빠른 신청 & 간편 결제
                </h2>
                <p className="text-sm leading-relaxed text-gray-300">
                  시간을 아끼고, 더 큰 가치를 만드세요! <br />
                  소중한 시간을 절약하세요
                </p>
              </div>
            </div>

            {/* 스크린샷 & 특허출원서 섹션 */}
            <div className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* 스크린샷 mockup */}
              <div className="flex-1">
                <div className="h-64 w-full rounded-lg bg-[#374151] lg:h-80">
                  <Image
                    src={Document}
                    alt="톡스캔 메인화면"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {/* 특허출원서 카드 */}
              <div className="flex rounded-lg bg-[#1F2937] p-6 lg:max-w-sm">
                {/* 예시로 스크린샷 이미지나 인증서 마크 등을 넣으려면
              <div className="mt-6 h-24 w-24 rounded bg-blue-500" />
            */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section5" className="bg-white py-16 text-black">
        <div className="mx-auto max-w-screen-xl px-4">
          {/* 상단 소개 영역 */}
          <div className="mb-8">
            <span className="text-sm font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              이런점이 너무 불편해요!
            </h2>
            <p className="mt-2 text-gray-600">
              이런 경험, 한 번쯤 있지 않나요? <br className="hidden sm:block" />
              톡스캔이 해결해드릴게요.
            </p>
          </div>

          {/* 카드 3개 영역 */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* 카드 1 */}
            <div className="rounded-xl bg-[#F9FAFB] p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">너무 무거워요!</h3>
              <p className="mb-4 text-sm text-gray-700">
                매일 2~3권 수업... 모든 책들 들고 다니기엔 가방이 너무 무거워요!
              </p>
              <div className="relative h-40 w-full">
                <Image
                  src={HeavyBag}
                  alt="무거운 가방"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 카드 2 */}
            <div className="rounded-xl bg-[#F9FAFB] p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">너무 오래걸려요!</h3>
              <p className="mb-4 text-sm text-gray-700">
                아이패드로 직접 찍어봤지만... 500페이지 촬영은 너무 오래 걸려서
                1시간이나 써버렸어요!
              </p>
              <div className="relative h-40 w-full">
                <Image
                  src={LongTime}
                  alt="오래 걸리는 작업"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 카드 3 */}
            <div className="rounded-xl bg-[#F9FAFB] p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">
                북스캔, 고민중이에요!
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                비대면 업체는 스캔 품질이 아쉬워요... <br />
                가격도, 품질도 만족스러운 곳... 정말 없을까요?
              </p>
              <div className="relative h-40 w-full">
                <Image
                  src={MemojiThinking}
                  alt="고민하는 사람"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section6" className="bg-white py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          {/* 상단 소개 영역 */}
          <div className="mb-12">
            <span className="text-sm font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-black sm:text-4xl">
              이런점이 우리만 할 수 있어요
            </h2>
            <p className="mt-2 text-gray-600">
              톡스캔에서 자신있게 소개드려요.
            </p>
          </div>

          {/* 카드 3개 영역 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 카드 1 */}
            <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                간단한 신청 &amp; 완벽한 결과
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                여러분의 시간은 소중하니까! <br />
                신청은 간단하게, 결과물은 완벽하도록 책임질게요
              </p>
              <div className="relative h-40 w-full">
                <Image
                  src={Feature1Img}
                  alt="간단한 신청"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 카드 2 */}
            <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                편리하게 카카오톡으로 알려드려요
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                톡스캔의 모든 과정을
                <br />
                카카오톡 알림을 통해 확인할 수 있어요
              </p>
              <div className="relative h-40 w-full">
                <Image
                  src={Feature2Img}
                  alt="카카오톡 연동"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 카드 3 */}
            <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                저렴한 가격, 최고의 품질
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                가장 저렴하게, <br />
                품질도 만족스럽게… 믿겨지시나요?
              </p>
              <div className="relative h-40 w-full">
                <Image
                  src={Feature3Img}
                  alt="저렴한 가격"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 피그마에서 보니까 카드가 하나 더 있더라구요. 이름도 똑같이 Feature4Img로 넣어놨습니당 */}
            {/* 카드 4 */}
            <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                신속하게 전달해요!
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                월요일에 책을 보내주면 <br />
                PDF는 수요일에 도착해요! <br />
                (영업일 1~3일 이내)
              </p>
              <div className="relative h-40 w-full">
                <Image
                  src={Feature4Img}
                  alt="신속한 서비스"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section7" className="bg-white py-16">
        <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center gap-8 px-4 md:flex-row md:gap-12">
          {/* 왼쪽 텍스트 영역 */}
          <div className="w-full md:w-1/2">
            <span className="text-sm font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-black sm:text-4xl">
              언제 어디서나 <br className="hidden sm:block" />
              편리하게!
            </h2>
            <p className="mt-2 text-gray-600">
              태블릿·PC·모바일에서 간편하게 비대면 셀프 스캔 신청하고, <br />
              제작된 파일을 다양한 환경에서 활용해요.
            </p>
          </div>

          {/* 오른쪽 mockup 이미지 영역 */}
          <div className="relative flex w-full items-center justify-center md:w-1/2">
            {/* PC 화면 (기본, 배경) */}
            <div className="relative h-[220px] w-[140px] sm:h-[300px] sm:w-[220px] md:h-[360px] md:w-[280px] lg:h-[420px] lg:w-[320px]">
              <Image
                src={DesktopMock}
                alt="데스크탑 화면"
                fill
                className="object-contain"
              />
              {/* 주석 처리된 <div> 부분들은 배경으로 필요 없어진 듯 한데 혹시 몰라서 남겨둘게용 */}
              {/* <div className="flex h-full w-full items-center justify-center rounded-md bg-blue-100 text-sm text-gray-500">
                PC Mock
              </div> */}
            </div>

            {/* 태블릿 화면 (겹치게) */}
            <div className="absolute left-[30%] top-[50%] z-10 h-[140px] w-[90px] sm:h-[190px] sm:w-[130px] md:h-[230px] md:w-[160px] lg:h-[280px] lg:w-[200px]">
              <Image
                src={TabletMock}
                alt="태블릿 화면"
                fill
                className="object-contain"
              />
              {/* <div className="flex h-full w-full items-center justify-center rounded-md bg-blue-200 text-sm text-gray-500">
                Tablet Mock
              </div> */}
            </div>

            {/* 모바일 화면 (겹치게) */}
            <div className="absolute bottom-[-10%] right-0 z-20 h-[130px] w-[65px] sm:h-[170px] sm:w-[85px] md:h-[200px] md:w-[100px] lg:h-[240px] lg:w-[120px]">
              <Image
                src={MobileMock}
                alt="모바일 화면"
                fill
                className="object-contain"
              />
              {/* <div className="flex h-full w-full items-center justify-center rounded-md bg-blue-300 text-sm text-gray-500">
                Mobile Mock
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section
        id="section8"
        className="relative w-full bg-[#111827] py-16 text-white"
      >
        {/* 배경 패턴이나 이미지가 필요하다면 여기서 absolute 배치 */}
        {/* 
      <div className="absolute inset-0 bg-[url('/path/to/bg-pattern.png')] bg-cover opacity-20" />
      */}

        <div className="relative mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4">
          <h2 className="mb-3 text-base font-semibold text-gray-300">
            한방에 톡스캔!
          </h2>
          <h1 className="mb-6 text-3xl font-bold text-blue-400 sm:text-4xl">
            톡스캔 신청해보세요
          </h1>
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-white px-6 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
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
