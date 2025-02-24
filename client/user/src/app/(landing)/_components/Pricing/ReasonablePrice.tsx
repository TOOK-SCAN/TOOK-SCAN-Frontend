import Image from 'next/image'
import PriceDocument from '../../_assets/image/Pricing/priceDocument.svg'

const ReasonablePrice = () => {
  return (
    <section id="section2" className="bg-[#111827] py-16 text-white">
      <div className="mx-auto w-full max-w-3xl px-4 text-center">
        {/* 타이틀 */}
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
          톡스캔은 업계 최저 가격으로
          <br className="hidden sm:block" />
          합리적인 스캔을 제공해요
        </h2>
        <Image src={PriceDocument} alt="툭스캔" width={800} height={700} />
      </div>
    </section>
  )
}

export default ReasonablePrice
