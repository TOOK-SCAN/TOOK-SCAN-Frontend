import React from 'react'

export const GoogleTagManager = () => {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

  if (!GTM_ID) {
    console.warn('Google Tag Manager ID가 설정되지 않았습니다.')
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      ></iframe>
    </noscript>
  )
}
