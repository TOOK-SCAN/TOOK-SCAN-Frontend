'use client'
import { Section } from '@/app/(nonRoot)/apply/_components'
import {
  Button,
  InputField,
  SearchAddress,
  TitleLabel,
  useToast,
} from '@tookscan/components'
import { useModal } from '@tookscan/hooks'
import { useEffect, useState } from 'react'

const EditInfoPage = () => {
  const [formInfo, setFormInfo] = useState({
    recipient: '',
    id: '',
    phone: '',
    email: '',
    address: '',
    addressDetail: '',
    request: '',
  })

  const showToast = useToast()
  const { openModal, closeModal } = useModal()

  // 입력 값 변경 핸들러 (key에 따라 formInfo 업데이트)
  const handleInputChange = (
    key: keyof typeof formInfo,
    value: string
  ): void => {
    setFormInfo((prev) => ({ ...prev, [key]: value }))
  }

  // 컴포넌트 마운트 또는 formInfo 변경 시, input 태그의 초기 값을 동기화
  useEffect(() => {
    Object.entries(formInfo).forEach(([key, value]) => {
      const inputElement = document.querySelector<HTMLInputElement>(
        `input[name="${key}"]`
      )
      if (inputElement) {
        inputElement.value = value || ''
      }
    })
  }, [formInfo])

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      {/* 이름 */}
      <Section>
        <TitleLabel size="lg" type="required" title="이름" />
        <InputField
          type="simple"
          name="recipient"
          value={formInfo.recipient}
          onChange={(e) => handleInputChange('recipient', e.target.value)}
          placeholder="이지은"
        />
      </Section>
      {/* 아이디 */}
      <Section>
        <TitleLabel size="lg" type="required" title="아이디" />
        <InputField
          type="simple"
          name="id"
          value={formInfo.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
          placeholder="아이디값"
        />
      </Section>
      {/* 전화번호 */}
      <Section>
        <TitleLabel size="lg" type="required" title="전화번호" />
        <InputField
          type="simple"
          name="phone"
          value={formInfo.phone}
          onChange={(e) => {
            const input = e.target as HTMLInputElement
            const rawValue = input.value.replace(/\D/g, '')
            if (rawValue.length > 11) {
              input.value = rawValue.slice(0, 11)
            }
            const formattedValue = rawValue
              .slice(0, 11)
              .replace(/^(\d{3})(\d{1,4})?(\d{1,4})?$/, (_, p1, p2, p3) =>
                [p1, p2, p3].filter(Boolean).join('-')
              )
            input.value = formattedValue
            handleInputChange('phone', rawValue.slice(0, 11))
          }}
          placeholder="010-1234-5678"
        />
      </Section>
      {/* 이메일 */}
      <Section>
        <TitleLabel
          size="lg"
          type="required"
          title="이메일"
          description="PDF 파일을 전달받을 이메일 주소를 입력해 주세요"
        />
        <div className="flex flex-row gap-2">
          <InputField
            type="simple"
            name="email"
            value={formInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="support@tookscan.com"
          />
          <Button
            size="md"
            className="whitespace-nowrap py-3"
            onClick={() =>
              showToast('테스트 메일을 전송 했습니다.', 'success', 'mail-heart')
            }
          >
            테스트 메일 발송
          </Button>
        </div>
      </Section>
      <div className="flex flex-col gap-2">
        <Section>
          <TitleLabel
            size="lg"
            type="required"
            title="주소"
            description="스캔 완료 후, 책을 돌려받을 주소를 정확하게 입력해 주세요."
          />
          <div className="flex flex-row gap-2">
            <input
              name="address"
              className="h-12 w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-blue-secondary px-4 focus:outline-none"
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="주소입력"
              readOnly={true}
              value={formInfo.address}
            />
            <Button
              size="md"
              className="whitespace-nowrap px-6 py-3"
              onClick={() =>
                openModal(
                  <SearchAddress
                    closeModal={closeModal}
                    onChange={(e) => {
                      const addressInput =
                        document.querySelector<HTMLInputElement>(
                          'input[name="address"]'
                        )
                      if (addressInput) {
                        addressInput.value = e.target.value
                      }
                      handleInputChange('address', e.target.value)
                    }}
                  />
                )
              }
            >
              주소 검색
            </Button>
          </div>
        </Section>
        <Section>
          <InputField
            type="simple"
            name="addressDetail"
            value={formInfo.addressDetail}
            onChange={(e) => handleInputChange('addressDetail', e.target.value)}
            placeholder="상세주소를 입력해주세요."
          />
        </Section>
      </div>
    </div>
  )
}

export default EditInfoPage
