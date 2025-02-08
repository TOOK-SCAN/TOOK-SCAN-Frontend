import { TypeToggle } from '@/app/(nonRoot)/(auth)/(find)/_components/TypeToggle'
import type { LayoutProps } from '@/types'
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center py-12">
      {/* 타이틀 */}
      <div className="w-full py-12 text-left">
        <div className="text-lg font-bold text-blue-primary">회원정보 찾기</div>
        <div className="text-3xl font-bold leading-tight text-black-800">
          <p>계정정보를</p>
          <p>잊으셨나요?</p>
        </div>
      </div>

      {/* 상자 */}
      <div className="mt-6 flex flex-col gap-8 rounded-2xl bg-white px-12 pb-12 pt-6">
        <TypeToggle />
        {children}
      </div>
    </div>
  )
}

export default Layout
