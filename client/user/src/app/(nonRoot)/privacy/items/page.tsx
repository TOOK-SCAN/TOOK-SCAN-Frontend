'use client'

import React from 'react'

interface TableRow {
  category: string
  type: string
  purpose: React.ReactNode
  requiredItems: React.ReactNode
  optionalItems: string
  categoryRowSpan?: number // 'category' 열 병합
  purposeRowSpan?: number // 'purpose' 열 병합
}

const data: TableRow[] = [
  {
    category: '일반회원',
    type: '회원가입(이메일)',
    purpose: (
      <>
        - 회원가입 확인 및 관리
        <br />
        - 이용자 식별 및 중복 방지
        <br />
        - 서비스 제공
        <br />- 민원처리
      </>
    ),
    requiredItems: '(필수) 아이디, 비밀번호, 이메일',
    optionalItems: '-',
    purposeRowSpan: 4, // '수집목적' 열 병합 (4행)
  },
  {
    category: '일반회원/비회원',
    type: '회원가입(카카오)',
    purpose: '', // 병합된 행의 경우 빈 값
    requiredItems: '(필수) 이메일, 전화번호, 아이디',
    optionalItems: '-',
    categoryRowSpan: 10, // '일반회원/비회원' 행 병합
  },
  {
    category: '',
    type: '회원가입(네이버)',
    purpose: '', // 병합된 행의 경우 빈 값
    requiredItems: '(필수) 이메일, 전화번호, 이름, 아이디',
    optionalItems: '-',
  },
  {
    category: '',
    type: '회원가입(구글)',
    purpose: '', // 병합된 행의 경우 빈 값
    requiredItems: '(필수) 이름, 아이디, 이메일, 전화번호',
    optionalItems: '-',
  },
  {
    category: '',
    type: '아이디/비밀번호찾기',
    purpose: '아이디, 비밀번호 조회 및 복구',
    requiredItems: '(필수) 아이디/이메일주소/전화번호, 이름',
    optionalItems: '-',
  },
  {
    category: '',
    type: '주문 시',
    purpose: (
      <>
        PDF 전달, 서비스 이행, 민원 사항 처리
        <br />
        고객 요청에 따른 책 배송에 이용
      </>
    ),
    requiredItems: (
      <>
        (필수) 주문자 정보(이름, 휴대전화번호, 이메일)
        <br />
        배송지 정보(수령인, 휴대전화번호, 배송주소)
      </>
    ),
    optionalItems: '-',
  },
  {
    category: '',
    type: '결제 시',
    purpose: '카드 결제, 무통장 입금 결제, 카카오페이, 토스페이 결제',
    requiredItems: '(필수) ID, 주문내역, 결제정보',
    optionalItems: '-',
  },
  {
    category: '',
    type: '환불 시',
    purpose: '결제 취소금액 환불',
    requiredItems: '(필수) 은행명, 계좌번호, 예금주',
    optionalItems: '-',
  },
  {
    category: '',
    type: 'PDF 파일',
    purpose: '파일 고객이 요청한 서비스 이행',
    requiredItems: '(필수) 고객이 스캔을 원하는 책 또는 종이',
    optionalItems: '-',
  },
  {
    category: '',
    type: '고객상담',
    purpose: (
      <>
        주문내역 조회, 고객 상담 내용 확인 및 처리에 이용
        <br />
        고객에게 제공한 자료 등 상담 시 확인되는 정보
      </>
    ),
    requiredItems: '(필수) 이름, 이메일, 휴대전화번호, 주소, 제공한 자료',
    optionalItems: '-',
  },
  {
    category: '',
    type: '마케팅',
    purpose: '광고 및 이벤트, 광고성 메시지',
    requiredItems: '-',
    optionalItems: '이름, 이메일주소, 휴대전화번호',
  },
]

const AgreementTable = () => {
  return (
    <div className="flex flex-col justify-start gap-6">
      <div className="flex w-full max-w-[22rem] items-center justify-start">
        <div>
          <h2 className="mb-4 font-bold text-black h3">
            개인정보 수집목적 및 이용목적
          </h2>
          <p className="text-gray-700 body2">
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등
            필요한 조치를 이행할 예정입니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center overflow-hidden rounded-lg">
          <table className="w-full border-collapse border border-gray-200 [border-style:solid]">
            <thead className="bg-blue-secondary text-sm text-blue-primary">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                  구분
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                  유형
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                  수집목적
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                  필수 수집항목
                </th>
                <th className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                  선택 수집항목
                </th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {data.map((row, index) => (
                <tr key={index}>
                  {/* category 열 병합 */}
                  {row.category && (
                    <td
                      className="border border-gray-200 px-4 py-2 text-center align-middle [border-style:solid]"
                      rowSpan={row.categoryRowSpan}
                    >
                      {row.category}
                    </td>
                  )}
                  {/* type 열 */}
                  <td className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                    {row.type}
                  </td>
                  {/* purpose 열 병합 */}
                  {row.purposeRowSpan ? (
                    <td
                      className="border border-gray-200 px-4 py-2 text-center align-middle [border-style:solid]"
                      rowSpan={row.purposeRowSpan}
                    >
                      {row.purpose}
                    </td>
                  ) : row.purpose ? (
                    <td className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                      {row.purpose}
                    </td>
                  ) : null}
                  {/* requiredItems 열 */}
                  <td className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                    {row.requiredItems}
                  </td>
                  {/* optionalItems 열 */}
                  <td className="border border-gray-200 px-4 py-2 text-center [border-style:solid]">
                    {row.optionalItems}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AgreementTable
