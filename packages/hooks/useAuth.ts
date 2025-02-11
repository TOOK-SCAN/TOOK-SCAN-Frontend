import { UserInfoRes } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<UserInfoRes>({
    queryKey: ['auth'],
    queryFn: userInfo,
  })

  const isLogin = Boolean(
    data?.data && !error && data.data.account_type !== 'GUEST'
  )

  const refetchAuth = () => {
    queryClient.invalidateQueries({
      queryKey: ['auth'],
    })
  }

  return {
    isLogin,
    username: data?.data.name || 'USER',
    accountType: data?.data.account_type || 'GUEST',
    refetchAuth,
    isLoading,
    error,
  }
}
