import { Button } from '@tookscan/components'
import scanLoadingImage from '../../../../assets/images/scanLoading.svg'

const ScanLoadingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="text-xl font-bold text-blue-600">
          스캔이 시작되었어요!
        </h2>
        <p className="mt-2 text-gray-500">
          스캔 작업이 완료되면 알려드릴게요 :)
        </p>

        <div className="mt-6 flex flex-col items-center">
          <img src={scanLoadingImage} alt="스캔 중" className="h-40 w-40" />
          <p className="mt-4 text-blue-500">스캔 중이에요.</p>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          *추처리 및 보정 작업으로 인해 영업일 기준 1~3일 소요될 수 있습니다.
          <br />
          *작업이 완료되면 카카오톡으로 알림을 보내드립니다.
        </p>
      </div>
      <div className="mt-6 space-y-2">
        <Button className="w-full" variant="primary" size="md">
          마이페이지
        </Button>
        <Button className="w-full" variant="primary" size="md">
          홈으로
        </Button>
      </div>
    </div>
  )
}

export default ScanLoadingPage
