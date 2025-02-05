'use client'

import GoogleIcon from '@/assets/images/signup/Google.svg'
import KakaoIcon from '@/assets/images/signup/Kakao.svg'
import Image from 'next/image'

const SocialLogin = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* 카카오 로그인 버튼 */}
      <button className="w-full" onClick={() => console.log('카카오 로그인')}>
        <Image
          src={KakaoIcon}
          alt="카카오 로그인"
          width={440}
          height={48}
          className="w-full"
        />
      </button>
      {/* 구글 로그인 버튼 */}
      <button className="w-full" onClick={() => console.log('구글 로그인')}>
        <Image
          src={GoogleIcon}
          alt="구글 로그인"
          width={440}
          height={48}
          className="w-full"
        />
      </button>
    </div>
  )
}

export default SocialLogin
