'use client'

import { useMutation } from '@tanstack/react-query'
import { sendAuthCode } from '@tookscan/api'
import { Button, Confirm, InputField } from '@tookscan/components'
import { useModal } from '@tookscan/hooks'
import { useEffect, useState } from 'react'

const FindIdPage = () => {
  const [formValues, setFormValues] = useState({
    phone: '',
    username: '',
    verificationCode: '',
  })

  const [timeLeft, setTimeLeft] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const { openModal } = useModal()
  const { data, mutate: sendAuth } = useMutation({
    mutationKey: ['verifyAuthCode'],
    mutationFn: (formValues: { username: string; phone: string }) =>
      sendAuthCode(formValues.username, formValues.phone),
    onSuccess: (data) => {
      setTimeLeft(90)
      console.log(data)
    },
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

  const handleFindId = () => {
    // if (!isVerified) return
    openModal(
      <>
        <Confirm title="회원님의 아이디를 확인해 주세요">adsf</Confirm>
      </>
    )
  }

  return (
    <>
      {/* 입력 필드 */}
      <div className="mt-4 space-y-4">
        <InputField
          type="simple"
          placeholder="이름"
          value={formValues.username}
          onChange={(e) =>
            setFormValues({ ...formValues, username: e.target.value })
          }
        />
        <div className="flex items-center space-x-2">
          <InputField
            type="simple"
            placeholder="전화번호"
            value={formValues.phone}
            onChange={(e) =>
              setFormValues({ ...formValues, phone: e.target.value })
            }
          />
          <Button
            variant="primary"
            size="md"
            disabled={!formValues.username || !formValues.phone}
            onClick={() => {
              sendAuth(formValues)
            }}
          >
            인증 받기
          </Button>
        </div>
        {timeLeft > 0 && (
          <div className="mt-4 flex items-center space-x-2">
            <InputField
              type="simple"
              placeholder="인증번호 입력"
              value={formValues.verificationCode}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  verificationCode: e.target.value,
                })
              }
              suffix={timeLeft > 0 ? formatTime(timeLeft) : '시간 초과'}
            />
          </div>
        )}
      </div>
      <Button
        className="mt-4 w-full"
        variant={isVerified ? 'primary' : 'disabled'}
        size="md"
        onClick={handleFindId}
        disabled={
          !isVerified ||
          !formValues.username ||
          !formValues.phone ||
          !formValues.verificationCode ||
          timeLeft <= 0
        }
      >
        아이디찾기
      </Button>
    </>
  )
}

export default FindIdPage
