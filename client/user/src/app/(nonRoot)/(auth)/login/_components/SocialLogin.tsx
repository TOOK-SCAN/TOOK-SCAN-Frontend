'use client'

import GoogleIcon from '@/assets/images/signup/Google.svg'
import KakaoIcon from '@/assets/images/signup/Kakao.svg'
import Image from 'next/image'
import Link from 'next/link'

const SocialLogin = () => {
  const OAUTH_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization`
    : (() => {
        throw new Error('NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다.')
      })()

  return (
    <div className="mx-auto flex w-full max-w-[25rem] flex-col space-y-2">
      {/* 카카오 로그인 버튼 */}
      <Link className="w-full" href={`${OAUTH_BASE_URL}/kakao`}>
        <Image
          src={KakaoIcon}
          alt="카카오 로그인"
          width={440}
          height={48}
          className="w-full"
        />
      </Link>
      {/* 구글 로그인 버튼 */}
      <Link className="w-full" href={`${OAUTH_BASE_URL}/google`}>
        <Image
          src={GoogleIcon}
          alt="구글 로그인"
          width={440}
          height={48}
          className="w-full"
        />
      </Link>
    </div>
  )
}

export default SocialLogin
