'use client'

import { Button } from '@tookscan/components/ui/Button'
import { InputField } from '@tookscan/components/ui/InputField'
import StepIndicator from '../_components/StepIndicator'

interface StepTwoUIProps {
  stepState: { id: string; password: string; confirmPassword: string }
  handlers: {
    handleIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleConfirmPasswordChange: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void
    handleIdValidation: () => Promise<void>
    handleSignUp: () => Promise<void>
  }
  idValidationMessage: string
  isValidating: boolean
}

const StepTwoUI = ({
  stepState,
  handlers,
  idValidationMessage,
  isValidating,
}: StepTwoUIProps) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
  const isPasswordValid =
    stepState.password.length > 0
      ? passwordRegex.test(stepState.password)
      : undefined
  return (
    <div className="mt-6 w-[440px] rounded-lg bg-white p-6 shadow-md">
      <StepIndicator currentStep={2} />
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <InputField
            type="simple"
            placeholder="아이디"
            value={stepState.id}
            onChange={handlers.handleIdChange}
            aria-label="아이디 입력"
            aria-describedby="id-validation-message"
          />
          <Button
            variant="primary"
            size="md"
            className="w-[100px]"
            onClick={handlers.handleIdValidation}
            disabled={
              isValidating || idValidationMessage == '사용 가능한 아이디입니다.'
            }
          >
            {isValidating ? '확인 중...' : '중복 확인'}
          </Button>
        </div>
        {idValidationMessage && (
          <p
            id="id-validation-message"
            className={`mt-2 text-sm ${idValidationMessage === '사용 가능한 아이디입니다.' ? 'text-blue-500' : 'text-red-500'}`}
          >
            {idValidationMessage}
          </p>
        )}
        <div className="space-y-3">
          <InputField
            type="password"
            placeholder="비밀번호 (8글자 이상 20자 이하, 영어 대소문자, 숫자, 특수문자 중 3가지 이상 사용)"
            value={stepState.password}
            onChange={handlers.handlePasswordChange}
            isSuccess={isPasswordValid}
          />
          <InputField
            type="password"
            placeholder="비밀번호 확인"
            value={stepState.confirmPassword}
            onChange={handlers.handleConfirmPasswordChange}
          />
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        className="mt-4 w-full"
        onClick={handlers.handleSignUp}
        disabled={
          !stepState.id ||
          !stepState.password ||
          !stepState.confirmPassword ||
          stepState.password !== stepState.confirmPassword ||
          idValidationMessage !== '사용 가능한 아이디입니다.'
        }
      >
        가입하기
      </Button>
    </div>
  )
}

export default StepTwoUI
