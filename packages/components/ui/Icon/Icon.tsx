interface IconProps {
  id: string
  width?: number
  height?: number
  className?: string
}

export const Icon = ({ id, width, height, className }: IconProps) => {
  return (
    <svg
      {...(width ? { width: `${width}px` } : {})}
      {...(height ? { height: `${height}px` } : {})}
      className={`fill-current ${className || ''}`}
      aria-hidden="true"
    >
      <use xlinkHref={`#${id}`} />
    </svg>
  )
}
