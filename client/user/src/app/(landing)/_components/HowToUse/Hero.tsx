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
      <div className="relative z-10 flex w-full flex-row items-center justify-center gap-[4rem]">
        <div className="text-center text-white title1">
          가벼운 나의 전공책, <br /> 툭스캔과 함께라면 당신의 일상이
          새로워질거예요
        </div>
      </div>
    </section>
  )
}
export default Hero
