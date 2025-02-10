import { Icon, useToast } from '@tookscan/components'

interface SuccessFieldProps {
  copyData: string
}

export const SuccessField = ({ copyData }: SuccessFieldProps) => {
  const showToast = useToast()
  return (
    <div className="flex w-80 items-center justify-between rounded-2xl bg-blue-secondary px-6 py-4">
      <p className="body2">{copyData}</p>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(copyData)
            showToast('클립보드에 복사되었습니다.', 'success', 'check')
          } catch (err) {
            showToast(
              '클립보드에 복사를 실패했습니다.: ' + err,
              'error',
              'warning-2'
            )
          }
        }}
      >
        <Icon id="duplicate" width={20} height={20} />
      </button>
    </div>
  )
}
