'use client'
import { Section } from '@/app/(nonRoot)/apply/_components'
import { Button, InputField, TitleLabel } from '@tookscan/components'
import React, { useState } from 'react'

const PasswordManagement: React.FC = () => {
  // 비밀번호 관련 상태 관리: 기존비밀번호, 새 비밀번호, 새 비밀번호 확인
  const [passwordInfo, setPasswordInfo] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleInputChange = (
    key: keyof typeof passwordInfo,
    value: string
  ): void => {
    setPasswordInfo((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (): void => {
    // 비밀번호 수정 처리 로직 구현 (예: API 호출 등)
    console.log('비밀번호 수정 정보:', passwordInfo)
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <Section>
        <TitleLabel size="lg" type="required" title="비밀번호" />

        {/* 기존 비밀번호 */}
        <InputField
          type="password"
          name="current"
          value={passwordInfo.current}
          onChange={(e) => handleInputChange('current', e.target.value)}
          placeholder="기존비밀번호"
        />
        {/* 비밀번호 규칙 안내 */}
        <p className="mb-2 mt-[12px] text-sm font-[12px] text-gray-400">
          (8~20자 영문 숫자 조합)
        </p>
        {/* 새 비밀번호 */}
        <InputField
          type="password"
          name="new"
          value={passwordInfo.new}
          onChange={(e) => handleInputChange('new', e.target.value)}
          placeholder="새 비밀번호"
        />
        <p className="mb-2 mt-[12px] text-sm font-[12px] text-gray-400">
          (8~20자 영문 숫자 조합)
        </p>
        {/* 새 비밀번호 확인 */}
        <InputField
          type="password"
          name="confirm"
          value={passwordInfo.confirm}
          onChange={(e) => handleInputChange('confirm', e.target.value)}
          placeholder="새 비밀번호 확인"
        />
        <p className="mt-[12px] text-sm font-[12px] text-gray-400">
          비밀번호를 한번 더 입력해주세요.
        </p>
      </Section>

      <Button
        type="button"
        size="md"
        className="mt-[100px] h-[60px] w-full max-w-[30rem] rounded-md bg-blue-500 px-[28px] py-[18px] text-white"
        onClick={handleSubmit}
      >
        수정완료
      </Button>
    </div>
  )
}

export default PasswordManagement
