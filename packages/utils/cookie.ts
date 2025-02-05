/**
 * 쿠키를 설정합니다.
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param days (선택) 만료일 (일 단위). 지정하지 않으면 세션 쿠키가 됩니다.
 */
export const setCookie = (name: string, value: string, days?: number): void => {
  const encodedName = encodeURIComponent(name)
  const encodedValue = encodeURIComponent(value)
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }
  document.cookie = `${encodedName}=${encodedValue}${expires}; path=/`
}

/**
 * 쿠키를 조회합니다.
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 쿠키가 없으면 null
 */
export const getCookie = (name: string): string | null => {
  const encodedName = encodeURIComponent(name) + '='
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim()
    if (trimmedCookie.indexOf(encodedName) === 0) {
      return decodeURIComponent(trimmedCookie.substring(encodedName.length))
    }
  }
  return null
}

/**
 * 쿠키의 값을 변경합니다.
 * @param name 쿠키 이름
 * @param value 새 쿠키 값
 */
export const editCookie = (name: string, value: string): void => {
  // 만료일을 설정하지 않으면 세션 쿠키로 변경됩니다.
  setCookie(name, value)
}

/**
 * 쿠키를 삭제합니다.
 * @param name 쿠키 이름
 */
export const deleteCookie = (name: string): void => {
  // 만료일을 과거로 설정하여 삭제합니다.
  setCookie(name, '', -1)
}

/**
 * 모든 쿠키를 삭제합니다.
 */
export const resetCookies = (): void => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=')
    const cookieName =
      eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
    deleteCookie(cookieName)
  }
}
