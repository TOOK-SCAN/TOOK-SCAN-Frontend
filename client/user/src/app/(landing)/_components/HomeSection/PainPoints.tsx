import HeavyBag from '../../_assets/image/home/HeavyBag.svg'
import LongTime from '../../_assets/image/home/LongTime.svg'
import MemojiThinking from '../../_assets/image/home/MemojiThinking.svg'
import { Card } from '../../_components/Card'

const PainPoints = () => {
  return (
    <section
      id="section5"
      className="bg-white px-[1rem] py-[5rem] text-black md:px-[9rem]"
    >
      <div className="w-full px-4">
        {/* 상단 소개 영역 */}
        <div className="mb-8">
          <span className="text-[1.25rem] font-semibold text-blue-500">
            서비스 소개
          </span>
          <h2 className="mt-2 title1">
            이런점이 <br /> 너무 불편해요!
          </h2>
          <p className="mt-2 text-gray-600 body1">
            이런 경험, 한 번쯤 있지 않나요? <br className="hidden sm:block" />
            툭스캔이 해결해드릴게요.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
          <Card
            title="너무 무거워요!"
            description="매일 2~3권 수업... 모든 책들 들고 다니기엔 가방이 너무 무거워요!"
            imgSrc={HeavyBag}
            alt="무거운 가방"
            imgWidth={100}
            imgHeight={100}
            imageWrapperClassName="mt-[20%]"
          />

          <Card
            title="너무 오래걸려요!"
            description="아이패드로 직접 찍어봤지만... 500페이지 촬영은 너무 오래 걸려서 1시간이나 써버렸어요!"
            imgSrc={LongTime}
            alt="오래 걸리는 작업"
            imgWidth={380}
            imgHeight={180}
            imageWrapperClassName="mt-[70%]"
          />

          <Card
            title="북스캔, 고민중이에요!"
            description="비대면 업체는 스캔 품질이 아쉬워요... 가격도, 품질도 만족스러운 곳... 정말 없을까요?"
            imgSrc={MemojiThinking}
            alt="고민하는 사람"
            imgWidth={250}
            imgHeight={200}
            imageWrapperClassName="mt-[30%]"
          />
        </div>
      </div>
    </section>
  )
}

export default PainPoints
