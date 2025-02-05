'use server'

import { LoginForm } from './_components/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex max-w-[1080px] flex-col items-center bg-blue-secondary py-2 pb-12">
      {/* 타이틀 영역 */}
      <header className="w-[440px] py-8 text-left">
        <h2 className="text-lg font-bold text-blue-primary">
          툭스캔과 함께해요!
        </h2>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-black-800">
          <span>툭스캔과 함께라면</span>
          <br />
          <span>간편해지는 나의 생활</span>
        </h1>
      </header>
      {/* 로그인 폼: 클라이언트 컴포넌트 */}
      <LoginForm />
    </div>
  )
}

export default LoginPage
