import { getUserSummaries } from '@/api'
import { Section } from '@/app/(nonRoot)/apply/_components/index'
import { useApplyContext } from '@/app/(nonRoot)/apply/_contexts/ApplyContext'
import { hasNonDropBooks } from '@/app/(nonRoot)/apply/_utils/calculateBookPrice'
import { useQuery } from '@tanstack/react-query'
import { sendAuthCode, verifyAuthCode } from '@tookscan/api'
import {
  Button,
  ConsentLabel,
  InputField,
  SearchAddress,
  TitleLabel,
} from '@tookscan/components'
import { useAuth, useModal, useToast } from '@tookscan/hooks'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

const ShippingInfo = React.memo(() => {
  const { books, shippingInfo, setShippingInfo } = useApplyContext()
  const { showToast } = useToast()
  const { openModal, closeModal } = useModal()
  const { isLogin } = useAuth()
  const [isSameAsDefault, setIsSameAsDefault] = useState(false)
  const [isVerified, setIsVerified] = useState(false) // 인증여부
  const [verificationCode, setVerificationCode] = useState('')
  const [showVerificationInput, setShowVerificationInput] = useState(false)
  const [isSendingAuthCode, setIsSendingAuthCode] = useState(false)
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(false)
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [isVerificationValid, setIsVerificationValid] = useState(false)
  const [timeLeft, setTimeLeft] = useState(90)

  const { data } = useQuery({
    queryKey: ['userSummaries'],
    queryFn: getUserSummaries,
    enabled: isLogin,
  })

  useEffect(() => {
    if (data) {
      setShippingInfo({
        recipient: data.name || '',
        phone: data.phone_number || '',
        email: data.email || '',
        address: data.address?.address_name || '',
        addressDetail: data.address?.address_detail || '',
        region_1depth_name: data.address?.region_1depth_name || '',
        region_2depth_name: data.address?.region_2depth_name || '',
        region_3depth_name: data.address?.region_3depth_name || '',
        region_4depth_name: data.address?.region_4depth_name || '',
        longitude: data.address?.longitude || 0,
        latitude: data.address?.latitude || 0,
        request: '',
      })
      setIsSameAsDefault(true)
      setIsVerified(true)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const isSame =
        shippingInfo.recipient === (data.name || '') &&
        shippingInfo.phone === (data.phone_number || '') &&
        shippingInfo.email === (data.email || '') &&
        shippingInfo.address === (data.address?.address_name || '') &&
        shippingInfo.addressDetail === (data.address?.address_detail || '')

      setIsSameAsDefault(isSame)
    }
  }, [shippingInfo, data])

  // 타이머
  useEffect(() => {
    if (showVerificationInput && !isVerified && timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timerInterval)
    }
  }, [showVerificationInput, isVerified, timeLeft])

  // 전화번호 인증 요청
  const handleSendAuthCode = async () => {
    setIsSendingAuthCode(true)
    await sendAuthCode(shippingInfo.recipient, shippingInfo.phone)
    showToast('인증번호가 전송되었습니다', 'success', 'message-circle')
    setShowVerificationInput(true)
    setTimeLeft(90)
    setIsSendingAuthCode(false)
  }

  const handleVerifyAuthCode = async () => {
    setIsVerifyingAuth(true)
    try {
      await verifyAuthCode(shippingInfo.phone, verificationCode)
      openModal(
        <div className="flex flex-col items-center p-6">
          <h2 className="text-lg font-bold text-black">인증 성공</h2>
          <p className="mt-4 text-sm text-gray-600">
            휴대폰 인증이 완료되었습니다.
          </p>
          <Button
            className="mt-4 w-full"
            size="lg"
            variant="primary"
            onClick={closeModal}
          >
            확인
          </Button>
        </div>
      )
      setIsVerified(true)
    } catch (error) {
      openModal(
        <div className="flex flex-col items-center p-6">
          <h2 className="text-lg font-bold text-red-500">인증 실패</h2>
          <p className="mt-4 text-sm text-gray-600">
            인증번호가 올바르지 않습니다.
          </p>
          <Button
            className="mt-4 w-full"
            size="lg"
            variant="primary"
            onClick={() => {
              setVerificationCode('') // 인증번호 초기화
              setIsVerificationValid(false)
              closeModal()
            }}
          >
            다시 입력하기
          </Button>
        </div>
      )
    } finally {
      setIsVerifyingAuth(false)
    }
  }
  useEffect(() => {
    setIsPhoneValid(shippingInfo.phone.replace(/\D/g, '').length === 11)
  }, [shippingInfo.phone])

  const handleInputChange = (
    key: keyof typeof shippingInfo,
    value: string | number
  ) => {
    setShippingInfo((prev) => ({ ...prev, [key]: value }))

    if (isSameAsDefault) {
      setIsSameAsDefault(false)
    }

    if (key === 'phone') {
      const onlyNumbers = String(value).replace(/\D/g, '')
      const isValid = onlyNumbers.length === 11

      setIsPhoneValid(isValid)

      // 전화번호 변경 시 인증 취소 및 인증 버튼 표시
      if (isVerified || showVerificationInput) {
        setIsVerified(false)
        setShowVerificationInput(true)
        setVerificationCode('') // 입력했던 인증번호도 초기화
        setIsVerificationValid(false)
      }
    }
  }

  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(
    timeLeft % 60
  ).padStart(2, '0')}`

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
          !isLogin ? 'pointer-events-none cursor-not-allowed text-gray-400' : ''
        }
      >
        <ConsentLabel
          content="회원정보와 동일"
          consentStatus={isSameAsDefault}
          size="lg"
          onClick={async () => {
            if (!isLogin) return // 비회원일 때 클릭 방지

            if (isSameAsDefault) {
              setShippingInfo({
                recipient: '',
                phone: '',
                email: '',
                address: '',
                addressDetail: '',
                region_1depth_name: '',
                region_2depth_name: '',
                region_3depth_name: '',
                region_4depth_name: '',
                longitude: 0,
                latitude: 0,
                request: '',
              })
              setIsSameAsDefault(false)
            } else {
              try {
                const data = await getUserSummaries()
                if (data !== null) {
                  setShippingInfo({
                    recipient: data?.name || '',
                    phone: data?.phone_number || '',
                    email: data?.email || '',
                    address: data?.address?.address_name || '',
                    addressDetail: data?.address?.address_detail || '',
                    region_1depth_name: data?.address?.region_1depth_name || '',
                    region_2depth_name: data?.address?.region_2depth_name || '',
                    region_3depth_name: data?.address?.region_3depth_name || '',
                    region_4depth_name: data?.address?.region_4depth_name || '',
                    longitude: data?.address?.longitude || 0,
                    latitude: data?.address?.latitude || 0,
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
        <div
          className={clsx(
            'flex gap-2',
            isVerified ? 'opacity-50' : 'text-black opacity-100'
          )}
        >
          <InputField
            type="simple"
            value={shippingInfo.phone}
            onChange={(e) => {
              const input = e.target as HTMLInputElement
              const rawValue = input.value.replace(/\D/g, '')

              setIsPhoneValid(rawValue.length >= 11)

              if (rawValue.length > 11) {
                input.value = rawValue.slice(0, 11)
              }

              const formattedValue = rawValue
                .slice(0, 11)
                .replace(/^(\d{3})(\d{1,4})?(\d{1,4})?$/, (_, p1, p2, p3) =>
                  [p1, p2, p3].filter(Boolean).join('-')
                )

              setShippingInfo((prev) => ({ ...prev, phone: formattedValue }))

              if (isVerified) {
                setIsVerified(false)
              }
            }}
            placeholder="010-1234-5678"
          />

          <Button
            size="md"
            onClick={handleSendAuthCode}
            disabled={
              !isPhoneValid ||
              isSendingAuthCode ||
              shippingInfo.recipient.trim() === '' ||
              (showVerificationInput && timeLeft > 0) ||
              isVerified
            }
            className="px-6 py-3"
          >
            인증받기
          </Button>
        </div>
      </Section>
      {/*비회원일 때 인증번호 입력 필드 표시*/}
      {showVerificationInput && (
        <Section>
          <TitleLabel size="lg" type="required" title="인증번호" />
          <div className={clsx('flex gap-2', isVerified && 'opacity-50')}>
            <InputField
              type="simple"
              value={verificationCode}
              onChange={(e) => {
                const input = e.target as HTMLInputElement
                let rawValue = input.value.replace(/\D/g, '')

                if (rawValue.length > 6) {
                  rawValue = rawValue.slice(0, 6)
                }
                setVerificationCode(rawValue)
                setIsVerificationValid(rawValue.length >= 6)
              }}
              placeholder="인증번호"
              disabled={isVerified}
            />

            <Button
              size="md"
              onClick={handleVerifyAuthCode}
              disabled={isVerifyingAuth || !isVerificationValid || isVerified}
              className="px-6 py-3"
            >
              인증하기
            </Button>
          </div>
          {!isVerified && (
            <span className="text-sm text-error">{formattedTime}</span>
          )}
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
