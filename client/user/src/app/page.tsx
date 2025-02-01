'use client'

import React from 'react'
import { FirstPage, SecondPage, ThirdPage, FourthPage } from '@/app/_components'

const FullScrollPage = () => {
  // const sectionsRef = useRef<HTMLDivElement>(null)
  // const [currentSection, setCurrentSection] = useState(0)
  // const [isScrolling, setIsScrolling] = useState(false)

  // const handleScroll = (event: WheelEvent) => {
  //   event.preventDefault()

  //   if (isScrolling) return

  //   const delta = event.deltaY
  //   const sections = sectionsRef.current?.children

  //   if (!sections) return

  //   if (delta > 0 && currentSection < sections.length - 1) {
  //     setCurrentSection((prev) => prev + 1)
  //   } else if (delta < 0 && currentSection > 0) {
  //     setCurrentSection((prev) => prev - 1)
  //   }

  //   setIsScrolling(true)
  //   setTimeout(() => {
  //     setIsScrolling(false)
  //   }, 700)
  // }

  // useEffect(() => {
  //   const container = sectionsRef.current
  //   if (!container) return

  //   window.addEventListener('wheel', handleScroll, { passive: false })

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll)
  //   }
  // }, [currentSection, isScrolling])

  // useEffect(() => {
  //   const sections = sectionsRef.current?.children
  //   if (!sections) return

  //   if (currentSection >= 0 && currentSection < sections.length) {
  //     const target = sections[currentSection] as HTMLElement
  //     target.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }, [currentSection])

  return (
    <div>
      {/* <Head>
        <title>툭스캔, 가장 합리적인 비대면 스캔</title>
        <meta
          name="description"
          content="비대면으로 간편하고, 안전하게! 북스캔의 새로운 기준을 소개드려요. 한 방에 툭스캔!"
        />
        <meta
          name="keywords"
          content="북스캔, pdf 스캔, pdf 제작, 셀프 스캔, 비대면 스캔, 비대면 셀프스캔"
        />
        <meta name="author" content="툭스캔" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="툭스캔, 가장 합리적인 비대면 스캔" />
        <meta
          property="og:description"
          content="비대면으로 간편하고, 안전하게! 북스캔의 새로운 기준을 소개드려요. 한 방에 툭스캔!"
        />
        <meta property="og:url" content="https://tookscan.com" />
        <meta property="og:image" content="/images/Logo.png" />
        <meta property="og:locale" content="ko_KR" />

        <link rel="canonical" href="https://tookscan.com" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/Logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/Logo.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Logo.png" />
      </Head> */}

      {/* 전체 페이지 구조 */}
      {/* <div ref={sectionsRef} className="relative h-screen overflow-hidden"> */}
      <div className="z-0 flex flex-col">
        {/* <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-lg">
          <nav className="container mx-auto flex items-center justify-between p-4">
            <div className="text-lg font-bold">툭스캔</div>
            <div>
              <a href="#about" className="px-4 text-blue-primary">
                소개
              </a>
              <a href="#features" className="px-4 text-blue-primary">
                특징
              </a>
              <a href="#contact" className="px-4 text-blue-primary">
                문의
              </a>
            </div>
          </nav>
        </header> */}

        {/* 시맨틱 태그 및 페이지 내용 */}
        <div className="">
          <div
            className="flex h-screen items-center justify-center bg-blue-primary"
            id="intro"
          >
            <FirstPage />
          </div>
          <div className="flex items-center justify-center py-24" id="about">
            <SecondPage />
          </div>
          <div className="flex items-center justify-center py-24" id="features">
            <ThirdPage />
          </div>
          <div className="flex items-center justify-center py-24" id="pricing">
            <FourthPage />
          </div>

          {/* 지금 리뷰가 없기 때문에 리뷰는 생략 */}

          {/* <div
            className="flex h-screen items-center justify-center"
            id="contact"
          >
            <FifthPage />
          </div> */}
        </div>

        <footer className="bg-gray-800 py-6 text-white">
          <div className="container mx-auto text-center">
            <p>© 2025 툭스캔 - 모든 권리 보유.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default FullScrollPage
