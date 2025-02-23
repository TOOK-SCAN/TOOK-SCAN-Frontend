'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const TypeToggle = () => {
  const pathname = usePathname()
  const ID_FIND = '/id/find'
  const PASSWORD_RESET = '/password/reset'
  const style = {
    basic: 'border-b-2 pb-2 text-center flex-1',
    active: 'border-blue-primary text-blue-primary',
    inactive: 'border-gray-300 text-gray-400',
  }

  return (
    <div className="body flex w-[23.75rem] max-w-full">
      <Link
        href={ID_FIND}
        className={clsx(
          style.basic,
          pathname.startsWith(ID_FIND) ? style.active : style.inactive
        )}
      >
        아이디 찾기
      </Link>
      <Link
        href="/password/reset"
        className={clsx(
          style.basic,
          pathname.startsWith(PASSWORD_RESET) ? style.active : style.inactive
        )}
      >
        비밀번호 초기화
      </Link>
    </div>
  )
}
