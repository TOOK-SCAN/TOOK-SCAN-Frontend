import clsx from 'clsx'

interface HelperLabelProps {
  size: 'lg' | 'sm'
  type: 'disabled' | 'default' | 'error' | 'success'
  children?: React.ReactNode
}

export const HelperLabel = ({ size, type, children }: HelperLabelProps) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center px-[0.25rem] py-[0.125rem]',
        size === 'lg' && 'text-xs',
        size === 'sm' && 'text-2xs',
        type === 'default' && 'text-black-600',
        type === 'disabled' && 'text-black-200',
        type === 'error' && 'text-status-error',
        type === 'success' && 'text-status-success'
      )}
    >
      {children}
    </div>
  )
}
