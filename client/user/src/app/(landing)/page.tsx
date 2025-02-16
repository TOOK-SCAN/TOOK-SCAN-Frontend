'use client'
import Image from 'next/image'
import BackgroundBooks from './components/BackgroundBooks'
import PdfBook from './components/image/pdfBooks.svg'
import TookBg from './components/image/tookbg.svg'

const LandingPage = () => {
  return (
    <div>
      {/* 🔹 섹션 방식으로 추가 */}
      <section
        id="section1"
        className="h-au†o relative flex items-center bg-[#262932]"
      >
        <Image
          src={TookBg}
          alt="툭스캔"
          width={240}
          height={150}
          className="z-0 object-cover"
        />
        <div className="relative z-10 flex flex-row items-center gap-[3rem]">
          <div className="title1">
            <div className="text-white">국내 최고의</div>
            <div className="text-blue-primary">비대면 셀프스캔</div>
            <div className="text-white">툭스캔을 소개드려요!</div>
          </div>
          <div className="text-[#7B7B7B]">
            툭스캔, 무거운 책을 가벼운 PDF로, <br />
            툭스캔 산업의 새로운 기준.
          </div>
        </div>
      </section>
      <section
        id="section2"
        className="relative flex h-screen items-center justify-center"
      >
        <BackgroundBooks />
        <div className="flex flex-row gap-[3rem]">
          <div className="felx flex-col">
            <div className="text-[1.255rem] text-blue-primary">서비스 소개</div>
            <div>
              무거운 고민, <br /> 가볍게 해결해요!
            </div>
          </div>
          <Image src={PdfBook} alt="PDF Book" width={180} height={150} />
        </div>
      </section>
      <section
        id="section3"
        className="flex h-screen items-center justify-center"
      >
        <h2 className="text-3xl font-bold">비용까지 합리적입니다!</h2>
      </section>
    </div>
  )
}

export default LandingPage
