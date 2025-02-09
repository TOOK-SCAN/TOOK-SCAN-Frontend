'use client'

import { Button } from '@tookscan/components/ui/Button'
import { CheckButton } from '@tookscan/components/ui/CheckButton'
import { InputField } from '@tookscan/components/ui/InputField'
import clsx from 'clsx'
import StepIndicator from '../_components/StepIndicator'

interface StepOneUIProps {
  stepState: { name: string; phone: string }
  verificationState: {
    isVerified: boolean
    verificationCode: string
    timeLeft: number
    isSendingAuthCode: boolean
    canEditPhone: boolean
    verificationMessage: string
  }
  agreement: {
    all: boolean
    terms1: boolean
    terms2: boolean
    terms3: boolean
    marketing: boolean
  }
  handlers: {
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSendAuthCode: () => Promise<void>
    handleVerificationCodeChange: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void
    handleVerifyAuthCode: () => Promise<void>
    handleAgreementChange: (
      field: 'all' | 'terms1' | 'terms2' | 'terms3' | 'marketing'
    ) => void
    openModal: (title: string, content: string) => void
  }
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const StepOneUI = ({
  stepState,
  verificationState,
  agreement,
  handlers,
  setStep,
}: StepOneUIProps) => {
  const isPhoneValid = stepState.phone.length === 11
  const allRequiredChecked =
    agreement.terms1 && agreement.terms2 && agreement.terms3
  const isNextButtonEnabled =
    stepState.name.trim() !== '' &&
    stepState.phone.trim() !== '' &&
    verificationState.isVerified &&
    allRequiredChecked

  const formattedPhone = stepState.phone.replace(
    /^(\d{3})(\d{1,4})?(\d{1,4})?$/,
    (_, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join('-')
  )

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const termsTitles = [
    '14세 이상입니다.',
    '서비스 이용약관 동의',
    '개인정보 수집 및 이용 동의',
    '광고 및 이벤트 목적의 개인정보 수집 및 이용 동의',
  ]

  return (
    <div className="mt-6 w-[440px] rounded-lg bg-white p-6 shadow-md">
      <StepIndicator currentStep={1} />
      <div className="mt-4 space-y-4">
        <InputField
          type="simple"
          placeholder="이름"
          value={stepState.name}
          onChange={handlers.handleNameChange}
        />
        <div className="flex space-x-2">
          <div
            className={clsx(
              'w-full',
              verificationState.isVerified && 'opacity-50'
            )}
          >
            <InputField
              type="simple"
              placeholder="전화번호"
              value={formattedPhone}
              onChange={handlers.handlePhoneChange}
              disabled={
                !verificationState.canEditPhone || verificationState.isVerified
              }
              isSuccess={verificationState.isVerified}
            />
          </div>
          <Button
            variant="primary"
            size="default"
            onClick={handlers.handleSendAuthCode}
            disabled={
              !isPhoneValid ||
              verificationState.isSendingAuthCode ||
              verificationState.isVerified
            }
            className="whitespace-nowrap px-6"
          >
            인증받기
          </Button>
        </div>
        {verificationState.timeLeft > 0 && (
          <div className="mt-4 flex items-center space-x-2">
            <InputField
              type="simple"
              placeholder="인증번호 입력"
              value={verificationState.verificationCode}
              onChange={handlers.handleVerificationCodeChange}
              disabled={verificationState.isVerified}
              isSuccess={verificationState.isVerified}
            />
            <span className="whitespace-nowrap px-4 text-xs text-red-500">
              {formatTime(verificationState.timeLeft)}
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handlers.handleVerifyAuthCode}
              disabled={
                verificationState.verificationCode.length !== 6 ||
                verificationState.isVerified
              }
              className="whitespace-nowrap px-6"
            >
              인증완료
            </Button>
          </div>
        )}
        {verificationState.verificationMessage && (
          <p
            className={`text-sm ${
              verificationState.verificationMessage === '인증되었습니다.'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {verificationState.verificationMessage}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center">
        <CheckButton
          size="lg"
          isChecked={agreement.all}
          onClick={() => handlers.handleAgreementChange('all')}
        />
        <span className="ml-1.5 text-black-600">전체 동의</span>
      </div>
      <div className="mt-2 h-[1px] w-full bg-gray-300"></div>
      <div className="mt-2 space-y-0.5">
        {['terms1', 'terms2', 'terms3', 'marketing'].map((field, index) => (
          <div key={field} className="flex items-center justify-between">
            <div
              className="flex cursor-pointer items-center"
              onClick={() =>
                handlers.handleAgreementChange(field as keyof typeof agreement)
              }
            >
              <CheckButton
                size="lg"
                isChecked={agreement[field as keyof typeof agreement]}
                onClick={() =>
                  handlers.handleAgreementChange(
                    field as keyof typeof agreement
                  )
                }
              />
              <span className="ml-1.5 text-black-600">
                {index < 3 ? '[필수]' : '[선택]'} {termsTitles[index]}
              </span>
            </div>
            <button
              onClick={() =>
                handlers.openModal(
                  termsTitles[index],
                  field === 'terms1'
                    ? '14세 이상이시죠'
                    : field === 'terms2'
                      ? '서비스 이용약관 동의하세요'
                      : field === 'terms3'
                        ? '개인정보 수집할게요'
                        : '광고 및 이벤트 보낼게요.'
                )
              }
              className="text-gray-600"
            >
              &gt;
            </button>
          </div>
        ))}
      </div>
      <Button
        variant={isNextButtonEnabled ? 'primary' : 'disabled'}
        size="lg"
        disabled={!isNextButtonEnabled}
        onClick={() => setStep(2)}
        className="mt-4 w-full"
      >
        다음
      </Button>
    </div>
  )
}

export default StepOneUI
