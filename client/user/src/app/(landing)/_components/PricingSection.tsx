'use client'
import Image from 'next/image'
import TookBg from '../_assets/image/home/tookbg.svg'
import PriceDocument from '../_assets/image/pricing/priceDocument.svg'
import ScannerImg from '../_assets/image/pricing/ScannerImg.svg'
import { TableData } from '../_utils/table'
import { FeatureBox } from './FeatureBox'

const PricingSection = () => {
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
        className="w-full bg-white px-[1rem] py-[5rem] text-black md:px-[9rem]"
      >
        <div className="w-full items-center justify-center">
          {/* 상단 소개 영역 */}
          <div className="mb-8">
            <span className="text-[1.25rem] font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 title1">
              최상의 품질을 자랑하는 툭스캔, <br />
              스캐너 스펙을 확인해보세요!
            </h2>
            <div className="mt-[5rem] flex w-full flex-col items-center justify-center gap-[5rem] md:flex-row">
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
              <div className="flex w-full flex-col items-center justify-center gap-2">
                {TableData.map((feature, index) => (
                  <FeatureBox
                    key={index}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingSection
