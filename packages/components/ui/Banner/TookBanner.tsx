import { Icon } from '../Icon/Icon'

const TookBanner = () => {
  return (
    <div className="bg-blue-primary flex w-full items-start justify-start px-[1rem] py-[2rem] text-white lg:h-[12.5rem] lg:items-center lg:justify-center lg:px-[2rem] lg:py-[3rem]">
      <div className="flex flex-col text-white">
        {/* 모바일 디자인 */}
        <div className="flex h-full w-full items-center justify-center gap-4 lg:hidden">
          <Icon id="whiteLogo" width={80} height={30} />
          <div className="flex flex-col text-left">
            <p className="h2 font-semibold">
              TOOK을 통해 고품질 <br /> 스캔 파일을 이용해보세요!
            </p>
            <p className="caption1 opacity-70">
              툭은 안전하고 편리한 스캔서비스를 제공해요.
              <br />
              지금 바로 스캔 신청하기를 통해 빠르게 견적을 확인해보세요.
            </p>
          </div>
        </div>

        {/* 데스크탑 디자인 */}
        <div className="hidden h-full w-full items-center justify-center lg:flex">
          <div className="flex items-center gap-4">
            <Icon id="whiteLogo" width={150} height={66} />
            <div className="flex flex-col gap-3 text-left">
              <p className="h2 font-semibold">
                툭! 스캔을 통해 고품질 <br /> 스캔 파일을 이용해보세요!
              </p>
              <p className="caption1 opacity-50">
                툭은 안전하고 편리한 스캔서비스를 제공합니다.
                <br />
                지금 스캔 신청하기를 통해 빠르게 견적을 확인해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TookBanner
