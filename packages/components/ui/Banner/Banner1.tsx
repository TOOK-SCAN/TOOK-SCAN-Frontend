import { Icon } from '../Icon/Icon'

const Banner1 = () => {
  return (
    <div className="flex items-center gap-8 space-x-6">
      <div>
        <Icon id="logo" width={150} height={66} />
      </div>
      <div className="flex flex-col gap-3 text-left">
        <p className="text-xl font-semibold">
          TOOK을 통해 <br /> 고품질 스캔 파일을 이용해보세요!
        </p>
        <p className="text-sm opacity-50">
          툭은 안전하고 편리한 스캔서비스를 제공합니다.
          <br />
          지금 스캔 신청하기를 통해 빠르게 견적을 확인해보세요.
        </p>
      </div>
    </div>
  )
}

export default Banner1
