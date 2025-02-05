// TODO : 사용하지 마세요, useAuth를 대신 사용하세요.
// 그리고 useAuth 사용때문에 server 컴포넌트를 client컴포넌트로 사용해야한다면 TODO로 남겨놓으세요.

import { userInfo } from '../api'

export const auth = async () => {
  const data = await userInfo()
  const isLogin: boolean = data?.success && !data.error

  return {
    isLogin,
    username: data?.data.name || '',
    accountType: data?.data.account_type || 'USER',
  }
}
