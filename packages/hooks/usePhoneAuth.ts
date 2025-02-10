import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { sendAuthCode, verifyAuthCode } from '../api'
import { useToast } from '../components'
import type { ErrorRes, SendAuthCodeRes, VerifyAuthCodeRes } from '../types'

export const usePhoneAuth = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    phone: '',
    verificationCode: '',
  })
  const [timeLeft, setTimeLeft] = useState(0)
  const showToast = useToast()

  // 인증번호 요청
  const { mutateAsync: sendAuth } = useMutation<SendAuthCodeRes, ErrorRes>({
    mutationKey: ['sendAuthCode'],
    mutationFn: () => sendAuthCode(formValues.username, formValues.phone),
    onSuccess: () => {
      setTimeLeft(90) // 타이머 시작
      setFormValues({ ...formValues, verificationCode: '' })
      showToast('인증번호가 발송되었습니다.', 'success', 'check')
      return true
    },
    onError: (err) => {
      showToast(err.error.message, 'error', 'warning-2')
      return false
    },
  })

  // 인증번호 확인
  const { mutateAsync: verifyAuth } = useMutation<VerifyAuthCodeRes, ErrorRes>({
    mutationKey: ['verifyAuthCode'],
    mutationFn: () =>
      verifyAuthCode(formValues.phone, formValues.verificationCode),
    onSuccess: (data) => {
      if (data.success) {
        showToast('인증이 완료되었습니다.', 'success', 'check')
        return true
      }
    },
    onError: (err) => {
      showToast(err.error.message, 'error', 'warning-2')
      return false
    },
  })

  // 타이머 관리
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

  return {
    formValues,
    setFormValues,
    sendAuth,
    verifyAuth,
    timeLeft,
    formatTime,
  }
}
