'use client'

import { CommonLayout } from '@/app/_components'
import { Icon } from '@tookscan/components/ui'

const NotFoundPage = () => {
  return (
    <CommonLayout>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <Icon
          id="logo"
          width={300}
          height={132}
          className="mb-6 text-blue-primary"
        />

        <h1 className="text-4xl font-bold text-gray-800">
          404 - 페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          요청하신 페이지가 존재하지 않습니다.
        </p>
      </div>
    </CommonLayout>
  )
}

export default NotFoundPage
