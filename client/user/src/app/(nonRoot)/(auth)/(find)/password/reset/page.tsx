'use client'

import { SuccessField } from '@/app/(nonRoot)/(auth)/(find)/_components/SuccessField'
import { findPassword } from '@tookscan/api'
import { Button, Confirm, InputField } from '@tookscan/components'
import { useModal, usePhoneAuth } from '@tookscan/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const FindPwPage = () => {
  const [step, setStep] = useState(1)

  const {
    formValues,
    setFormValues,
    sendAuth,
    verifyAuth,
    timeLeft,
    formatTime,
  } = usePhoneAuth()
  const [serialId, setSerialId] = useState('')
  const { openModal, closeModal } = useModal()
  const router = useRouter()

  return (
    <>
      {/* 1단계: 아이디 입력 */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <InputField
            type="simple"
            placeholder="아이디"
            value={serialId}
            onChange={(e) => setSerialId(e.target.value)}
          />
          <Button
            className="w-full"
            variant="primary"
            size="md"
            onClick={() => setStep(2)} // 다음 단계로 이동
            disabled={!serialId}
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
              className="w-[120px]"
              variant="primary"
              size="md"
              onClick={() => sendAuth()}
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

          <div className="mt-6 flex justify-between gap-3">
            <Button
              className="flex-1"
              variant="secondary"
              size="md"
              onClick={() => setStep(1)}
            >
              이전
            </Button>
            <Button
              className="flex-1"
              variant="primary"
              size="md"
              onClick={() =>
                verifyAuth().then((res) => {
                  if (res.success) {
                    findPassword(serialId, formValues.phone)
                      .then((res) => {
                        if (res.success) {
                          openModal(
                            <Confirm title="회원님의 임시 비밀번호입니다.">
                              <div className="flex flex-col items-center gap-4">
                                <p className="flex w-full items-center justify-center body2">
                                  안전을 위해 비밀번호를 변경해 주세요
                                </p>
                                <SuccessField
                                  copyData={res.data.temporary_password}
                                />
                              </div>
                              <div className="flex w-full justify-center gap-3">
                                <Button
                                  className="flex-1"
                                  variant="secondary"
                                  size="md"
                                  onClick={closeModal}
                                >
                                  닫기
                                </Button>
                                <Button
                                  className="flex-1"
                                  variant="primary"
                                  size="md"
                                  onClick={() => {
                                    closeModal()
                                    router.push('/login')
                                  }}
                                >
                                  로그인
                                </Button>
                              </div>
                            </Confirm>
                          )
                        }
                      })
                      .catch((err) => {
                        openModal(
                          <Confirm title="비밀번호 찾기 실패">
                            <p className="flex body2">{err.error.message}</p>
                            <div className="flex w-full gap-3">
                              <Button
                                variant="secondary"
                                size="md"
                                onClick={closeModal}
                                className="flex-1"
                              >
                                닫기
                              </Button>
                              <Button
                                variant="primary"
                                size="md"
                                onClick={() => {
                                  closeModal()
                                  router.push('/join')
                                }}
                                className="flex-1"
                              >
                                회원가입
                              </Button>
                            </div>
                          </Confirm>
                        )
                      })
                  }
                })
              }
              disabled={
                !formValues.username ||
                !formValues.phone ||
                !formValues.verificationCode
              }
            >
              비밀번호찾기
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default FindPwPage
