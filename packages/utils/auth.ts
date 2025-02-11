import { userInfo } from '../api'
import { AccountType } from '../types'

export type AuthInfo = {
  isLogin: boolean
  username: string
  accountType: AccountType
}

export const auth = async (): Promise<AuthInfo> => {
  const data = await userInfo()

  return {
    isLogin: Boolean(
      data?.success && !data?.error && data?.data?.account_type !== 'GUEST'
    ),
    username: data?.data?.name || '',
    accountType: data?.data?.account_type || 'GUEST',
  }
}
