import Image from 'next/image'
import TookBg from '../../_assets/image/home/tookbg.svg'

const Hero = () => {
  return (
    <section
      id="section1"
      className="relative flex min-h-[25rem] w-full items-center overflow-hidden bg-[#262932]"
    >
      <Image
        src={TookBg}
        alt="툭스캔"
        width={400}
        height={400}
        className="absolute left-0 top-0 z-0 rotate-[-15deg] object-cover"
      />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-[1.5rem] md:flex-row md:gap-[4rem]">
        <div className="text-center title1 md:text-start">
          <div className="text-white">국내 최고의</div>
          <div className="text-blue-primary">비대면 셀프스캔</div>
          <div className="text-white">툭스캔을 소개드려요!</div>
        </div>
        <div className="text-[#7B7B7B] body1">
          툭스캔, 무거운 책을 가벼운 PDF로, <br />
          툭스캔 산업의 새로운 기준.
        </div>
      </div>
    </section>
  )
}
export default Hero
