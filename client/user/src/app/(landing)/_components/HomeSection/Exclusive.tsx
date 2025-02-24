'use client'
import Image from 'next/image'
import { useRef } from 'react'

import { features2 } from '../../_utils/onlyTookscan'

const Exclusive = () => {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
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
  )
}

export default Exclusive
