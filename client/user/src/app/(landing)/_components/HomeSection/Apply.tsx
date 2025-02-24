'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import EngBg from '../../_assets/image/home/engBg.svg'

const Apply = () => {
  const router = useRouter()

  return (
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
  )
}

export default Apply
