import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import { Icon } from '@tookscan/components'
import clsx from 'clsx'

const stepDetails: Record<number, { title: string; description: string }> = {
  0: {
    title: '스캔정보 입력',
    description: '스캔할 책의 정보를 작성해주세요.',
  },
  1: {
    title: '배송정보 입력',
    description: '책을 돌려받을 배송 정보를 입력해주세요.',
  },
  2: {
    title: '이용약관 동의',
    description: '이용 약관에 동의해주세요.',
  },
}

const PageInfo = () => {
  const { pageIndex, setPageIndex } = useApplyContext()
  const handleGoBack = () => {
    if (pageIndex === 1 || pageIndex === 2)
      setPageIndex((prev: number) => prev - 1)
  }
  return (
    <div className={clsx('mx-auto flex w-full flex-col justify-start gap-6')}>
      <div className={clsx('flex flex-row gap-4')}>
        {[0, 1, 2].map((index) => (
          <Icon
            key={index}
            id="ellipse"
            width={16}
            height={16}
            className={clsx(
              index === pageIndex ? 'text-blue-primary' : 'text-gray-300'
            )}
          />
        ))}
      </div>
      <div className="gap-2">
        <h2 className={clsx('h2 font-semibold text-blue-primary')}>
          STEP {pageIndex + 1}.
        </h2>
        <h2 className={clsx('font-bold title2')}>
          {stepDetails[pageIndex].title || '잘못된 단계입니다.'}
        </h2>
      </div>
      <p className="text-black-800 body1">
        {stepDetails[pageIndex].description || '잘못된 단계입니다.'}
      </p>
      {pageIndex !== 0 && (
        <button
          className={clsx('flex text-blue-primary btn2')}
          onClick={handleGoBack}
        >
          &lt; 이전으로
        </button>
      )}
    </div>
  )
}

export default PageInfo
