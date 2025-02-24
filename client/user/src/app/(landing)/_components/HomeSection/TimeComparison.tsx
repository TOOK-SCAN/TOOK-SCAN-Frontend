import Image from 'next/image'
import Picture from '../../_assets/image/home/picture.svg'
import Select from '../../_assets/image/home/selectBook.svg'

const TimeComparison = () => {
  return (
    <section
      id="section3"
      className="flex bg-[#262932] px-[1rem] py-[5rem] md:px-[9rem]"
    >
      <div className="mt-[3rem] w-full flex-1 flex-col justify-start">
        <div className="text-white h1">500페이지 스캔, 직접 하면 60분?</div>
        <div className="text-blue-primary title1">
          툭스캔에 맡기는 시간은 단 2분!
        </div>

        <div className="mt-[5rem] flex w-full flex-col items-center justify-center gap-[1rem] md:flex-row md:items-end">
          <div className="max-h-[20rem] w-full max-w-[30rem] rounded-[1.5rem] bg-[#838A94] pr-[1rem] opacity-60">
            <div className="p-[2rem]">
              <div className="text-[1.5rem] font-semibold text-white">
                직접 촬영
              </div>
              <div className="text-white body2">
                60분 소요 + 10,030원 시간 비용 + 낮은 품질
              </div>
            </div>
            <Image src={Picture} alt="툭스캔" width={400} height={300} />
          </div>
          <div className="max-h-[23rem] w-full max-w-[30rem] overflow-hidden rounded-[2rem] bg-blue-primary">
            <div className="p-[2rem]">
              <div className="text-white title2">최고의 선택, 툭스캔</div>
              <div className="text-white body2">
                2분 신청 + 페이지당 10원! + 최고 품질
              </div>
            </div>
            <div className="relative mt-[60%] flex h-40 items-end justify-center">
              <Image
                src={Select}
                alt="툭스캔"
                width={700}
                height={700}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimeComparison
