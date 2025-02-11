'use client'
import { Section } from '@/app/(nonRoot)/apply/_components'
import { RestoreIcon } from '@/app/(nonRoot)/apply/_components/Step/RestoreIcon'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import { InputField, TitleLabel } from '@tookscan/components'

import { useState } from 'react'

const OnboardingBackground = () => {
  useApplyContext()
  const [currentBook, setCurrentBook] = useState({
    name: '',
    pages: '',
    request: '',
  })

  const handleChange = (key: string, value: string) => {
    setCurrentBook((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="white fixed inset-0 z-10 bg-white opacity-20">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex w-full flex-row gap-12 bg-white p-10">
          {/* 왼쪽 STEP 영역 */}
          <div className="flex w-1/2 flex-col gap-4">
            {/* 점 세 개 */}
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-300"></span>
              <span className="h-2 w-2 rounded-full bg-gray-300"></span>
              <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            </div>

            {/* STEP 1. 제목 영역 */}
            <h2 className="text-lg font-bold text-blue-500">
              STEP 1. <br />
              스캔 정보입력
            </h2>
            <p className="text-sm text-gray-500">
              스캔할 책의 정보를 작성해주세요.
            </p>
          </div>

          {/* 오른쪽 입력 폼 영역 */}
          <div className="flex w-1/2 flex-col gap-6">
            <Section>
              <TitleLabel
                size="lg"
                type="required"
                title="책 별명을 지어주세요."
              />
              <InputField
                type="simple"
                value={currentBook.name}
                suffix={`${currentBook.name.length}/30`}
                onChange={(e) =>
                  handleChange('name', e.target.value.slice(0, 30))
                }
                placeholder="별명"
              />
            </Section>

            <Section>
              <TitleLabel
                size="lg"
                type="required"
                title="페이지 수"
                description="정확하지 않아도 상관없어요! 1800페이지 이상 넘어서면 제한이 있을 수 있어요."
              />
              <InputField
                type="simple"
                value={currentBook.pages}
                suffix="Page"
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    handleChange('pages', e.target.value)
                  }
                }}
                placeholder="페이지 수"
              />
            </Section>

            <Section>
              <TitleLabel size="lg" type="default" title="요청사항" />
              <InputField
                type="simple"
                value={currentBook.request}
                onChange={(e) => handleChange('request', e.target.value)}
                placeholder="요청사항이 있다면 적어주세요"
              />
            </Section>

            {/* 책 복원 옵션 (RestoreIcon 적용) */}
            <Section>
              <TitleLabel size="lg" type="required" title="책 복원 옵션 선택" />
              <div className="grid grid-cols-3 gap-4">
                {/* 첫 번째 아이콘 - 선택된 상태 (파란색 배경) */}
                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-blue-500">
                  <RestoreIcon type="RAW" isClicked={true} />
                </div>

                {/* 나머지 아이콘 - 비활성화 상태 */}
                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-200">
                  <RestoreIcon type="SPRING" isClicked={false} />
                </div>
                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-200">
                  <RestoreIcon type="DISCARD" isClicked={false} />
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingBackground
