'use client'

import { Icon } from '@tookscan/components/ui'

const MaintenancePage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <Icon
        id="logo"
        width={300}
        height={132}
        className="mb-6 text-blue-primary"
      />

      <h1 className="text-4xl font-bold text-gray-800">서버 점검 중입니다</h1>
      <p className="mt-4 text-lg text-gray-600">
        현재 점검이 진행 중입니다. <br />
        보다 나은 서비스를 제공하기 위해 노력하고 있습니다.
      </p>
      <p className="text-md mt-2 text-gray-500">잠시 후 다시 접속해주세요.</p>
    </div>
  )
}

export default MaintenancePage
