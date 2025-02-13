import { fetchTerms } from '@/api'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import type { Term } from '@/types'
import { TermsType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Accordion, TitleLabel } from '@tookscan/components'
import { useEffect } from 'react'

const TermsAgreement = () => {
  const { terms, setTerms } = useApplyContext()

  const { data: termsData } = useQuery<Term[]>({
    queryKey: ['scanTerms'],
    queryFn: () => fetchTerms(TermsType.SCAN),
  })

  const visibleTerms: Term[] =
    termsData?.filter((term: Term) => term.isVisible) || []

  useEffect(() => {
    if (visibleTerms.length > 0) {
      setTerms((prev: Record<number, boolean>) => {
        const newTerms: Record<number, boolean> = {}
        for (const term of visibleTerms) {
          newTerms[term.id] = prev[term.id] ?? false
        }
        return newTerms
      })
    }
  }, [visibleTerms, setTerms])
  if (visibleTerms.length === 0) return null

  const isAllChecked = visibleTerms.every(
    (term) => (terms as Record<number, boolean>)[term.id] || false
  )

  const handleAllAgreementChange = () => {
    const newState = !isAllChecked
    const updatedTerms: Record<number, boolean> = {}
    for (const term of visibleTerms) {
      updatedTerms[term.id] = newState
    }
    setTerms((prev: Record<number, boolean>) => ({
      ...prev,
      ...updatedTerms,
    }))
  }

  return (
    <div className="flex flex-col justify-start gap-6">
      <TitleLabel
        title="이용약관 동의"
        description="툭스캔 서비스 이용약관을 확인하고 동의해주세요."
        size="lg"
        type="default"
      />

      {/* 전체 동의 */}
      <Accordion
        title="전체 동의"
        isCheck={isAllChecked}
        onClick={handleAllAgreementChange}
      />

      <div className="flex flex-col justify-start gap-4">
        {visibleTerms.map((term) => (
          <Accordion
            key={term.id}
            title={`[${term.isRequired ? '필수' : '선택'}] ${term.title}`}
            contents={term.content}
            isCheck={terms[term.id] ?? false}
            onClick={() =>
              setTerms((prev) => ({
                ...prev,
                [term.id]: !prev[term.id],
              }))
            }
          />
        ))}
      </div>
    </div>
  )
}

export default TermsAgreement
