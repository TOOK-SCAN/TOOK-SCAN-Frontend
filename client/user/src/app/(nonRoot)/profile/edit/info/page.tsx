'use client'
import { getUserDetail, testEmail, updateUserDetail } from '@/api'
import { Section } from '@/app/(nonRoot)/apply/_components'
import { sendAuthCode, verifyAuthCode } from '@tookscan/api'
import {
  Button,
  CheckButton,
  InputField,
  SearchAddress,
  TitleLabel,
} from '@tookscan/components'
import { useModal, useToast } from '@tookscan/hooks'
import { useEffect, useState } from 'react'

const formatPhone = (phone: string) => {
  const raw = phone.replace(/\D/g, '')
  if (raw.length === 11) {
    return raw.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')
  }
  return raw
}

const EditInfoPage = () => {
  const [formInfo, setFormInfo] = useState({
    recipient: '',
    id: '',
    phone: '',
    email: '',
    address: '',
    addressDetail: '',
    emailConsent: false,
    smsConsent: false,
  })

  const [state, setState] = useState({
    isIdChecked: false,
    isVerified: false,
    verificationCode: '',
    showVerificationInput: false,
    isVerificationValid: false,
    isPhoneValid: false,
    isUpdating: false,
    isSendingAuthCode: false,
    isValidating: false,
    isVerifyingAuth: false,
  })

  const updateState = <K extends keyof typeof state>(
    key: K,
    value: (typeof state)[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const { showToast } = useToast()
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserDetail()
      if (data) {
        setFormInfo({
          recipient: data.name || '',
          id: data.serial_id || '',
          phone: formatPhone(data.phone_number || ''),
          email: data.email || '',
          address: data.address?.address_name || '',
          addressDetail: data.address?.address_detail || '',
          emailConsent: data.is_receive_email,
          smsConsent: data.is_receive_sms,
        })
        updateState('isIdChecked', true)
        updateState('isVerified', true)
        updateState(
          'isPhoneValid',
          data.phone_number?.replace(/\D/g, '').length === 11 || false
        )
      }
    }
    fetchUserData()
  }, [])

  const handleInputChange = (key: keyof typeof formInfo, value: string) => {
    setFormInfo((prev) => ({ ...prev, [key]: value }))
    updateState('isUpdating', true)

    if (key === 'id') {
      updateState('isIdChecked', false)
    }
    if (key === 'phone') {
      updateState('isVerified', false)
      updateState('showVerificationInput', false)
    }
  }

  // 인증번호 전송
  const handleSendAuthCode = async () => {
    updateState('isSendingAuthCode', true)
    await sendAuthCode(formInfo.recipient, formInfo.phone)
    showToast('인증번호가 전송되었습니다.', 'success')
    updateState('showVerificationInput', true)
  }

  // 인증번호 확인
  const handleVerifyAuthCode = async () => {
    try {
      await verifyAuthCode(formInfo.phone, state.verificationCode)
      updateState('isVerified', true)
      updateState('isVerificationValid', false)
      showToast('휴대폰 인증이 완료되었습니다.', 'success')
    } catch (error) {
      showToast('인증번호가 올바르지 않습니다.', 'error')
    }
  }

  const isChangeButtonEnabled =
    state.isUpdating && state.isIdChecked && state.isVerified

  // 정보 수정 요청
  const handleUpdateInfo = async () => {
    if (!state.isIdChecked) {
      showToast('아이디 중복 확인을 해주세요.', 'error')
      return
    }
    if (!state.isVerified) {
      showToast('휴대폰 인증을 완료해주세요.', 'error')
      return
    }
    if (!formInfo.email) {
      showToast('이메일을 입력해주세요.', 'error')
      return
    }
    await updateUserDetail({
      phone_number: formInfo.phone,
      email: formInfo.email,
      address: {
        address_name: formInfo.address,
        region_1depth_name: '',
        region_2depth_name: '',
        region_3depth_name: '',
        address_detail: formInfo.addressDetail,
        longitude: 0,
        latitude: 0,
      },
      is_receive_email: formInfo.emailConsent,
      is_receive_sms: formInfo.smsConsent,
    })
    showToast('정보가 업데이트되었습니다.', 'success')
    updateState('isUpdating', false)
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      {/* 이름 */}
      <Section>
        <TitleLabel size="lg" type="required" title="이름" />
        <div className="cursor-not-allowed opacity-50">
          <InputField
            type="simple"
            name="recipient"
            value={formInfo.recipient}
            disabled={true}
            onChange={() => {}}
            placeholder="이지은"
          />
        </div>
      </Section>
      {/* 아이디 */}
      <Section>
        <TitleLabel size="lg" type="required" title="아이디" />
        <div className="cursor-not-allowed opacity-50">
          <InputField
            type="simple"
            name="id"
            value={formInfo.id}
            disabled={true}
            onChange={() => {}}
            placeholder="아이디값"
          />
        </div>
      </Section>
      {/* 전화번호 */}
      <Section>
        <TitleLabel size="lg" type="required" title="전화번호" />
        <div className="flex gap-2">
          <InputField
            type="simple"
            name="phone"
            value={formInfo.phone}
            onChange={(e) => {
              const input = e.target as HTMLInputElement
              let rawValue = input.value.replace(/\D/g, '')
              if (rawValue.length > 11) {
                input.value = rawValue.slice(0, 11)
                rawValue = rawValue.slice(0, 11)
              }
              const formattedValue =
                rawValue.length === 11
                  ? rawValue.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')
                  : rawValue
              input.value = formattedValue
              handleInputChange('phone', rawValue.slice(0, 11))
              updateState('isVerified', false)
              updateState('isPhoneValid', rawValue.length === 11)
            }}
            placeholder="010-1234-5678"
          />
          <Button
            size="md"
            onClick={handleSendAuthCode}
            disabled={
              !state.isPhoneValid || state.isSendingAuthCode || state.isVerified
            }
          >
            인증받기
          </Button>
        </div>
        {state.showVerificationInput && (
          <Section>
            <div className="flex gap-2">
              <InputField
                type="simple"
                name="verificationCode"
                value={state.verificationCode}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    verificationCode: e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 6),
                    isVerificationValid:
                      e.target.value.replace(/\D/g, '').length === 6,
                  }))
                }
                placeholder="인증번호"
                disabled={!state.isVerificationValid}
              />
              <Button
                size="md"
                onClick={handleVerifyAuthCode}
                disabled={!state.isVerificationValid}
              >
                인증하기
              </Button>
            </div>
          </Section>
        )}
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
            onClick={async () => {
              try {
                await testEmail(formInfo.email)
                showToast(
                  '테스트 메일을 전송 했습니다.',
                  'success',
                  'mail-heart'
                )
              } catch (error) {
                showToast(
                  '테스트 메일 전송에 실패했습니다.',
                  'error',
                  'mail-heart'
                )
              }
            }}
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
      <div className="mt-4 border-t border-gray-300" />

      <Section>
        <TitleLabel
          size="sm"
          type="default"
          title="광고 및 이벤트 목적의 개인정보 수집 및 이용 동의"
          description="툭스캔 서비스와 관련된 이벤트 안내, 고객 혜택 등 다양한 정보를 제공합니다."
        />
        <div className="mt-2 flex gap-4">
          <CheckButton
            size="lg"
            isChecked={formInfo.emailConsent}
            onClick={() =>
              setFormInfo((prev) => ({
                ...prev,
                emailConsent: !prev.emailConsent,
              }))
            }
          />
          <span className="self-center">E-Mail 수신 동의 (선택)</span>
          <CheckButton
            size="lg"
            isChecked={formInfo.smsConsent}
            onClick={() =>
              setFormInfo((prev) => ({ ...prev, smsConsent: !prev.smsConsent }))
            }
          />
          <span className="self-center">SMS 수신 동의 (선택)</span>
        </div>
      </Section>

      <Button
        size="lg"
        variant={isChangeButtonEnabled ? 'primary' : 'disabled'}
        disabled={!isChangeButtonEnabled}
        onClick={async () => {
          await handleUpdateInfo()
        }}
        className="mt-4 w-full"
      >
        변경
      </Button>
    </div>
  )
}

export default EditInfoPage
