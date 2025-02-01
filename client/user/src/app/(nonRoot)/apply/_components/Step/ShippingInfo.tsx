import React, { useEffect, useState } from 'react'
import { Section } from '@/app/(nonRoot)/apply/_components/index'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import {
  InputField,
  TitleLabel,
  SearchAddress,
  Button,
  useToast,
  ConsentLabel,
} from '@tookscan/components'
import { useModal } from '@tookscan/hooks'
import { hasNonDropBooks } from '@/app/(nonRoot)/apply/_utils/calculateBookPrice'

const DummyUserData = {
  recipient: '이종석',
  phone: '010-8765-4321',
  email: 'official@tookscan.com',
  address: '서울특별시 강남구 테헤란로 427',
  addressDetail: '테헤란로 427, 3층',
}

const ShippingInfo = React.memo(() => {
  const { books, shippingInfo, setShippingInfo } = useApplyContext()
  const showToast = useToast()
  const { openModal, closeModal } = useModal()
  const [isSameAsDefault, setIsSameAsDefault] = useState(false)
  const data = DummyUserData

  useEffect(() => {
    Object.entries(shippingInfo).forEach(([key, value]) => {
      const inputElement = document.querySelector<HTMLInputElement>(
        `input[name="${key}"]`
      )
      if (inputElement) {
        inputElement.value = value || ''
      }
    })
  }, [])

  const checkIfFieldsMatch = () => {
    const isMatching = Object.entries(data).every(([key, value]) => {
      return shippingInfo[key as keyof typeof shippingInfo] === value
    })
    setIsSameAsDefault(isMatching)
  }

  const handleInputChange = (key: keyof typeof shippingInfo, value: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [key]: value,
    }))
    checkIfFieldsMatch()
  }

  useEffect(() => {
    const isSame = Object.entries(data).every(
      ([key, value]) => shippingInfo[key as keyof typeof data] === value
    )
    setIsSameAsDefault(isSame)
  }, [shippingInfo])

  return (
    <div className="flex flex-col justify-start gap-4">
      <div className="flex flex-row justify-between font-semibold">
        <h1 className="text-xl">
          {books[0]?.name}
          {books.length > 1 && <span>외 {books.length - 1}권</span>}
        </h1>
        <h2 className="text-2xl text-blue-primary">{books.length}권</h2>
      </div>
      <hr className="border-[1px]" />
      <ConsentLabel
        content="회원정보와 동일"
        consentStatus={isSameAsDefault}
        size="lg"
        onClick={() => {
          if (isSameAsDefault) {
            setShippingInfo((prev) => {
              const updatedInfo = { ...prev }
              Object.keys(updatedInfo).forEach((key) => {
                if (key !== 'request') {
                  updatedInfo[key as keyof typeof updatedInfo] = ''
                  const inputElement = document.querySelector<HTMLInputElement>(
                    `input[name="${key}"]`
                  )
                  if (inputElement) {
                    inputElement.value = ''
                  }
                }
              })
              return updatedInfo
            })
            setIsSameAsDefault(false)
          } else {
            setShippingInfo((prev) => {
              const updatedInfo = { ...prev }
              Object.entries(data).forEach(([key, value]) => {
                if (key in updatedInfo) {
                  updatedInfo[key as keyof typeof updatedInfo] = value || ''
                  const inputElement = document.querySelector<HTMLInputElement>(
                    `input[name="${key}"]`
                  )
                  if (inputElement) {
                    inputElement.value = value || ''
                  }
                }
              })
              return updatedInfo
            })
            setIsSameAsDefault(true)
          }
        }}
      />

      <Section>
        <TitleLabel size="lg" type="required" title="받는 이" />
        <InputField
          type="simple"
          value={shippingInfo.recipient}
          onChange={(e) => handleInputChange('recipient', e.target.value)}
          placeholder="이지은"
        />
      </Section>
      <Section>
        <TitleLabel size="lg" type="required" title="전화번호" />
        <InputField
          type="simple"
          value={shippingInfo.phone}
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
            value={shippingInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="support@tookscan.com"
          />
          <Button
            size="md"
            className="whitespace-nowrap px-6 py-3"
            onClick={() => {
              showToast('테스트 메일을 전송 했습니다.', 'success', 'mail-heart') // TODO: 테스트 메일 발송 후 성공 및 실패 로직 추가
            }}
          >
            테스트 메일 발송
          </Button>
        </div>
      </Section>
      {hasNonDropBooks(books) && (
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
                className="h-12 w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-blue-secondary px-4 focus:outline-none"
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="주소"
                readOnly={true}
                value={shippingInfo.address || ''}
              />

              <Button
                size="md"
                className="whitespace-nowrap px-6 py-3"
                onClick={() => {
                  console.log('open modal')
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
                        shippingInfo.address = e.target.value
                      }}
                    />
                  )
                }}
              >
                주소 검색
              </Button>
            </div>
          </Section>
          <Section>
            <InputField
              type="simple"
              value={shippingInfo.addressDetail}
              onChange={(e) =>
                handleInputChange('addressDetail', e.target.value)
              }
              placeholder="아파트 동/호수 등 상세 주소"
            />
          </Section>
        </div>
      )}
      <Section>
        <TitleLabel size="lg" type="default" title="요청사항" />
        <InputField
          type="simple"
          value={shippingInfo.request}
          onChange={(e) => handleInputChange('request', e.target.value)}
          placeholder="배송 시 요청사항을 입력해주세요."
        />
      </Section>
    </div>
  )
})

export default ShippingInfo
