'use client'

import Modal from '@/app/_components/Modal'
import { Button } from '@tookscan/components/ui/Button'
import { InputField } from '@tookscan/components/ui/InputField'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const FindIdPage = () => {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalProps, setModalProps] = useState({
    type: 'message', // 기본 타입 설정
    content: '조회결과가 없습니다.', // 기본 메시지 설정
    icon: '',
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

  const handleVerificationCheck = () => {
    // 인증번호 확인 로직
    if (verificationCode === '111') {
      setIsVerified(true)
      alert('인증 성공')
    } else {
      setIsVerified(false)
      alert('인증번호가 올바르지 않습니다.')
    }
  }

  const handleFindId = () => {
    // 인증이 완료되지 않은 경우 버튼을 막음
    if (!isVerified) return

    // 모달 내용 세팅
    if (verificationCode === '111') {
      setModalProps({ type: 'input', content: 'nextjs', icon: '' })
    } else if (verificationCode === '222') {
      setModalProps({ type: 'external', content: '', icon: 'kakao' })
    } else if (verificationCode === '333') {
      setModalProps({ type: 'external', content: '', icon: 'google' })
    } else {
      setModalProps({
        type: 'message',
        content: '조회결과가 없습니다',
        icon: '',
      })
    }
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
          <div className="flex-1 border-b-2 border-blue-primary pb-2 text-center text-blue-primary">
            아이디찾기
          </div>
          <Link
            href="/password/reset"
            className="flex-1 border-b-2 border-gray-300 pb-2 text-center text-gray-400"
          >
            비밀번호찾기
          </Link>
        </div>
        {/* 입력 필드 */}
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
                {timeLeft > 0 ? formatTime(timeLeft) : '시간 초과'}
              </span>
              <Button
                className="w-[100px]"
                variant="primary"
                size="md"
                onClick={handleVerificationCheck}
                disabled={timeLeft <= 0}
              >
                인증완료
              </Button>
            </div>
          )}
        </div>
        {/* 아이디 찾기 버튼 */}
        <Button
          className="mt-4 w-full"
          variant={isVerified ? 'primary' : 'disabled'}
          size="md"
          onClick={handleFindId}
          disabled={!isVerified || !name || !phone || timeLeft <= 0}
        >
          아이디찾기
        </Button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <Modal
          type={modalProps.type as 'input' | 'message' | 'external'}
          content={modalProps.content}
          icon={modalProps.icon as 'kakao' | 'google'}
          title="회원님의 아이디를 확인해 주세요."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default FindIdPage
