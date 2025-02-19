'use client'

import { fetchTerms } from '@/api'
import type { Term } from '@/types'
import { TermsType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@tookscan/components/ui/Button'
import { CheckButton } from '@tookscan/components/ui/CheckButton'
import { InputField } from '@tookscan/components/ui/InputField'
import clsx from 'clsx'
import React, { useState } from 'react'
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
  agreement: { [termId: number]: boolean }
  handlers: {
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSendAuthCode: () => Promise<void>
    handleVerificationCodeChange: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void
    handleVerifyAuthCode: () => Promise<void>
    handleAgreementChange: (termId: number, value?: boolean) => void
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
  const [showVerification, setShowVerification] = useState(false)
  const [adAgreement, setAdAgreement] = useState(false)
  const [emailConsent, setEmailConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)

  const isPhoneValid = stepState.phone.length === 11

  const { data: termsData } = useQuery<Term[]>({
    queryKey: ['signupTerms'],
    queryFn: () => fetchTerms(TermsType.SIGN_UP),
  })
  const visibleTerms: Term[] =
    termsData?.filter((term: Term) => term.isVisible) || []

  const allRequiredAgreed = visibleTerms
    .filter((term) => term.isRequired)
    .every((term) => agreement[term.id])

  const isAllChecked =
    visibleTerms.every((term) => agreement[term.id]) &&
    adAgreement &&
    emailConsent &&
    smsConsent

  const isNextButtonEnabled =
    stepState.name.trim() !== '' &&
    stepState.phone.trim() !== '' &&
    verificationState.isVerified &&
    allRequiredAgreed

  const formattedPhone = stepState.phone.replace(
    /^(\d{3})(\d{1,4})?(\d{1,4})?$/,
    (_, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join('-')
  )

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleAllAgreementChange = () => {
    const newState = !isAllChecked

    visibleTerms.forEach((term) => {
      handlers.handleAgreementChange(term.id, newState)
    })

    setAdAgreement(newState)
    setEmailConsent(newState)
    setSmsConsent(newState)
  }

  const handleAdAgreementChange = () => {
    if (adAgreement) {
      setEmailConsent(false)
      setSmsConsent(false)
      setAdAgreement(false)
    } else {
      setEmailConsent(true)
      setSmsConsent(true)
      setAdAgreement(true)
    }
  }

  const handleConsentChange = (type: 'email' | 'sms') => {
    if (type === 'email') {
      setEmailConsent((prev) => {
        const newEmailConsent = !prev
        const newAdAgreement = newEmailConsent || smsConsent

        setAdAgreement(newAdAgreement)
        return newEmailConsent
      })
    } else {
      setSmsConsent((prev) => {
        const newSmsConsent = !prev
        const newAdAgreement = emailConsent || newSmsConsent

        setAdAgreement(newAdAgreement)
        return newSmsConsent
      })
    }
  }

  const handleOpenPrivacyPolicy = () => {
    handlers.openModal(
      '개인정보 수집 및 이용 동의',
      '고객 서비스 이용에 관한 안내 및 이용자 식별'
    )
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-[30rem] rounded-lg bg-white p-6 shadow-md">
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
              placeholder="010-1234-5678"
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
            onClick={async () => {
              await handlers.handleSendAuthCode()
              setShowVerification(true)
            }}
            disabled={
              !isPhoneValid ||
              verificationState.isSendingAuthCode ||
              verificationState.isVerified
            }
            className="px-6"
          >
            인증받기
          </Button>
        </div>
        {showVerification && (
          <div className="mt-4 flex items-center space-x-2">
            <div
              className={clsx(
                'w-full',
                verificationState.isVerified && 'opacity-50'
              )}
            >
              <InputField
                type="simple"
                placeholder="인증번호 입력"
                value={verificationState.verificationCode}
                onChange={handlers.handleVerificationCodeChange}
                disabled={verificationState.isVerified}
                isSuccess={verificationState.isVerified}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handlers.handleVerifyAuthCode}
              disabled={
                verificationState.verificationCode.length !== 6 ||
                verificationState.isVerified
              }
              className="px-6"
            >
              인증완료
            </Button>
          </div>
        )}
        <span className="whitespace-nowrap px-4 text-xs">
          {verificationState.isVerified ? (
            <span className="text-green-500">인증되었습니다</span>
          ) : (
            <span className="text-red-500">
              {formatTime(verificationState.timeLeft)}
            </span>
          )}
        </span>
      </div>
      {/*약관동의*/}
      <div className="mt-4 flex items-center">
        <CheckButton
          size="lg"
          isChecked={
            visibleTerms.length > 0 &&
            visibleTerms.every((term) => agreement[term.id])
          }
          onClick={handleAllAgreementChange}
        />
        <span className="ml-1.5 text-black-600">전체 동의</span>
      </div>
      <div className="mt-2 h-[1px] w-full bg-gray-300"></div>
      <div className="mt-2 space-y-0.5">
        {visibleTerms.map((term) => (
          <div key={term.id} className="flex items-center justify-between">
            <div
              className="flex cursor-pointer items-center"
              onClick={() => handlers.handleAgreementChange(term.id)}
            >
              <CheckButton
                size="lg"
                isChecked={agreement[term.id] || false}
                onClick={() => {}}
              />
              <span className="ml-1.5 text-black-600">
                {term.isRequired ? '[필수]' : '[선택]'} {term.title}
              </span>
            </div>
            <button
              onClick={() => handlers.openModal(term.title, term.content)}
              className="text-gray-600"
            >
              &gt;
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <CheckButton
            size="lg"
            isChecked={adAgreement}
            onClick={handleAdAgreementChange}
          />
          <span className="ml-1.5 text-black-600">
            [선택] 광고 및 이벤트 목적의 개인정보 수집 및 이용 동의
          </span>
        </div>
        <button className="text-gray-600" onClick={handleOpenPrivacyPolicy}>
          &gt;
        </button>
      </div>

      <div className="mt-2 flex gap-x-4 rounded-md border border-gray-400 p-3">
        <div className="flex items-center gap-x-2">
          <CheckButton
            size="lg"
            isChecked={emailConsent}
            onClick={() => handleConsentChange('email')}
          />
          <span className="text-black-600">E-Mail</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CheckButton
            size="lg"
            isChecked={smsConsent}
            onClick={() => handleConsentChange('sms')}
          />
          <span className="text-black-600">SMS</span>
        </div>
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
