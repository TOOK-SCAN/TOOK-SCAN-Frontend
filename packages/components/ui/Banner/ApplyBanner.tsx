const ApplyBanner = () => {
  return (
    <div className="bg-blue-primary flex w-full items-start justify-start p-[2rem] text-white lg:h-[12.5rem] lg:px-[9rem] lg:py-[2.38rem]">
      <div className="flex h-full w-full items-center justify-between px-6 lg:px-[9rem]">
        <div className="flex flex-col justify-center text-left">
          <p className="h2 font-bold leading-[1.5]">신청하기</p>
          <p className="caption1 mt-2 leading-[1.5] opacity-50">
            툭은 안전하고 편리한 스캔서비스를 제공합니다. <br />
            지금 스캔 신청하기를 통해 빠르게 견적을 확인해보세요.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ApplyBanner
