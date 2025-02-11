'use client'

import { Button } from '@tookscan/components'
import { Accordion } from '@tookscan/components/ui/Accordion'
import { useState } from 'react'


const ScanAgreePage = () => {
  // 로컬 상태로 terms 항목 관리
  const [terms, setTerms] = useState({
    terms1: false,
    terms2: false,
  })

  // "전체 동의" 클릭 시 토글
  const handleToggleAll = () => {
    const allChecked = terms.terms1 && terms.terms2
    setTerms({
      terms1: !allChecked,
      terms2: !allChecked,
    })
  }

  // 모든 항목이 동의되었는지 여부
  const allAccepted = terms.terms1 && terms.terms2

  return (
    <div className="mx-auto w-full items-center justify-center px-[1rem] py-[5rem] lg:px-[9rem]">
      {/* 상단 안내 문구 영역 */}
      <div className="flex flex-col items-center">
        <div className="text-blue-primary title2">스캔을 시작해주세요!</div>
        <div className="mb-[3.12rem] mt-[0.75rem] btn1">
          안녕하세요 <span className="text-blue-primary">민경훈</span>님,
          의뢰해주신 스캔 준비를 완료했어요.
          <br />
          아래 약관을 동의해주시면 바로 작업을 시작할게요!
        </div>

        {/* 약관 영역 */}
        <div className="mx-auto w-full min-w-[20rem] max-w-[54rem] rounded-xl bg-white p-[1rem] md:p-[3.12rem]">
          <div className="flex flex-col">
            <span className="btn1">약관에 동의해주세요</span>
            <span className="text-gray-500 caption2">
              비대면 셀프 스캔 서비스 이용에 필요한 약관이에요.
            </span>
          </div>

          <div className="mt-8 flex w-full flex-col justify-start gap-6">
            {/* "전체 동의" 항목 */}
            <Accordion
              title="전체 동의"
              isCheck={allAccepted}
              onClick={handleToggleAll}
            />

            {/* 필수 항목 1 */}
            <Accordion
              title="[민경훈 님]의 원격 스캐너 사용을 위해 본인임을 확인해주세요"
              contents={`원격 셀프 스캔 서비스인 툭스캔의 스캐너와 스캔 과정은 서비스 이용자 본인의 사용을 
목적으로 제공되며, 타인의 복제 행위 및 배포 행위와 무관함을 확인합니다.`}
              isCheck={terms.terms1}
              onClick={() => setTerms({ ...terms, terms1: !terms.terms1 })}
            />

            {/* 필수 항목 2 */}
            <Accordion
              title="스캔 과정에서 문제 발생 시 툭스캔의 보조 활동에 동의해주세요"
              contents={`원격 셀프 스캔 서비스 과정에서 스캐너 오류/용지 걸림 등의 문제가 발생할 경우 [툭스캔]의 문제 해결 활동을 허용하겠습니다.`}
              isCheck={terms.terms2}
              onClick={() => setTerms({ ...terms, terms2: !terms.terms2 })}
            />
          </div>
        </div>

        <div className="mt-[3.12rem] flex w-full items-center justify-center">
          <Button
            className="mx-auto w-full max-w-[30rem]"
            variant="primary"
            size="md"
            // 전체 동의되지 않았다면 비활성화
            disabled={!allAccepted}
          >
            스캔하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ScanAgreePage
