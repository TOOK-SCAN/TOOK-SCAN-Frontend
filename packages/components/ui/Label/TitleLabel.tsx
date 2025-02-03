import clsx from 'clsx'

interface TitleLabelProps {
  size: 'lg' | 'sm'
  type: 'default' | 'required' | 'disabled'
  title: string
  description?: string
}

export const TitleLabel = ({
  size,
  type,
  title,
  description,
}: TitleLabelProps) => {
  return (
    <div
      className={clsx(
        'inline-flex flex-col items-start p-2',
        size === 'lg' && 'gap-2',
        size === 'sm' && 'gap-1'
      )}
    >
      <h2
        className={clsx(
          'flex gap-1 font-semibold leading-[1.5rem] tracking-[-0.00281rem]',
          size === 'lg' && 'text-lg',
          size === 'sm' && 'text-base',
          type === 'disabled' && 'text-black-200',
          type !== 'disabled' && 'text-black-800'
        )}
      >
        <span>{title}</span>
        {type === 'required' && <span className="text-blue-primary">*</span>}
      </h2>
      {description && (
        <p
          className={clsx(
            'text-black-600',
            size === 'lg' && 'text-xs',
            size === 'sm' && 'text-2xs'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
