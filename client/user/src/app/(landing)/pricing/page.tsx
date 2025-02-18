'use client'
import Image from 'next/image'
import ScannerImg from '../components/image/ScannerImg.svg'
import TookBg from '../components/image/tookbg.svg'

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
      <section id="section2" className="bg-[#111827] py-16 text-white">
        <div className="mx-auto w-full max-w-3xl px-4 text-center">
          {/* 타이틀 */}
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
            톡스캔은 업계 최저 가격으로
            <br className="hidden sm:block" />
            합리적인 스캔을 제공해요
          </h2>

          {/* 가격 카드 컨테이너 */}
          <div className="mx-auto max-w-xl rounded-xl bg-white p-6 text-gray-800 shadow-md">
            {/* 상단 헤더 영역 */}
            <div className="mb-4 flex flex-col items-center justify-center">
              {/* 배지(badge) 예시 */}
              <div className="mb-2 inline-block rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                업계 최저 가격
              </div>
              <h3 className="text-lg font-semibold text-gray-900">스캔가격</h3>
            </div>

            {/* 페이지당 / OCR */}
            <div className="mb-6 flex w-full items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-sm text-gray-500">페이지당</div>
                <div className="mt-1 text-xl font-bold text-blue-600">10원</div>
                <div className="text-xs text-gray-400">
                  (기본 페이지 1,000장)
                </div>
              </div>
              <div className="border-l border-gray-200" />
              <div className="text-center">
                <div className="text-sm text-gray-500">OCR</div>
                <div className="mt-1 text-xl font-bold text-blue-600">무료</div>
              </div>
            </div>

            {/* 세부 항목 테이블 */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">재단 (갈링)</span>
                <span className="font-medium text-gray-800">1,000원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">복원 (갈링)</span>
                <span className="font-medium text-gray-800">1,000원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">스프링 제본</span>
                <span className="font-medium text-gray-800">3,000원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">떡 제본</span>
                <span className="font-medium text-gray-800">4,000원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">반환 배송비</span>
                <span className="font-medium text-gray-800">2,500원</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section3" className="bg-white py-16">
        <div className="mx-auto flex max-w-screen-xl flex-col items-start gap-8 px-4 md:flex-row">
          {/* 왼쪽 텍스트 + 이미지 */}
          <div className="flex flex-1 flex-col justify-center">
            <span className="text-sm font-semibold text-blue-500">
              최고의 스캐너
            </span>
            <h2 className="mt-2 text-3xl font-bold text-black sm:text-4xl">
              최상의 품질을 자랑하는 톡스캔,
              <br className="hidden sm:block" />
              스캐너 스펙을 확인해보세요!
            </h2>
            <p className="mt-2 text-gray-600">
              자동 이미지 보정, 초고해상도 컬러 스캔 등
              <br className="hidden sm:block" />
              다양한 기능으로 더 나은 스캔 품질을 제공합니다.
            </p>

            {/* 스캐너 일러스트 (선택사항) */}
            <div className="relative mt-6 h-48 w-48 sm:h-52 sm:w-52">
              <Image
                src={ScannerImg}
                alt="스캐너 일러스트"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 오른쪽: 6개의 div 박스 */}
          <div className="flex flex-1 flex-col justify-center gap-4">
            {/* 박스 1 */}
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-600">DPI</span>
              <span className="text-sm font-semibold text-blue-600">
                최대 600 DPI
              </span>
            </div>

            {/* 박스 2 */}
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-600">품질</span>
              <span className="text-sm font-semibold text-blue-600">
                고해상도 컬러 스캔
              </span>
            </div>

            {/* 박스 3 */}
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-600">색감</span>
              <span className="text-sm font-semibold text-blue-600">
                24비트 컬러
              </span>
            </div>

            {/* 박스 4 */}
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-600">선명도</span>
              <span className="text-sm font-semibold text-blue-600">
                자동 이미지 보정 / 선명한 텍스트
              </span>
            </div>

            {/* 박스 5 */}
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-600">선명도</span>
              <span className="text-sm font-semibold text-blue-600">
                자동 보정 및 선명한 텍스트 출력
              </span>
            </div>

            {/* 박스 6 */}
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-600">
                기울기보정
              </span>
              <span className="text-sm font-semibold text-blue-600">
                자동 기울기 보정 및 잘못된 정렬 수정
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
