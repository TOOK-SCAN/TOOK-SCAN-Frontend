'use client'

import Modal from '@/app/_components/Modal'
import { Button } from '@tookscan/components/ui/Button'
import { InputField } from '@tookscan/components/ui/InputField'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const FindPwPage = () => {
  const [step, setStep] = useState(1) // 단계 상태
  const [id, setId] = useState('') // 1단계: 아이디 입력
  const [name, setName] = useState('') // 2단계: 이름 입력
  const [phone, setPhone] = useState('') // 2단계: 전화번호 입력
  const [verificationCode, setVerificationCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  ) // 인증 결과 표시
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState({
    type: 'input',
    content: '',
    icon: '',
    title: '회원님의 임시비밀번호 입니다.',
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleVerification = () => {
    if (verificationCode === '111') {
      setVerificationResult('인증되었습니다.')
      setIsVerified(true)
    } else {
      setVerificationResult('인증에 실패했습니다.')
      setIsVerified(false)
    }
  }

  const handleModal = () => {
    setModalProps({
      type: 'input',
      content: 'password',
      icon: '',
      title: '회원님의 임시비밀번호 입니다.',
    })
    setIsModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-3 py-12">
      {/* 타이틀 */}
      <div className="min-w-[440px] py-12 text-left">
        <div className="text-lg font-bold text-blue-primary">회원정보 찾기</div>
        <div className="text-3xl font-bold leading-tight text-black-800">
          <p>계정정보를</p>
          <p>잊으셨나요?</p>
        </div>
      </div>

      {/* 상자 */}
      <div className="mt-6 w-[440px] rounded-lg bg-white p-6 shadow-md">
        {/* 상단 탭 */}
        <div className="flex border-b">
          <Link
            href="/id/reset"
            className="flex-1 border-b-2 pb-2 text-center text-gray-400"
          >
            아이디찾기
          </Link>
          <div className="flex-1 border-b-2 border-blue-primary pb-2 text-center text-blue-primary">
            비밀번호찾기
          </div>
        </div>
        {/* 1단계: 아이디 입력 */}
        {step === 1 && (
          <div className="mt-4 space-y-4">
            <InputField
              type="simple"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Button
              className="mt-4 w-full"
              variant="primary"
              size="md"
              onClick={() => setStep(2)} // 다음 단계로 이동
              disabled={!id}
            >
              다음
            </Button>
          </div>
        )}
        {/* 2단계: 이름, 전화번호, 인증 */}
        {step === 2 && (
          <div className="mt-4 space-y-4">
            <InputField
              type="simple"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <InputField
                type="simple"
                placeholder="전화번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="w-[120px]"
                variant="primary"
                size="md"
                onClick={() => setTimeLeft(90)}
              >
                인증받기
              </Button>
            </div>
            {timeLeft > 0 && (
              <div className="mt-4 flex items-center space-x-2">
                <InputField
                  type="simple"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <span className="text-sm text-red-500">
                  {formatTime(timeLeft)}
                </span>
                <Button
                  className="w-[100px]"
                  variant="primary"
                  size="md"
                  onClick={handleVerification}
                  disabled={timeLeft <= 0}
                >
                  인증확인
                </Button>
              </div>
            )}
            {/* 인증 결과 표시 */}
            {verificationResult && (
              <div
                className={`mt-2 text-sm ${
                  isVerified ? 'text-blue-500' : 'text-red-500'
                }`}
              >
                {verificationResult}
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <Button
                className="w-[48%]"
                variant="secondary"
                size="md"
                onClick={() => setStep(1)}
              >
                이전
              </Button>
              <Button
                className="w-[48%]"
                variant={isVerified ? 'primary' : 'disabled'}
                size="md"
                onClick={handleModal}
                disabled={!name || !phone || !isVerified}
              >
                비밀번호찾기
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <Modal
          type={modalProps.type as 'input' | 'message' | 'external'}
          content={modalProps.content}
          icon={modalProps.icon as 'kakao' | 'google'}
          onClose={() => setIsModalOpen(false)}
          title={modalProps.title} // 타이틀 전달
        />
      )}
    </div>
  )
}

export default FindPwPage
