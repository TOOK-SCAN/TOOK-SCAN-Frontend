'use client'
import OnboardingBook from '@/assets/images/OnboardingBook.svg'
import { Button } from '@tookscan/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import OnboardingBackground from './OnboardingBackground'

const Onboarding = () => {
  const router = useRouter()

  return (
    <div className="relative inset-0 h-screen w-full">
      <OnboardingBackground />
      <div className="fixed inset-0 z-10 flex flex-col justify-center gap-6 px-[5rem] lg:px-[12rem]">
        <div className="flex flex-row gap-[5rem]">
          <div className="flex h-full flex-col justify-center">
            <h2 className="mb-[1.5rem] text-start font-semibold text-blue-primary title2">
              간편한 툭스캔과 함께 신청서를 작성해볼까요?
            </h2>
            <p className="max-w-md text-start text-gray-500 btn1">
              회원가입과 로그인을 통해 몇 가지 정보를 입력하시면, <br />
              더욱 편리하게 서비스를 이용하고 조회하실 수 있습니다.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={OnboardingBook}
              alt="Onboarding Book"
              width={180}
              height={180}
            />

            <Button
              variant="primary"
              size="md"
              className="mb-[1rem] mt-[4.5rem] w-64"
              onClick={() => router.push('/login')}
            >
              로그인
            </Button>
            <Button
              variant="tertiary"
              size="md"
              className="w-64"
              onClick={() => router.push('/apply')}
            >
              비회원으로 계속하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
