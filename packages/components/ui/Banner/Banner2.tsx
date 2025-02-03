import { Icon } from '../Icon/Icon'

const Banner2 = () => {
  return (
    <div className="flex items-center gap-1.5 space-x-6">
      <div>
        <Icon id="logo" width={80} height={36} />
      </div>
      <div className="text-left">
        <p className="font-pretendard text-[20px] font-normal leading-[1.5]">
          TOOK을 통해 <br /> 고품질 스캔 파일을 이용해보세요!
        </p>
        <p className="font-pretendard mt-2 text-[12px] font-normal leading-[1.5]">
          툭은 안전하고 편리한 스캔서비스를 제공합니다. <br />
          지금 스캔 신청하기를 통해 빠르게 견적을 확인해보세요.
        </p>
      </div>
    </div>
  )
}

export default Banner2
