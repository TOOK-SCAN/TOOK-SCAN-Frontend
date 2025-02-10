'use client'

import clsx from 'clsx'
import { useEffect } from 'react'

import {
  PageInfo,
  Purchase,
  StepSheet,
} from '@/app/(nonRoot)/apply/_components'
import {
  ApplyProvider,
  useApplyContext,
} from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import { Banner, Icon } from '@tookscan/components'

const ApplyContent = () => {
  const { books, ignoreBeforeUnload } = useApplyContext()

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (books.length > 0 && !ignoreBeforeUnload.current) {
        event.preventDefault()
        event.returnValue = '페이지를 나가시면 작성 중인 내용이 사라집니다! '
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [books, ignoreBeforeUnload])

  return (
    <div className="flex w-full flex-col items-center">
      {/* 상단 배너 */}
      <Banner type={3} />

      {/* 메인 컨테이너: 데스크톱에서는 최대 1440px, 화면 크기에 맞춰 패딩 조절 */}
      <div
        className={clsx(
          'flex w-full max-w-[1440px] flex-col items-center gap-6',
          'px-4 sm:px-8 md:px-12 lg:px-36',
          'py-10 sm:py-16 md:py-20'
        )}
      >
        {/* 단계 안내 (PageInfo) */}
        <PageInfo />

        {/* 데스크톱(LG 이상)에서 row 레이아웃 */}
        <div className="flex w-full flex-col items-start gap-12 lg:flex-row">
          {/* 왼쪽 영역 (StepSheet) */}
          <StepSheet />

          {/* books가 있을 때만 Purchase 보여주고, 없으면 안내문구 */}
          {books.length > 0 ? (
            // 데스크톱 전용 (lg 이상): Purchase 바로 표시
            <div className="hidden w-full lg:block">
              <Purchase />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex h-full flex-col items-center justify-center">
                <Icon id="logo" className="text-blue-primary" />
                <p className="mt-8 text-2xl font-bold text-blue-primary">
                  Took Scan을 통해 고품질 스캔 파일을 이용해 보세요!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 모바일/태블릿 (lg 미만)에서는 Purchase를 화면 아래에 고정 */}
      {books.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 block lg:hidden">
          <Purchase />
        </div>
      )}
    </div>
  )
}

// 전체 컨텍스트 적용 래퍼
const Apply = () => (
  <ApplyProvider>
    <ApplyContent />
  </ApplyProvider>
)

export default Apply
