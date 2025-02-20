'use client'
import Image from 'next/image'
import PriceDocument from '../_assets/image/priceDocument.svg'
import ScannerImg from '../_assets/image/ScannerImg.svg'
import TookBg from '../_assets/image/tookbg.svg'

const Pricing = () => {
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
            툭스캔의 가격은 얼마인가요?
          </div>
        </div>
      </section>
      <section id="section2" className="bg-[#111827] py-16 text-white">
        <div className="mx-auto w-full max-w-3xl px-4 text-center">
          {/* 타이틀 */}
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            톡스캔은 업계 최저 가격으로
            <br className="hidden sm:block" />
            합리적인 스캔을 제공해요
          </h2>
          <Image src={PriceDocument} alt="툭스캔" width={800} height={700} />
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
              최상의 품질을 자랑하는 툭스캔, <br />
              스캐너 스펙을 확인해보세요!
            </h2>
            <div className="flex flex-row items-end justify-between">
              <div className="relative">
                <Image
                  src={ScannerImg}
                  alt="스캐너 일러스트"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>

              {/* 오른쪽: 6개의 div 박스 */}
              <div className="flex w-full max-w-[35rem] flex-col justify-center gap-2 p-[2rem]">
                {/* 박스 1 */}
                <div className="flex items-center justify-between rounded-lg bg-blue-secondary px-4 py-3">
                  <span className="text-[1.5rem] font-medium text-gray-600">
                    DPI
                  </span>
                  <span className="text-[1rem] font-semibold text-blue-primary">
                    최대 600 DPI
                  </span>
                </div>

                {/* 박스 2 */}
                <div className="flex items-center justify-between rounded-lg bg-blue-secondary px-4 py-3">
                  <span className="text-[1.5rem] font-medium text-gray-600">
                    품질
                  </span>
                  <span className="text-[1rem] font-semibold text-blue-primary">
                    고해상도 컬러 스캔
                  </span>
                </div>

                {/* 박스 3 */}

                <div className="flex items-center justify-between rounded-lg bg-blue-secondary px-4 py-3">
                  <span className="text-[1.5rem] font-medium text-gray-600">
                    색감
                  </span>
                  <span className="text-[1rem] font-semibold text-blue-primary">
                    24비트 컬러
                  </span>
                </div>

                {/* 박스 4 */}
                <div className="flex items-center justify-between rounded-lg bg-blue-secondary px-4 py-3">
                  <span className="text-[1.5rem] font-medium text-gray-600">
                    선명도
                  </span>
                  <span className="text-[1rem] font-semibold text-blue-primary">
                    자동 이미지 보정 / 선명한 텍스트 출력
                  </span>
                </div>

                {/* 박스 5 */}
                <div className="flex items-center justify-between rounded-lg bg-blue-secondary px-4 py-3">
                  <span className="text-[1.5rem] font-medium text-gray-600">
                    선명도
                  </span>
                  <span className="text-[1rem] font-semibold text-blue-primary">
                    자동 이미지 보정 및 선명한 텍스트 출력 지원
                  </span>
                </div>

                {/* 박스 6 */}
                <div className="flex items-center justify-between rounded-lg bg-blue-secondary px-4 py-3">
                  <span className="text-[1.5rem] font-medium text-gray-600">
                    기울기보정
                  </span>
                  <span className="text-[1rem] font-semibold text-blue-primary">
                    자동 기울기 보정 및 잘못된 정렬 수정
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
