import { TitleLabel, Accordion } from '@tookscan/components'
import React from 'react'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'

const TermsAgreement = () => {
  const { terms, setTerms } = useApplyContext()
  return (
    <div className="flex flex-col justify-start gap-6">
      <TitleLabel
        title="이용약관 동의"
        description="툭스캔 서비스 이용약관을 확인하고 동의해주세요."
        size="lg"
        type="default"
      />
      <Accordion
        title="전체 동의"
        isCheck={terms.terms1 && terms.terms2 && terms.terms3 && terms.terms4}
        onClick={() => {
          if (terms.terms1 && terms.terms2 && terms.terms3 && terms.terms4) {
            setTerms({
              ...terms,
              terms1: false,
              terms2: false,
              terms3: false,
              terms4: false,
            })
          } else {
            setTerms({
              ...terms,
              terms1: true,
              terms2: true,
              terms3: true,
              terms4: true,
            })
          }
        }}
      />
      <div className="flex flex-col justify-start gap-4">
        <Accordion
          title="[필수] 스캔 주체 및 저작권 법 준수 동의"
          contents="Took Scan은 안전하고 편리한 스캔 서비스를 제공합니다."
          isCheck={terms.terms1}
          onClick={() => setTerms({ ...terms, terms1: !terms.terms1 })}
        />
        <Accordion
          title="[필수] 저작물 유포 금지 및 책임소재 동의"
          contents="Took Scan의 서비스를 통해 제공된 자료를 제3자에게 무단으로 유포하거나 배포할 경우, 관련된 모든 법적 책임은 이용자 본인에게 있으며, Took Scan은 이에 대한 어떠한 책임도 지지 않습니다. 서비스 이용 전 이를 충분히 숙지하시기 바랍니다."
          isCheck={terms.terms2}
          onClick={() => setTerms({ ...terms, terms2: !terms.terms2 })}
        />

        <Accordion
          title="[필수] 재단 및 복원 유의사항 동의"
          contents="Took Scan을 통해 진행된 재단 및 복원 작업은 이용자의 요청에 따라 진행되며, 이에 대한 결과물의 손상 또는 문제 발생 시 Took Scan은 책임을 지지 않습니다. 작업 진행 전 신중히 확인하시고 동의 바랍니다."
          isCheck={terms.terms3}
          onClick={() => setTerms({ ...terms, terms3: !terms.terms3 })}
        />

        <Accordion
          title="[선택] 마케팅 목적 기반 정보 확인 동의"
          contents="Took Scan은 서비스 품질 개선 및 맞춤형 정보 제공을 위해 마케팅 정보를 활용할 수 있습니다. 동의를 선택하시면 할인 혜택, 이벤트 정보 등을 이메일 또는 문자로 받아보실 수 있으며, 언제든지 동의를 철회할 수 있습니다."
          isCheck={terms.terms4}
          onClick={() => setTerms({ ...terms, terms4: !terms.terms4 })}
        />
      </div>
    </div>
  )
}

export default TermsAgreement
