import React, { useState } from 'react'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import { Books } from '@/types/book'
import { Button, Icon, TitleLabel, InputField } from '@tookscan/components'
import { Restore, Section } from '@/app/(nonRoot)/apply/_components/index'
import clsx from 'clsx'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const restoreOptions = [
  { type: 'DISCARD', title: '버려줘요', price: 0 },
  { type: 'RAW', title: '낱장으로 받을게요', price: 0 },
  { type: 'SPRING', title: '스프링으로 묶어주세요', price: 4000 },
]

const ScanInfo = () => {
  const { setBooks } = useApplyContext()
  const [currentBook, setCurrentBook] = useState<Books>({
    name: '',
    pages: undefined,
    restoreOption: '',
  })

  const handleChange = (
    key: keyof Books,
    value: string | number | undefined
  ) => {
    setCurrentBook((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setCurrentBook({ name: '', pages: undefined, restoreOption: '' })
  }

  return (
    <div className="flex flex-col gap-4">
      <Section>
        <TitleLabel
          size="lg"
          type="required"
          title="1. 책 별명"
          description="스캔한 PDF 파일 이름은 어떻게 저장할까요?"
        />
        <InputField
          type="simple"
          value={currentBook.name}
          suffix={`${currentBook.name.length}/30`}
          onChange={(e) => handleChange('name', e.target.value.slice(0, 30))}
          placeholder="책 별명을 입력해주세요."
        />
      </Section>
      <Section>
        <TitleLabel
          size="lg"
          type="required"
          title="2. 페이지 수"
          description="책의 총 페이지 수를 입력해주세요."
        />
        <InputField
          type="simple"
          value={currentBook.pages || ''}
          suffix="page"
          onChange={(e) =>
            /^\d*$/.test(e.target.value)
              ? handleChange(
                  'pages',
                  e.target.value ? Number(e.target.value) : undefined
                )
              : null
          }
          placeholder="책의 총 페이지 수를 입력해주세요."
        />
      </Section>
      <Section>
        <TitleLabel size="lg" type="required" title="3. 책 복원 옵션 선택" />
        <div className={clsx('flex flex-col gap-3')}>
          {restoreOptions.map(({ type, title, price }, index) => (
            <div className="flex flex-col" key={index}>
              <Restore
                type={type as 'RAW' | 'SPRING' | 'DISCARD'}
                title={title}
                price={price}
                isClicked={currentBook.restoreOption === type}
                onClick={() => handleChange('restoreOption', type)}
              />
            </div>
          ))}
        </div>
      </Section>
      <Button
        size="lg"
        variant="secondary"
        type="submit"
        onClick={() => {
          setBooks((prev) => [...prev, { ...currentBook, id: uuidv4() }])
          handleReset()
        }}
        disabled={
          !currentBook.name || !currentBook.pages || !currentBook.restoreOption
        }
        className="gap-1"
      >
        <Icon id="cart1" width={20} height={20} /> 담기
      </Button>
    </div>
  )
}

export default ScanInfo
