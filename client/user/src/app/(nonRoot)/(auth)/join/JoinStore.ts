'use client'

import { signUpDefault, signUpIDCheck } from '@/api'
import { sendAuthCode, verifyAuthCode } from '@tookscan/api'
import { useModal } from '@tookscan/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export const useJoinStore = () => {
  const [step, setStep] = useState<number>(1)
  const { openModal, closeModal } = useModal()

  // 회원가입 상태
  const [stepState, setStepState] = useState({
    name: '',
    phone: '',
    id: '',
    password: '',
    confirmPassword: '',
  })

  // 인증 객체
  const [verificationState, setVerificationState] = useState({
    isVerified: false,
    verificationCode: '',
    timeLeft: 90,
    isSendingAuthCode: false,
    isVerifyingAuth: false,
    verificationMessage: '',
    canEditPhone: true,
  })

  // 약관 상태
  const [agreement, setAgreement] = useState<{ [termId: number]: boolean }>({})
  const [adAgreement, setAdAgreement] = useState(false)
  const [emailConsent, setEmailConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)

  const [idValidationMessage, setIdValidationMessage] = useState<string>('')
  const [isValidating, setIsValidating] = useState<boolean>(false)

  return {
    step,
    setStep,
    stepState,
    setStepState,
    verificationState,
    setVerificationState,
    agreement,
    setAgreement,
    adAgreement,
    setAdAgreement,
    emailConsent,
    setEmailConsent,
    smsConsent,
    setSmsConsent,
    idValidationMessage,
    setIdValidationMessage,
    isValidating,
    setIsValidating,
    openModal,
    closeModal,
  }
}

