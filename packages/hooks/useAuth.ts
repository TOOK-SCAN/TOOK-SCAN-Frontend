import { UserInfoRes } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { userInfo } from '../api'

export type AccountType = 'USER' | 'ADMIN' | 'GUEST'

export interface AuthState {
  isLogin: boolean
  username: string
  accountType: AccountType
  isLoading: boolean
  error: unknown
}

export const useAuth = () => {
  const { data, isLoading, error } = useQuery<UserInfoRes>({
    queryKey: ['auth'],
    queryFn: async () => {
      const data = await userInfo()
      return data
    },
  })

  const isLogin = data?.data.account_type !== 'GUEST'

  return {
    isLogin,
    username: data?.data.name || 'null',
    accountType: data?.data.account_type || 'GUEST',
    isLoading,
    error,
  }
}
