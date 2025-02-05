/**
 * @deprecated 이 함수는 더 이상 사용되지 않습니다. 대신 useAuth 훅을 사용해주세요.
 *
 * 참고: useAuth를 사용하여 서버 컴포넌트를 클라이언트 컴포넌트로 변경해야 하는 경우,
 * TODO 주석으로 표시해 주세요.
 */

import { userInfo } from '../api'

export const auth = async () => {
  const data = await userInfo()
  const isLogin: boolean = Boolean(data && data.success && !data.error)

  return {
    isLogin,
    username: data && data.data ? data.data.name : '',
    accountType: data && data.data ? data.data.account_type : 'USER',
  }
}
