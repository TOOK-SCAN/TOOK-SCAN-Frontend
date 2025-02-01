import clsx from 'clsx'
import { Icon } from '../Icon/Icon'
import { CheckButton } from '../CheckButton'
import React from 'react'

interface ConsentLabelProps {
  content: string
  consentStatus: boolean
  size: 'sm' | 'lg'
  onClick?: () => void
  moreContent?: string
  onMoreClick?: () => void
}

export const ConsentLabel = ({
  content,
  consentStatus,
  size,
  onClick,
  moreContent,
  onMoreClick,
}: ConsentLabelProps) => {
  return (
    <div className={clsx('flex items-center justify-between py-0.5')}>
      <div
        className={clsx(
          'flex flex-row items-center',
          'font-normal leading-[1.25rem] tracking-[-0.00438rem]',
          'text-black-600',
          size === 'sm' && 'text-2xs',
          size === 'lg' && 'text-sm',
          consentStatus ? 'text-blue-primary' : 'text-black-600'
        )}
      >
        <CheckButton size={size} isChecked={consentStatus} onClick={onClick} />
        <p>{content}</p>
      </div>
      {moreContent && (
        <button
          aria-label="상세 정보 보기"
          title="상세 정보 보기"
          onClick={onMoreClick}
        >
          <Icon id="rightArrow" width={6} height={10} className="text-white" />
        </button>
      )}
    </div>
  )
}