export const useJoinHandlers = (store: {
  stepState: {
    name: string
    phone: string
    id: string
    password: string
    confirmPassword: string
  }
  setStepState: React.Dispatch<
    React.SetStateAction<{
      name: string
      phone: string
      id: string
      password: string
      confirmPassword: string
    }>
  >
  verificationState: {
    isVerified: boolean
    verificationCode: string
    timeLeft: number
    isSendingAuthCode: boolean
    isVerifyingAuth: boolean
    verificationMessage: string
    canEditPhone: boolean
  }
  setVerificationState: React.Dispatch<
    React.SetStateAction<{
      isVerified: boolean
      verificationCode: string
      timeLeft: number
      isSendingAuthCode: boolean
      isVerifyingAuth: boolean
      verificationMessage: string
      canEditPhone: boolean
    }>
  >
  agreement: { [termId: number]: boolean }
  setAgreement: React.Dispatch<
    React.SetStateAction<{ [termId: number]: boolean }>
  >

  adAgreement: boolean
  setAdAgreement: React.Dispatch<React.SetStateAction<boolean>>
  emailConsent: boolean
  setEmailConsent: React.Dispatch<React.SetStateAction<boolean>>
  smsConsent: boolean
  setSmsConsent: React.Dispatch<React.SetStateAction<boolean>>
  isValidating: boolean
  setIsValidating: React.Dispatch<React.SetStateAction<boolean>>
  openModal: (title: string, content: string) => void
  closeModal: () => void
}) => {
  const router = useRouter()
  const handleAllAgreementChange = (value?: boolean) => {
    const newValue =
      value ?? !(store.adAgreement && store.emailConsent && store.smsConsent)

    store.setAdAgreement(newValue)
    store.setEmailConsent(newValue)
    store.setSmsConsent(newValue)

    Object.keys(store.agreement).forEach((termId) => {
      store.setAgreement((prev) => ({
        ...prev,
        [Number(termId)]: newValue,
      }))
    })
  }

  return {
    handleAdAgreementChange: (value?: boolean) => {
      const newAdAgreement = value ?? !store.adAgreement
      store.setAdAgreement(newAdAgreement)

      if (newAdAgreement) {
        store.setEmailConsent(true)
        store.setSmsConsent(true)
      } else {
        store.setEmailConsent(false)
        store.setSmsConsent(false)
      }
    },

    handleConsentChange: (type: 'email' | 'sms') => {
      if (type === 'email') {
        store.setEmailConsent((prev) => !prev)
      } else {
        store.setSmsConsent((prev) => !prev)
      }

      store.setAdAgreement(store.emailConsent || store.smsConsent)
    },

    // 인증요청 정보 변화 확인
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.setStepState((prev) => ({ ...prev, name: e.target.value }))
    },
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!store.verificationState.canEditPhone) return
      const rawValue = e.target.value.replace(/\D/g, '')
      if (rawValue.length > 11) return
      store.setStepState((prev) => ({ ...prev, phone: rawValue }))
      // 전화번호 변경 시 인증 상태 초기화
      store.setVerificationState((prev) => ({
        ...prev,
        isVerified: false,
        verificationCode: '',
        verificationMessage: '',
      }))
    },
    handleIdChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      if (value.length > 20) return

      store.setStepState((prev) => ({ ...prev, id: value }))
    },
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.setStepState((prev) => ({ ...prev, password: e.target.value }))
    },
    handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.setStepState((prev) => ({
        ...prev,
        confirmPassword: e.target.value,
      }))
    },

    // 인증받기 버튼 활성화
    handleVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (store.verificationState.isVerified) return
      const rawValue = e.target.value.replace(/\D/g, '')
      if (rawValue.length > 6) return
      store.setVerificationState((prev) => ({
        ...prev,
        verificationCode: rawValue,
      }))
    },
    // 인증 요청
    handleSendAuthCode: async () => {
      if (store.verificationState.isSendingAuthCode) return
      store.setVerificationState((prev) => ({
        ...prev,
        isSendingAuthCode: true,
      }))
      try {
        await sendAuthCode(store.stepState.name, store.stepState.phone)
        store.setVerificationState((prev) => ({
          ...prev,
          timeLeft: 90,
          verificationMessage: '',
        }))
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '인증 코드를 보내는 데 실패했습니다.'
        store.setVerificationState((prev) => ({
          ...prev,
          isSendingAuthCode: false,
          verificationMessage: errorMessage,
        }))
        store.openModal('인증 실패', errorMessage)
      }
    },
    // 인증 확인
    handleVerifyAuthCode: async () => {
      if (store.verificationState.isVerifyingAuth) return
      store.setVerificationState((prev) => ({ ...prev, isVerifyingAuth: true }))

      try {
        await verifyAuthCode(
          store.stepState.phone,
          store.verificationState.verificationCode
        )

        store.openModal('인증 성공', '휴대폰 인증이 완료되었습니다.')

        store.setVerificationState((prev) => ({
          ...prev,
          isVerified: true,
          canEditPhone: false,
          verificationMessage: '인증되었습니다.',
        }))
      } catch (error) {
        store.openModal(
          '인증 실패',
          '인증번호가 올바르지 않습니다. 다시 입력해 주세요.'
        )

        store.setVerificationState((prev) => ({
          ...prev,
          verificationMessage: '인증번호가 올바르지 않습니다.',
        }))
      } finally {
        store.setVerificationState((prev) => ({
          ...prev,
          isVerifyingAuth: false,
        }))
      }
    },
    openModal: store.openModal,
    closeModal: store.closeModal,

    // 약관
    handleAgreementChange: (termId: number, value?: boolean) => {
      store.setAgreement((prev) => ({
        ...prev,
        [termId]: value !== undefined ? value : !prev[termId],
      }))
    },

    // 아이디 중복 확인
    handleIdValidation: async (): Promise<boolean> => {
      store.setIsValidating(true)

      if (!store.stepState.id.trim()) {
        store.openModal('에러', '아이디를 입력하세요.')
        store.setIsValidating(false)
        return false
      }

      try {
        const response = await signUpIDCheck(store.stepState.id)

        console.log('ID 중복 검사 응답:', response)

        store.setIsValidating(false)

        if (response.data?.is_valid) {
          store.openModal('확인', '사용 가능한 아이디입니다.')
          return true
        } else {
          store.openModal('에러', '이미 사용 중인 아이디입니다.')
          return false
        }
      } catch (error) {
        console.error('아이디 중복 확인 에러:', error)
        store.openModal('에러', '아이디 중복 확인에 실패했습니다.')
        store.setIsValidating(false)
        return false
      }
    },
    handleAllAgreementChange,

    // 회원가입
    handleSignUp: async () => {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
      if (!passwordRegex.test(store.stepState.password)) {
        store.openModal(
          '비밀번호 오류',
          '비밀번호는 8자 이상, 20자 이하이며, 영문, 숫자, 특수문자를 포함해야 합니다.'
        )
        return
      }
      if (store.stepState.password !== store.stepState.confirmPassword) {
        store.openModal('비밀번호 오류', '비밀번호와 확인이 일치하지 않습니다.')
        return
      }
      try {
        await signUpDefault({
          name: store.stepState.name,
          serial_id: store.stepState.id,
          password: store.stepState.password,
          marketing_allowed: store.adAgreement,
          phone_number: store.stepState.phone,
          is_receive_email: store.emailConsent,
          is_receive_sms: store.smsConsent,
        })
        router.push('/welcome')
      } catch (error: unknown) {
        let errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.'

        if (typeof error === 'object' && error !== null) {
          const err = error as {
            error?: { message?: string }
            message?: string
          }
          errorMessage = err.error?.message || err.message || errorMessage
        }
        store.openModal('회원가입 실패', errorMessage)
      }
    },
  }
}
