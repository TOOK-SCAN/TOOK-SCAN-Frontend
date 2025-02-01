import Script from 'next/script'
import React from 'react'

export const GoogleTagManagerNoScript = () => {
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

export const GoogleTagManager = () => {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

  if (!GTM_ID) {
    console.warn('Google Tag Manager ID가 설정되지 않았습니다.')
    return null
  }

  return (
    //   {/* Google Tag Manager */}
    <Script id="gtm-script" strategy="afterInteractive">
      {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
    </Script>
    //   {/* End Google Tag Manager */}
  )
}
