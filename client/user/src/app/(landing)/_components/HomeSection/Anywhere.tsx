import Image from 'next/image'
import MobileGroup from '../../_assets/image/home/mobileGroup.svg'

const Anywhere = () => {
  return (
    <section
      id="section7"
      className="min-h-[40rem] w-full bg-white px-[1rem] pt-[9rem] md:px-[9rem]"
    >
      <div className="flex w-full flex-col items-start justify-start md:gap-12 lg:flex-row">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex flex-col">
          <div className="mb-8 flex w-full flex-col justify-start">
            <span className="text-[1.25rem] font-semibold text-blue-500">
              서비스 소개
            </span>
            <h2 className="mt-2 title1">
              언제 어디서나 <br /> 편리하게!
            </h2>
            <p className="mt-2 text-gray-600 body1">
              태블릿·PC·모바일에서 간편하게
              <br />
              비대면 셀프 스캔 신청하고,
              <br /> 제작된 파일을 다양한 환경에서 활용해요.
            </p>
          </div>
        </div>

        {/* 모바일 */}
        <div className="relative flex h-full w-full justify-end">
          {/* 데스크탑(오른쪽 위) */}
          <div className="top-15 right-0 z-0 h-[500px] w-[500px] md:absolute">
            <Image
              src={MobileGroup}
              alt="데스크탑 화면"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Anywhere
