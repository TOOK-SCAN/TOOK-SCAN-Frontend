import { Icon, Banner } from '@tookscan/components'
import Head from 'next/head'

const Price = () => {
  return (
    <>
      <Head>
        <title>비대면 스캔 서비스 [툭스캔] – 가격안내</title>
        <meta
          name="description"
          content="빠르고 간편한 스캔 서비스, 툭스캔! 스캔 서비스의 투명한 가격정책과 높은 품질을 만나보세요."
        />
        <meta
          name="keywords"
          content="북스캔 가격, 북스캔 비용, 툭스캔 가격, 툭스캔 비용, 비대면 스캔 가격, 비대면 스캔 비용, 문서 스캔 가격, 문서 스캔 비용, OCR 스캔 서비스, 기업 스캔 솔루션, 대학교 스캔 가격, 대학교 스캔 비용, 대학교 스캔 가격, 대학교 북스캔 비용"
        />
      </Head>
      <div>
        <Banner type={3} />
        <div className="flex flex-col items-center justify-center bg-blue-secondary">
          <div className="mt-[6.25rem] flex h-auto w-[72rem] flex-col items-start justify-start py-[3.125rem] text-start">
            <h2 className="mb-2 text-[1.125rem] font-medium text-blue-primary">
              가격안내
            </h2>
            <h1 className="mb-6 text-[2rem] font-bold text-gray-800">
              스캔 상세안내
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-[6.25rem] flex h-auto w-[72rem] flex-col items-center justify-center rounded-lg bg-white p-[3.125rem]">
              <div className="mb-8 flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 rounded-full bg-black px-3 py-1 text-sm font-medium text-yellow-500">
                  <span> 🚨 업계 최저 가격 🚨 </span>
                </div>
                <h2 className="mb-[3.125rem] mt-4 text-[2rem] font-bold text-gray-800">
                  스캔 가격
                </h2>
                <p className="mb-6 text-[1.25rem] text-black">10원 / 1페이지</p>
                <div className="flex flex-col gap-4">
                  <div className="flex h-[3.125rem] w-[12.5rem] items-center justify-center rounded-[5rem] bg-blue-secondary px-4 py-2 text-blue-primary">
                    <Icon id="600dpi " className="mr-1 h-6 w-6" />
                    <span className="text-sm font-medium"> 600 DPI</span>
                  </div>
                  <div className="mb-[3.125rem] flex h-[3.125rem] w-[12.5rem] items-center justify-center rounded-[5rem] bg-blue-secondary px-4 py-2 text-blue-primary">
                    <Icon id="price " className="mr-1 h-6 w-6" />
                    <span className="text-sm font-medium"> 합리적인 가격 </span>
                  </div>
                </div>
              </div>
              <div className="w-[37.5rem] overflow-hidden rounded-lg">
                <table className="w-full border-collapse border border-gray-300 text-[1.125rem] [border-style:solid]">
                  <thead>
                    <tr>
                      <th className="h-[3.5rem] w-[9.375rem] border border-gray-300 bg-blue-secondary px-4 py-2 text-center align-middle text-blue-primary [border-style:solid]">
                        항목
                      </th>
                      <th className="h-[3.5rem] w-[15.625rem] border border-gray-300 px-4 py-2 text-center align-middle text-gray-500 [border-style:solid]">
                        상세 내용
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="h-[3.5rem] w-[12.75rem] border border-gray-300 bg-blue-secondary px-4 py-2 text-center align-middle text-blue-primary [border-style:solid]">
                        품질
                      </td>
                      <td className="h-[3.5rem] w-[21.625rem] border border-gray-300 px-4 py-2 text-center align-middle text-gray-500 [border-style:solid]">
                        고해상도 컬러 스캔
                      </td>
                    </tr>
                    <tr>
                      <td className="h-[3.5rem] w-[12.75rem] border border-gray-300 bg-blue-secondary px-4 py-2 text-center align-middle text-blue-primary [border-style:solid]">
                        DPI
                      </td>
                      <td className="h-[3.5rem] w-[21.625rem] border border-gray-300 px-4 py-2 text-center align-middle text-gray-500 [border-style:solid]">
                        최대 600 DPI
                      </td>
                    </tr>
                    <tr>
                      <td className="h-[3.5rem] w-[12.75rem] border border-gray-300 bg-blue-secondary px-4 py-2 text-center align-middle text-blue-primary [border-style:solid]">
                        색감
                      </td>
                      <td className="border-gray-00 h-[3.5rem] w-[21.625rem] border px-4 py-2 text-center align-middle text-gray-500 [border-style:solid]">
                        24비트 컬러
                      </td>
                    </tr>
                    <tr>
                      <td className="h-[3.5rem] w-[12.75rem] border border-gray-300 bg-blue-secondary px-4 py-2 text-center align-middle text-blue-primary [border-style:solid]">
                        선명도
                      </td>
                      <td className="h-[3.5rem] w-[21.625rem] border border-gray-300 px-4 py-2 text-center align-middle text-gray-500 [border-style:solid]">
                        자동 이미지 보정 및 선명한 텍스트 출력 지원
                      </td>
                    </tr>
                    <tr>
                      <td className="h-[3.5rem] w-[12.75rem] border border-gray-300 bg-blue-secondary px-4 py-2 text-center align-middle text-blue-primary [border-style:solid]">
                        검수작업
                      </td>
                      <td className="h-[3.5rem] w-[21.625rem] border border-gray-300 px-4 py-2 text-center align-middle text-gray-500 [border-style:solid]">
                        빈 페이지 제거 및 배경틈 보정 기능
                      </td>
                    </tr>
                    <tr>
                      <td className="h-[3.5rem] w-[12.75rem] border border-gray-300 bg-blue-secondary px-4 py-2 text-center align-middle text-blue-primary [border-style:solid]">
                        기울기보정
                      </td>
                      <td className="h-[3.5rem] w-[21.625rem] border border-gray-300 px-4 py-2 text-center align-middle text-gray-500 [border-style:solid]">
                        자동 기울기 보정 및 잘못된 정렬 수정
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Price
