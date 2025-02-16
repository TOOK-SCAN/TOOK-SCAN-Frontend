'use server'

import { LoginForm } from './_components/LoginForm'

const LoginPage = () => {
  return (
    <div>
      {/* 타이틀 영역 */}
      <header className="w-full max-w-[30rem] p-8 text-left">
        <h2 className="text-lg font-bold text-blue-primary">
          툭스캔과 함께해요!
        </h2>
        <h1 className="mt-2 font-bold leading-tight text-black-800 title2">
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
