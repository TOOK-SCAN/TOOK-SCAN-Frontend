'use client'
import { updatePW } from '@/api'
import { Section } from '@/app/(nonRoot)/apply/_components'
import { Button, InputField, TitleLabel } from '@tookscan/components'
import { useModal } from '@tookscan/hooks'
import React, { useState } from 'react'

const PasswordManagement: React.FC = () => {
  // 비밀번호 관련 상태 관리: 기존비밀번호, 새 비밀번호, 새 비밀번호 확인
  const [passwordInfo, setPasswordInfo] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const { openModal, closeModal } = useModal()

  const handleSubmit = async () => {
    const { current, new: newPassword, confirm } = passwordInfo

    if (!current || !newPassword || !confirm) {
      openModal(
        <div className="flex flex-col">
          <div className="pt-6 text-center text-lg font-bold text-black">
            오류
          </div>
          <div className="mt-4 h-[1px] w-full bg-gray-300" />
          <p className="px-6 py-8 text-center text-red-500">
            모든 필드를 입력해주세요.
          </p>
          <div className="flex px-6 pb-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={closeModal}
            >
              확인
            </Button>
          </div>
        </div>
      )
      return
    }

    if (newPassword !== confirm) {
      openModal(
        <div className="flex flex-col">
          <div className="pt-6 text-center text-lg font-bold text-black">
            오류
          </div>
          <div className="mt-4 h-[1px] w-full bg-gray-300" />
          <p className="px-6 py-8 text-center text-red-500">
            새 비밀번호가 일치하지 않습니다.
          </p>
          <div className="flex px-6 pb-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={closeModal}
            >
              확인
            </Button>
          </div>
        </div>
      )
      return
    }

    try {
      await updatePW(current, newPassword)

      setPasswordInfo({ current: '', new: '', confirm: '' })
      openModal(
        <div className="flex flex-col">
          <div className="pt-6 text-center text-lg font-bold text-black">
            비밀번호 변경 완료
          </div>
          <div className="mt-4 h-[1px] w-full bg-gray-300" />
          <p className="px-6 py-8 text-center">
            비밀번호가 성공적으로 변경되었습니다.
          </p>
          <div className="flex px-6 pb-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                closeModal()
              }}
            >
              확인
            </Button>
          </div>
        </div>
      )
    } catch (error: unknown) {
      let errorMessage = '비밀번호 변경 중 오류가 발생했습니다.'

      // error가 Error 객체인지 확인
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: string }).message === 'string'
      ) {
        errorMessage = (error as { message: string }).message
      }

      openModal(
        <div className="flex flex-col">
          <div className="pt-6 text-center text-lg font-bold text-black">
            비밀번호 변경 실패
          </div>
          <div className="mt-4 h-[1px] w-full bg-gray-300" />
          <p className="px-6 py-8 text-center text-red-500">{errorMessage}</p>
          <div className="flex px-6 pb-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={closeModal}
            >
              확인
            </Button>
          </div>
        </div>
      )
    }
  }
  const handleInputChange = (key: keyof typeof passwordInfo, value: string) => {
    setPasswordInfo((prev) => ({ ...prev, [key]: value }))
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
          (8~20자 영어 대소문자, 숫자, 특수문자 조합)
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
          (8~20자 영어 대소문자, 숫자, 특수문자 조합)
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
