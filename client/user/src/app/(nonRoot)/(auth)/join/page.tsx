'use client'

import { signUpIDCheck } from '@/api'
import { sendAuthCode, verifyAuthCode } from '@tookscan/api'
import { Button } from '@tookscan/components/ui/Button'
import { CheckButton } from '@tookscan/components/ui/CheckButton'
import { InputField } from '@tookscan/components/ui/InputField'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Modal from './_components/Modal'
import StepIndicator from './_components/StepIndicator'

const Join = () => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agreement, setAgreement] = useState({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
    marketing: false,
  })
  const [showVerificationField, setShowVerificationField] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(90)
  const [isVerified, setIsVerified] = useState(false)
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [isVerificationValid, setIsVerificationValid] = useState(false)
  const [isSendingAuthCode, setIsSendingAuthCode] = useState(false)
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState('')
  const [canEditPhone, setCanEditPhone] = useState(true)

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [idValidationMessage, setIdValidationMessage] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', content: '' })

  // 모든 필수 조건이 충족되었는지 확인
  const allChecked = agreement.terms1 && agreement.terms2 && agreement.terms3
  const isNextButtonEnabled =
    name.trim() !== '' && phone.trim() !== '' && isVerified && allChecked

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showVerificationField && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setShowVerificationField(false)
      setVerificationCode('')
      setIsVerificationValid(false)
      setIsSendingAuthCode(false)
    }
    return () => clearInterval(timer)
  }, [showVerificationField, timeLeft])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const formattedPhone = phone.replace(
    /^(\d{3})(\d{1,4})?(\d{1,4})?$/,
    (_, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join('-')
  )

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEditPhone) return

    const rawValue = e.target.value.replace(/\D/g, '')
    if (rawValue.length > 11) return

    setPhone(rawValue)
    setIsPhoneValid(rawValue.length === 11)

    setIsVerified(false)
    setShowVerificationField(false)
    setVerificationCode('')
    setVerificationMessage('')
  }

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isVerified) return

    const rawValue = e.target.value.replace(/\D/g, '')
    if (rawValue.length > 6) return

    setVerificationCode(rawValue)
    setIsVerificationValid(rawValue.length === 6)
  }

  const handleSendAuthCode = async () => {
    if (isSendingAuthCode) return

    setIsSendingAuthCode(true)
    try {
      await sendAuthCode(name, phone)
      setShowVerificationField(true)
      setTimeLeft(300)
      setVerificationMessage('')
    } catch (error) {
      setIsSendingAuthCode(false)
    }
  }

  const handleVerifyAuthCode = async () => {
    if (isVerifyingAuth) return

    setIsVerifyingAuth(true)
    try {
      await verifyAuthCode(phone, verificationCode)
      setIsVerified(true)
      setCanEditPhone(false)
      setVerificationMessage('인증되었습니다.')
    } catch (error) {
      setVerificationMessage('인증번호가 올바르지 않습니다.')
    } finally {
      setIsVerifyingAuth(false)
    }
  }
  const modalContents = [
    { title: '14세 이상입니다', content: '14세 이상이시죠' },
    {
      title: '서비스 이용약관 동의',
      content: '서비스 이용약관 동의하세요',
    },
    {
      title: '개인정보 수집 및 이용 동의',
      content: '개인정보 수집할게요',
    },
    {
      title: '광고 및 이벤트 목적의 개인정보 수집 및 이용 동의',
      content: '광고 및 이벤트 보낼게요.',
    },
  ]

  const termsTitles = [
    '14세 이상입니다.',
    '서비스 이용약관 동의',
    '개인정보 수집 및 이용 동의',
    '광고 및 이벤트 목적의 개인정보 수집 및 이용 동의',
  ]

  const handleAgreementChange = (field: keyof typeof agreement | 'all') => {
    setAgreement((prev) => {
      if (field === 'all') {
        const newValue = !prev.all
        return {
          all: newValue,
          terms1: newValue,
          terms2: newValue,
          terms3: newValue,
          marketing: newValue,
        }
      } else {
        const updatedAgreement = {
          ...prev,
          [field]: !prev[field],
        }

        updatedAgreement.all =
          updatedAgreement.terms1 &&
          updatedAgreement.terms2 &&
          updatedAgreement.terms3 &&
          updatedAgreement.marketing

        return updatedAgreement
      }
    })
  }

  const handleIdValidation = async () => {
    if (!id.trim()) {
      setIdValidationMessage('아이디를 입력하세요.')
      return
    }

    try {
      const response = await signUpIDCheck(id)
      if (!response.data.is_valid) {
        setIdValidationMessage('이미 사용 중인 아이디입니다.')
      } else {
        setIdValidationMessage('사용 가능한 아이디입니다.')
      }
    } catch (error) {
      setIdValidationMessage(
        '아이디 중복 확인에 실패했습니다. 다시 시도해주세요.'
      )
    }
  }

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content })
    setIsModalOpen(true)
  }

  return (
    <div className="mb-12 flex flex-col items-center">
      <div className="mt-10 w-[440px] text-left">
        <div className="text-xs font-bold text-blue-primary">회원가입</div>
        <div className="mt-2 text-lg font-bold leading-tight text-black-800">
          툭스캔과 함께해요!
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="mt-6 w-[440px] rounded-lg bg-white p-6 shadow-md">
          <StepIndicator currentStep={step} />
          <div className="mt-4 space-y-4">
            <InputField
              type="simple"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex space-x-2">
              <div className={clsx('w-full', isVerified && 'opacity-50')}>
                <InputField
                  type="simple"
                  placeholder="전화번호"
                  value={formattedPhone}
                  onChange={handlePhoneChange}
                  disabled={!canEditPhone || isVerified}
                  isSuccess={isVerified}
                />
              </div>
              <Button
                className="whitespace-nowrap px-6"
                variant="primary"
                size="default"
                onClick={handleSendAuthCode}
                disabled={!isPhoneValid || isSendingAuthCode || isVerified}
              >
                인증받기
              </Button>
            </div>
            {showVerificationField && (
              <>
                <div className="mt-4 flex items-center space-x-2">
                  <div className={clsx('w-full', isVerified && 'opacity-50')}>
                    <InputField
                      type="simple"
                      placeholder="인증번호 입력"
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
                      disabled={isVerified} // 인증 완료 후 비활성화
                      isSuccess={isVerified}
                    />
                  </div>
                  <span className="whitespace-nowrap px-4 text-xs text-red-500">
                    {timeLeft > 0 ? formatTime(timeLeft) : '시간 초과'}
                  </span>
                  <Button
                    className="whitespace-nowrap px-6"
                    variant="primary"
                    size="md"
                    onClick={handleVerifyAuthCode}
                    disabled={
                      isVerifyingAuth ||
                      !isVerificationValid ||
                      timeLeft === 0 ||
                      isVerified
                    }
                  >
                    인증완료
                  </Button>
                </div>
                {verificationMessage && (
                  <p
                    className={`text-sm ${
                      verificationMessage === '인증되었습니다.'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {verificationMessage}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mt-4 flex items-center">
            <div>
              <CheckButton
                size="lg"
                isChecked={agreement.all}
                onClick={() => handleAgreementChange('all')}
              />
            </div>
            <span className="ml-1.5 text-black-600">전체 동의</span>
          </div>
          <div className="mt-2 h-[1px] w-full bg-gray-300"></div>

          <div className="mt-2 space-y-0.5">
            {['terms1', 'terms2', 'terms3', 'marketing'].map((field, index) => {
              ;<div key={field} className="flex items-center justify-between">
                <div
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    handleAgreementChange(field as keyof typeof agreement)
                  }
                >
                  <CheckButton
                    size="lg"
                    isChecked={agreement[field as keyof typeof agreement]}
                    onClick={() =>
                      handleAgreementChange(field as keyof typeof agreement)
                    }
                  />
                  <span className="ml-1.5 text-black-600">
                    {index < 3 ? '[필수]' : '[선택]'} {termsTitles[index]}
                  </span>
                </div>
                <button
                  onClick={() =>
                    openModal(
                      modalContents[index].title,
                      modalContents[index].content
                    )
                  }
                  className="text-gray-600"
                >
                  &gt;
                </button>
              </div>

              return (
                <div key={field} className="flex items-center justify-between">
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={() =>
                      handleAgreementChange(field as keyof typeof agreement)
                    }
                  >
                    <CheckButton
                      size="lg"
                      isChecked={agreement.all}
                      onClick={() =>
                        handleAgreementChange(field as keyof typeof agreement)
                      }
                    />
                    <span className="ml-1.5 text-black-600">
                      {index < 3 ? '[필수]' : '[선택]'} {termsTitles[index]}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      openModal(
                        modalContents[index].title,
                        modalContents[index].content
                      )
                    }
                    className="text-gray-600"
                  >
                    &gt;
                  </button>
                </div>
              )
            })}
          </div>

          <Button
            className="mt-4 w-full"
            variant={isNextButtonEnabled ? 'primary' : 'disabled'}
            size="lg"
            disabled={!isNextButtonEnabled}
            onClick={() => setStep(2)}
          >
            다음
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 w-[440px] rounded-lg bg-white p-6 shadow-md">
          <StepIndicator currentStep={step} />
          <div className="space-y-4">
            {/* 아이디 입력과 중복확인 버튼 */}
            <div className="flex items-center space-x-2">
              <InputField
                type="simple"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <Button
                className="w-[100px]"
                variant="primary"
                size="md"
                onClick={handleIdValidation}
              >
                중복 확인
              </Button>
            </div>
            {idValidationMessage && (
              <p
                className={`mt-2 text-sm ${
                  idValidationMessage === '사용 가능한 아이디입니다.'
                    ? 'text-blue-500'
                    : 'text-red-500'
                }`}
              >
                {idValidationMessage}
              </p>
            )}

            {/* 비밀번호 입력 필드 */}
            <div className="space-y-3">
              <InputField
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <Link href="/welcome">
            {/* 회원가입 버튼 */}
            <Button
              className="mt-4 w-full"
              variant="primary"
              size="lg"
              onClick={() => console.log(`회원가입`)}
            >
              가입하기
            </Button>
          </Link>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold">{modalContent.title}</h2>
          <p className="mt-4 text-sm">{modalContent.content}</p>
        </Modal>
      )}
    </div>
  )
}

export default Join
