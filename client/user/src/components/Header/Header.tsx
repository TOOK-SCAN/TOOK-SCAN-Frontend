'use client'

import type { AccountType } from '@tookscan/hooks'
import { ClientHeader } from './ClientHeader'

export type AuthResult = {
  isLogin: boolean
  username: string
  accountType: AccountType
}

export const Header = () => {
  // return <ClientHeader initialAuth={authInfo} /> // TODO: 성능 개선을 위해 auth 함수로 대체
  return <ClientHeader />
}
