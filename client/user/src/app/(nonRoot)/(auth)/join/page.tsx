'use client'

import { Button } from '@tookscan/components/ui/Button'
import { CheckButton } from '@tookscan/components/ui/CheckButton'
import { InputField } from '@tookscan/components/ui/InputField'
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
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [idValidationMessage, setIdValidationMessage] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', content: '' })

  // 모든 필수 조건이 충족되었는지 확인
  const allChecked = agreement.terms1 && agreement.terms2 && agreement.terms3
  const isNextButtonEnabled =
    name && phone && isVerified && allChecked && verificationCode

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showVerificationField && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [showVerificationField, timeLeft])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleAgreementChange = (field: keyof typeof agreement | 'all') => {
    if (field === 'all') {
      const newValue = !agreement.all
      setAgreement({
        all: newValue,
        terms1: newValue,
        terms2: newValue,
        terms3: newValue,
        marketing: newValue,
      })
    } else {
      setAgreement((prev) => ({
        ...prev,
        [field]: !prev[field],
        all:
          prev.terms1 &&
          prev.terms2 &&
          prev.terms3 &&
          field !== 'marketing' &&
          !prev[field],
      }))
    }
  }

  const handleVerification = () => {
    if (verificationCode === '123123') {
      setIsVerified(true)
      alert('인증 완료되었습니다.')
    } else {
      alert('인증 코드가 올바르지 않습니다.')
    }
  }

  const handleIdValidation = () => {
    if (id === '이미사용중') {
      setIdValidationMessage('이미 사용 중인 아이디입니다.')
    } else {
      setIdValidationMessage('사용 가능한 아이디입니다.')
    }
  }

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content })
    setIsModalOpen(true)
  }

  return (
    <div className="mb-12 flex flex-col items-center">
      <div className="mx-auto mt-10 w-full max-w-[30rem] text-left">
        <div className="text-xs font-bold text-blue-primary">회원가입</div>
        <div className="mt-2 text-lg font-bold leading-tight text-black-800">
          툭스캔과 함께해요!
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="mx-auto mt-6 w-full max-w-[30rem] rounded-lg bg-white p-6 shadow-md">
          <StepIndicator currentStep={step} />
          <div className="mt-4 space-y-4">
            <InputField
              type="simple"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex space-x-2">
              <InputField
                type="simple"
                placeholder="전화번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="px-3"
                variant="primary"
                size="default"
                onClick={() => setShowVerificationField(true)}
              >
                인증받기
              </Button>
            </div>
            {showVerificationField && (
              <div className="mt-4 flex items-center space-x-2">
                <InputField
                  type="simple"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <span className="px-4 text-xs text-red-500">
                  {timeLeft > 0 ? formatTime(timeLeft) : '시간 초과'}
                </span>
                <Button
                  className="px-3"
                  variant="primary"
                  size="md"
                  onClick={handleVerification}
                  disabled={timeLeft <= 0}
                >
                  인증완료
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center">
            <div>
              <CheckButton
                size="lg"
                isChecked={agreement.all}
                onClick={() => {
                  setAgreement((prev) => ({
                    ...prev,
                    all: !prev.all,
                  }))
                }}
              />
            </div>
            <span className="ml-1.5 text-black-600">전체 동의</span>
          </div>
          <div className="mt-2 h-[1px] w-full bg-gray-300"></div>

          <div className="mt-2 space-y-0.5">
            {['terms1', 'terms2', 'terms3', 'marketing'].map((field, index) => {
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
                      onClick={() => {
                        setAgreement((prev) => ({
                          ...prev,
                          all: !prev.all,
                        }))
                      }}
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
        <div className="mx-auto mt-6 w-full max-w-[30rem] rounded-lg bg-white p-6 shadow-md">
          <StepIndicator currentStep={step} />
          <div className="space-y-4">
            {/* 아이디 입력과 중복확인 버튼 */}
            <div className="flex items-center space-x-2">
              <InputField
                type="simple"
                placeholder="아이디 (영문, 숫자 조합)"
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
                placeholder="비밀번호 (8~20자, 영문 숫자 포함)"
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
