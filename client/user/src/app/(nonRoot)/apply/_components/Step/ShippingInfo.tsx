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
import { useUserSummaries } from '@/api/apply/getUserSummariesHook'
import usePhoneAuth from '@/api/auth/phoneAuthHook'
import { phoneVerify } from '@/api/auth/phoneVerifyHook'
import { set } from 'lodash'

const ShippingInfo = React.memo(() => {
  const { books, shippingInfo, setShippingInfo } = useApplyContext()
  const showToast = useToast()
  const { openModal, closeModal } = useModal()
  const [isSameAsDefault, setIsSameAsDefault] = useState(false)
  const [isVerified, setIsVerified] = useState(false) // 인증여부
  const [verificationCode, setVerificationCode] = useState('')
  const { data: userData, refetch, isFetching } = useUserSummaries()
  const { mutateAsync: sendAuthCode, isPending: isSendingAuth } = usePhoneAuth()
  const { mutateAsync: verifyAuthCode, isPending: isVerifyingAuth } =
    phoneVerify()
  const [showVerificationInput, setShowVerificationInput] = useState(false)

  const isMember = !!localStorage.getItem('access_token')

  useEffect(() => {
    if (userData?.success && userData.data && isMember) {
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
      setIsVerified(true)
    } else if (!isVerified) {
      setIsVerified(false)
    }
  }, [userData, setShippingInfo, isMember])

  const handleInputChange = (key: keyof typeof shippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [key]: value }))
    setIsSameAsDefault(false)

    if (key === 'phone') {
      setIsVerified(false) // 인증 초기화
    }
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
      <div
        className={
          !isMember
            ? 'pointer-events-none cursor-not-allowed text-gray-400'
            : ''
        }
      >
        <ConsentLabel
          content="회원정보와 동일"
          consentStatus={isSameAsDefault}
          size="lg"
          onClick={async () => {
            if (!isMember) return // 비회원일 때 클릭 방지

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
                  setIsVerified(true) // 인증완료
                }
              } catch (error) {
                console.error('회원 정보를 불러오는 중 오류 발생:', error)
              }
            }
          }}
        />
      </div>

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
      {/*전화번호 입력 및 인증*/}
      <Section>
        <TitleLabel size="lg" type="required" title="전화번호" />
        <div className="flex gap-2">
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
          {!isMember && (
            <Button
              size="md"
              onClick={async () => {
                try {
                  await sendAuthCode({
                    name: shippingInfo.recipient,
                    phone_number: shippingInfo.phone,
                  })
                  showToast(
                    '인증번호가 전송되었습니다',
                    'success',
                    'message-circle'
                  )
                  setShowVerificationInput(true)
                } catch (error) {
                  showToast('인증번호 전송 실패', 'error', 'alert-triangle')
                }
              }}
              disabled={isSendingAuth}
              className="px-6 py-3"
            >
              인증받기
            </Button>
          )}
        </div>
      </Section>

      {/*비회원일 때 인증번호 입력 필드 표시*/}
      {showVerificationInput && (
        <Section>
          <TitleLabel size="lg" type="required" title="인증번호" />
          <div className="flex gap-2">
            <InputField
              type="simple"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호"
            />
            <Button
              size="md"
              onClick={async () => {
                try {
                  await verifyAuthCode({
                    phone_number: shippingInfo.phone,
                    authentication_code: verificationCode,
                  })
                  showToast('인증되었습니다.', 'success', 'check')
                  setIsVerified(true) // 인증완료
                } catch (error) {
                  showToast('인증 실패', 'error', 'alert-triangle')
                }
              }}
              disabled={isVerifyingAuth}
              className="px-6 py-3"
            >
              인증하기
            </Button>
          </div>
        </Section>
      )}
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
