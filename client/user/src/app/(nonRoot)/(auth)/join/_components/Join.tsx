'use client'

import { useEffect } from 'react'
import { useJoinHandlers, useJoinStore } from '../JoinStore'
import StepOneUI from '../Step/StepOne'
import StepTwoUI from '../Step/StepTwo'
import Modal from './Modal'

const Join = () => {
  const {
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
    modal,
    setModal,
    isValidating,
    setIsValidating,
  } = useJoinStore()

  const handlers = useJoinHandlers({
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
    modal,
    setModal,
    isValidating,
    setIsValidating,
  })

  // 인증 타이머 효과
  useEffect(() => {
    if (verificationState.timeLeft <= 0) {
      setVerificationState((prev) => ({
        ...prev,
        verificationCode: '',
        isVerified: false,
        isSendingAuthCode: false,
      }))
      return
    }
    const timer = setInterval(() => {
      setVerificationState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }))
    }, 1000)
    return () => clearInterval(timer)
  }, [verificationState.timeLeft, setVerificationState])

  // const idValidationMessage = ''
  const idValidationMessage = stepState.id ? '' : '아이디를 입력해주세요.'

  return (
    <div className="mb-12 flex w-full flex-col items-center">
      <div className="mx-auto mt-10 w-full max-w-[25rem] px-4 text-left">
        <div className="btn1 font-bold text-blue-primary">회원가입</div>
        <div className="title2 mt-2 font-bold leading-tight text-black-800">
          툭스캔과 함께해요!
        </div>
      </div>
      <div className="w-full max-w-[30rem] px-4">
        {step === 1 ? (
          <StepOneUI
            stepState={stepState}
            verificationState={verificationState}
            agreement={agreement}
            handlers={handlers}
            setStep={setStep}
          />
        ) : (
          <StepTwoUI
            stepState={stepState}
            handlers={handlers}
            idValidationMessage={idValidationMessage}
            isValidating={isValidating}
          />
        )}
      </div>
      {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          onClose={() => setModal({ ...modal, isOpen: false })}
        >
          <h2 className="text-lg font-bold">{modal.content.title}</h2>
          <p className="mt-4 text-sm">{modal.content.content}</p>
        </Modal>
      )}
    </div>
  )
}

export default Join
