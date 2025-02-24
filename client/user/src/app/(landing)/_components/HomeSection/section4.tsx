import { Icon } from '@tookscan/components'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Document from '../../_assets/image/home/documents.svg'
import MinPrice from '../../_assets/image/home/minPrice.svg'
import Speed from '../../_assets/image/home/speed.svg'

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

const Section4 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const slider = sliderRef.current as HTMLElement | null
    if (!slider) return
    let animationFrame: number
    let isPaused = false

    if (window.innerWidth < 768) {
      const scroll = () => {
        if (slider) {
          // 사용자가 스크롤을 일시정지할 수 있도록 함
          if (!isPaused) {
            slider.scrollLeft += 1
            if (slider.scrollLeft >= slider.scrollWidth / 2) {
              slider.scrollLeft = 0
            }
          }
          animationFrame = requestAnimationFrame(scroll)
        }
      }
      animationFrame = requestAnimationFrame(scroll)

      // 사용자 상호작용 시 자동 스크롤 일시정지
      slider.addEventListener('mouseenter', () => {
        isPaused = true
      })
      slider.addEventListener('mouseleave', () => {
        isPaused = false
      })
      slider.addEventListener('touchstart', () => {
        isPaused = true
      })
      slider.addEventListener('touchend', () => {
        isPaused = false
      })
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      if (slider) {
        slider.removeEventListener('mouseenter', () => {
          isPaused = true
        })
        slider.removeEventListener('mouseleave', () => {
          isPaused = false
        })
        slider.removeEventListener('touchstart', () => {
          isPaused = true
        })
        slider.removeEventListener('touchend', () => {
          isPaused = false
        })
      }
    }
  }, [])

  return (
    <section
      id="section4"
      className="flex w-full items-center justify-center bg-[#262932] px-[1rem] md:px-[9rem]"
    >
      <div className="flex w-full flex-col">
        {/* 히어로 영역 */}
        <div className="mb-16 pt-[9rem] text-start md:p-0">
          <div className="text-black-400 h1">톡스캔을 이용하면,</div>
          <div className="text-blue-primary title1">
            더 나은 품질과 시간 절약까지!
          </div>
          <div className="mt-2 text-black-400 body1">
            잠깐! 500페이지 스캔, <br className="md:hidden" /> 정말 한장씩 직접
            찍으시려구요...? <br />
            툭스캔을 사용하는게 훨씬 합리적이에요!
            <br /> 그 이유는 바로,
          </div>
        </div>

        {/* 버튼 및 설명 영역 (데스크탑) */}
        <div className="hidden w-full items-center justify-center md:flex">
          <div className="flex w-full min-w-[20rem] max-w-[70rem] flex-col rounded-t-xl bg-white p-[1rem] md:px-[2rem] md:pt-[3rem]">
            <div className="flex justify-between">
              {features.map((feature, index) => {
                const isActive = selectedIndex === index
                return (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex flex-col gap-2 text-start transition-colors md:p-6 ${
                      isActive ? 'text-blue-primary' : 'text-gray-500'
                    }`}
                  >
                    <div className="flex flex-row gap-2 text-xl btn1">
                      <Icon
                        id="barcode-read"
                        width={22}
                        height={22}
                        className={
                          isActive ? 'text-blue-primary' : 'text-gray-300'
                        }
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
                <div className="h-full w-full max-w-[60rem] rounded-t-lg bg-[#C2DCFF]">
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

        {/* 모바일 슬라이더 */}
        <div
          className="w-full overflow-hidden md:hidden"
          ref={sliderRef}
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex w-max">
            {features.map((feature) => (
              <div key={feature.id} className="w-[90vw] flex-shrink-0 p-4">
                <div className="h-[25rem] overflow-hidden rounded-lg bg-white p-4 shadow-md">
                  <h3 className="mt-4 flex flex-row items-center text-lg font-bold text-blue-primary">
                    <Icon
                      id="barcode-read"
                      width={22}
                      height={22}
                      className={'text-blue-primary'}
                    />
                    {feature.title}
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-gray-600">
                    {feature.desc}
                  </p>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section4
