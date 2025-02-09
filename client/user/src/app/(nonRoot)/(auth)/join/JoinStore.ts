'use client'

import { signUpDefault, signUpIDCheck } from '@/api'
import { sendAuthCode, verifyAuthCode } from '@tookscan/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useJoinStore = () => {
  const [step, setStep] = useState<number>(1)

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
  const [agreement, setAgreement] = useState({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
    marketing: false,
  })

  const [modal, setModal] = useState({
    isOpen: false,
    content: { title: '', content: '' },
  })

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
    modal,
    setModal,
    idValidationMessage,
    setIdValidationMessage,
    isValidating,
    setIsValidating,
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
  agreement: {
    all: boolean
    terms1: boolean
    terms2: boolean
    terms3: boolean
    marketing: boolean
  }
  setAgreement: React.Dispatch<
    React.SetStateAction<{
      all: boolean
      terms1: boolean
      terms2: boolean
      terms3: boolean
      marketing: boolean
    }>
  >
  modal: { isOpen: boolean; content: { title: string; content: string } }
  setModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean
      content: { title: string; content: string }
    }>
  >
  isValidating: boolean
  setIsValidating: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()

  const openModal = (title: string, content: string) => {
    store.setModal({ isOpen: true, content: { title, content } })
  }

  return {
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
          timeLeft: 300,
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
        openModal('인증 실패', errorMessage)
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
        store.setVerificationState((prev) => ({
          ...prev,
          isVerified: true,
          canEditPhone: false,
          verificationMessage: '인증되었습니다.',
        }))
      } catch (error) {
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

    // 약관
    handleAgreementChange: (field: keyof typeof store.agreement | 'all') => {
      store.setAgreement((prev) => {
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
          const updated = { ...prev, [field]: !prev[field] }
          updated.all =
            updated.terms1 &&
            updated.terms2 &&
            updated.terms3 &&
            updated.marketing
          return updated
        }
      })
    },

    // 아이디 중복 확인
    handleIdValidation: async () => {
      store.setIsValidating(true)
      if (!store.stepState.id.trim()) {
        openModal('에러', '아이디를 입력하세요.')
        store.setIsValidating(false)
        return
      }
      try {
        const response = await signUpIDCheck(store.stepState.id)
        if (!response.data.is_valid) {
          openModal('에러', '이미 사용 중인 아이디입니다.')
        } else {
          openModal('확인', '사용 가능한 아이디입니다.')
        }
      } catch (error) {
        openModal('에러', '아이디 중복 확인에 실패했습니다.')
      } finally {
        store.setIsValidating(false)
      }
    },

    // 회원가입
    handleSignUp: async () => {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
      if (!passwordRegex.test(store.stepState.password)) {
        openModal(
          '비밀번호 오류',
          '비밀번호는 8자 이상, 20자 이하이며, 영문, 숫자, 특수문자를 포함해야 합니다.'
        )
        return
      }
      if (store.stepState.password !== store.stepState.confirmPassword) {
        openModal('비밀번호 오류', '비밀번호와 확인이 일치하지 않습니다.')
        return
      }
      try {
        await signUpDefault({
          name: store.stepState.name,
          serial_id: store.stepState.id,
          password: store.stepState.password,
          phone_number: store.stepState.phone,
          marketing_allowed: store.agreement.marketing,
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
        openModal('회원가입 실패', errorMessage)
      }
    },
    openModal,
  }
}
