import Image from 'next/image'
import MobileMock from '../../_assets/image/howToUse/MobileMock.svg'

const Mobile = () => {
  return (
    <section
      id="section2"
      className="flex w-full items-center justify-center bg-[#262932] px-[1rem] py-[5rem] md:px-[9rem] md:py-[6.25rem]"
    >
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 md:flex-row md:items-center">
        {/* 왼쪽: 모바일 화면 mockup */}
        <div className="flex justify-center md:w-1/2">
          <div className="relative h-[480px] w-[240px] sm:h-[550px] sm:w-[275px]">
            <Image
              src={MobileMock}
              alt="모바일 화면"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 오른쪽: 텍스트 영역 */}
        <div className="w-full">
          <h2 className="mb-4 font-bold leading-snug text-blue-400 title1">
            비대면으로 <br />
            간편하게 접수하고
            <br />
            빠르게 PDF를 제작해요
          </h2>
          <p className="text-gray-300 body1">
            신청부터 완료까지 쉽고 빠르게!
            <br />
            스캔 진행 상황을 실시간으로 확인할 수 있어요!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Mobile
