'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'

interface AutoRedirectProps {
  to: string
}

export function AutoRedirect({ to }: AutoRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [to])

  return <></>
}
