'use client'
import Image from 'next/image'
import MobileMock from '../components/image/HTUMobileMock.svg'
import Step1Mock from '../components/image/Step1Mock.svg'
import Step2Mock from '../components/image/Step2Mock.svg'
import TookBg from '../components/image/tookbg.svg'

const HowToUse = () => {
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
        className="flex w-full items-center justify-center bg-[#1F2937] px-4 py-16"
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
              {/* 임시 배경(이미지 미사용 시) */}
              {/* 이 코드도 주석처리만 해둘게여 */}
              {/* <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-700 text-sm text-gray-300">
                Mobile Mock
              </div> */}
            </div>
          </div>

          {/* 오른쪽: 텍스트 영역 */}
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold leading-snug text-blue-400 sm:text-3xl">
              비대면으로 간편하게 접수하고
              <br className="hidden sm:block" />
              빠르게 PDF를 제작해요
            </h2>
            <p className="text-sm text-gray-300 sm:text-base">
              신청부터 완료까지 쉽고 빠르게!
              <br />
              스캔 진행 상황을 실시간으로 확인할 수 있어요!
            </p>
          </div>
        </div>
      </section>
      <section id="section3" className="bg-white py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          {/* 상단 소개 영역 */}
          <div className="mb-8">
            <span className="text-sm font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-black sm:text-4xl">
              불필요한 시간은 줄이고 <br className="hidden sm:block" />
              안전하게 이용할 수 있는 스캔서비스,
              <br className="hidden md:block" />
              이렇게 사용하세요!
            </h2>
            <p className="mt-2 text-gray-600">
              신청부터 완료까지 쉽고 빠르게!
              <br className="hidden sm:block" />
              스캔 진행 상황을 실시간으로 확인할 수 있어요.
            </p>
          </div>

          {/* 카드 영역 (3개 예시) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 카드 1 */}
            <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
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
            </div>

            {/* 카드 2 */}
            <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
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
            </div>

            {/* 카드 3 (예: 결과받기) */}
            <div className="rounded-xl bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                결과받기
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                스캔이 완료되면 PDF·이미지 파일을
                <br />
                안전하게 받아보세요!
              </p>
              <div className="relative h-44 w-full">
                {/* 피그마에서 사진을 확인할 수가 없어서 못넣었습니당.. */}
                {/* <Image
                src={Step3Mock}
                alt="결과받기 단계"
                fill
                className="object-contain"
              /> */}
                <div className="flex h-full w-full items-center justify-center rounded-md bg-white text-sm text-gray-400">
                  Step3 이미지
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowToUse
