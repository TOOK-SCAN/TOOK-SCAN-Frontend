'use client'

import { Button } from '@tookscan/components'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import scanLoadingImage from '../../../../assets/images/scanLoading.svg'
import scanAnimation from '../../../../assets/Loading.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const ScanLoadingPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <h2 className="font-bold text-blue-primary title2">
        스캔이 시작되었어요!
      </h2>
      <p className="mb-[2rem] mt-2 text-gray-500 btn1">
        스캔 작업이 완료되면 알려드릴게요 :)
      </p>
      <div className="w-full max-w-[55rem] rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mt-6 flex flex-col items-center">
          <Image
            src={scanLoadingImage}
            alt="스캔 중"
            width={280}
            height={260}
          />
          <Lottie
            animationData={scanAnimation}
            className="mt-[3rem] h-[4rem] w-[4rem]"
          />
          <p className="mt-4 text-blue-primary btn1">스캔 중이에요.</p>
        </div>

        <p className="mt-4 text-gray-400 caption1">
          *후처리 및 보정 작업으로 인해 영업일 기준 1~3일 소요될 수 있습니다.
          <br />
          <br />
          *작업이 완료되면 카카오톡으로 알림을 보내드립니다.
        </p>
      </div>
      <div className="mt-8 flex w-full max-w-[30rem] flex-col items-center space-y-4">
        <Link href="/profile" className="w-full">
          <Button className="w-full" variant="primary" size="md">
            마이페이지
          </Button>
        </Link>
        <Link href="/" className="w-full">
          <Button className="w-full" variant="primary" size="md">
            홈으로
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ScanLoadingPage
