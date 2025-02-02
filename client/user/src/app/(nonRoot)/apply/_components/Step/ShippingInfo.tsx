import React, { useEffect, useState } from 'react'
import { Section } from '@/app/(nonRoot)/apply/_components/index'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import TitleLabel from '@tookscan/components/ui/Label/TitleLabel'
import InputField from '@tookscan/components/ui/InputField'
import ConsentLabel from '@tookscan/components/ui/Label/ConsentLabel'
import { Button } from '@tookscan/components/ui/Button'
import { useToast } from '@tookscan/components/ui/Modal/Toast'
import SearchAddress from '@tookscan/components/ui/Modal/SearchAddress'
import useModal from '@tookscan/hooks/useModal'
import { hasNonDropBooks } from '@/app/(nonRoot)/apply/_utils/calculateBookPrice'
import { useUserSummaries } from '@/api/getUserSummariesHook'

const ShippingInfo = React.memo(() => {
  const { books, shippingInfo, setShippingInfo } = useApplyContext()
  const showToast = useToast()
  const { openModal, closeModal } = useModal()
  const [isSameAsDefault, setIsSameAsDefault] = useState(false)

  const { data: userData, refetch, isFetching } = useUserSummaries()

  useEffect(() => {
    if (userData?.success && userData.data) {
      const fetchedData = userData.data
      setShippingInfo({
        recipient: fetchedData.name,
        phone: fetchedData.phone_number,
        email: fetchedData.email || '',
        address: fetchedData.address?.address_name || '',
        addressDetail: fetchedData.address?.address_detail || '',
        request: '',
      })
      setIsSameAsDefault(true)
    }
  }, [userData, setShippingInfo])

  const handleInputChange = (key: keyof typeof shippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [key]: value }))
    setIsSameAsDefault(false)
  }

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
        onClick={async () => {
          if (isSameAsDefault) {
            setShippingInfo({
              recipient: '',
              phone: '',
              email: '',
              address: '',
              addressDetail: '',
              request: '',
            })
            setIsSameAsDefault(false)
          } else {
            try {
              const { data } = await refetch()
              if (data?.success && data.data) {
                setShippingInfo({
                  recipient: data.data.name,
                  phone: data.data.phone_number,
                  email: data.data.email || '',
                  address: data.data.address?.address_name || '',
                  addressDetail: data.data.address?.address_detail || '',
                  request: '',
                })
                setIsSameAsDefault(true)
              }
            } catch (error) {
              console.error('회원 정보를 불러오는 중 오류 발생:', error)
            }
          }
        }}
      />
      {isFetching && (
        <p className="text-sm text-gray-300">회원 정보를 불러오는 중...</p>
      )}

      <Section>
        <TitleLabel size="lg" type="required" title="받는 이" />
        <InputField
          type="simple"
          value={shippingInfo.recipient}
          onChange={(e) =>
            setShippingInfo((prev) => ({ ...prev, recipient: e.target.value }))
          }
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
              showToast('테스트 메일을 전송 했습니다.', 'success', 'mail-heart')
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
