'use client'

import GoogleCircle from '@/assets/images/login/GoogleCircle.svg'
import KakaoCircle from '@/assets/images/login/KakaoCircle.svg'
import { useMutation } from '@tanstack/react-query'
import { findSerialId } from '@tookscan/api'
import {
  Button,
  Confirm,
  Icon,
  InputField,
  useToast,
} from '@tookscan/components'
import { useModal, usePhoneAuth } from '@tookscan/hooks'
import type { ErrorRes, FindSerialIdRes } from '@tookscan/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const FindIdPage = () => {
  const {
    formValues,
    setFormValues,
    sendAuth,
    verifyAuth,
    timeLeft,
    formatTime,
  } = usePhoneAuth()

  const { openModal, closeModal } = useModal()
  const showToast = useToast()
  const router = useRouter()

  // 아이디 찾기 post 요청
  const { mutate: findId } = useMutation<FindSerialIdRes, ErrorRes>({
    mutationKey: ['findId'],
    mutationFn: () => findSerialId(formValues.username, formValues.phone),
    onSuccess: (data) => {
      openModal(
        <>
          <Confirm title="회원님의 아이디를 확인해 주세요">
            <div className="flex flex-col gap-12">
              {data.data.provider === 'DEFAULT' ? (
                <div className="flex w-80 items-center justify-between rounded-2xl bg-blue-secondary px-6 py-4">
                  <div className="body2">{data.data.serial_id}</div>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(data.data.serial_id)
                        showToast(
                          '클립보드에 복사되었습니다.',
                          'success',
                          'check'
                        )
                      } catch (err) {
                        showToast(
                          '클립보드에 복사를 실패했습니다.: ' + err,
                          'error',
                          'warning-2'
                        )
                      }
                    }}
                  >
                    <Icon id="duplicate" width={20} height={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <Image
                    src={
                      data.data.provider === 'KAKAO'
                        ? KakaoCircle
                        : GoogleCircle
                    }
                    width={52}
                    height={52}
                    alt={''}
                  />
                  <p className="body2">
                    외부 SNS계정을 통해 가입된 사용자입니다
                  </p>
                </div>
              )}
              {data?.data.provider === 'DEFAULT' ? (
                <div className="flex w-full gap-3">
                  <Button
                    className="flex-1"
                    variant="secondary"
                    size="md"
                    onClick={closeModal}
                  >
                    닫기
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      closeModal()
                      router.push('/login')
                    }}
                    className="flex-1"
                  >
                    로그인
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={closeModal}
                  className="flex w-full"
                >
                  로그인
                </Button>
              )}
            </div>
          </Confirm>
        </>
      )
    },
    onError: (err) => {
      openModal(
        <>
          <Confirm title="아이디 찾기 실패">
            <div className="flex flex-col gap-4">
              <p className="flex body2">{err.error.message}</p>
              <Button
                variant="primary"
                size="md"
                onClick={closeModal}
                className="mt-3 flex w-full"
              >
                닫기
              </Button>
            </div>
          </Confirm>
        </>
      )
    },
  })

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
      </div>
      <Button
        className="mt-4 w-full"
        variant="primary"
        size="md"
        onClick={() => verifyAuth().then((res) => res.success && findId())}
        disabled={
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
