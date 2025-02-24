import Image from 'next/image'
import ScannerImg from '../../_assets/image/Pricing/scannerImg.svg'
import { TableData } from '../../_utils/table'
import { FeatureBox } from '../FeatureBox'

const ScannerSpecs = () => {
  return (
    <section
      id="section3"
      className="w-full bg-white px-[1rem] py-[5rem] text-black md:px-[9rem]"
    >
      <div className="w-full items-center justify-center">
        {/* 상단 소개 영역 */}
        <div className="mb-8">
          <span className="text-[1.25rem] font-semibold text-blue-500">
            서비스 소개
          </span>
          <h2 className="mt-2 title1">
            최상의 품질을 자랑하는 툭스캔, <br />
            스캐너 스펙을 확인해보세요!
          </h2>
          <div className="mt-[5rem] flex w-full flex-col items-center justify-center gap-[5rem] md:flex-row">
            <div className="relative">
              <Image
                src={ScannerImg}
                alt="스캐너 일러스트"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>

            {/* 오른쪽: 6개의 div 박스 */}
            <div className="flex w-full flex-col items-center justify-center gap-2">
              {TableData.map((feature, index) => (
                <FeatureBox
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScannerSpecs
