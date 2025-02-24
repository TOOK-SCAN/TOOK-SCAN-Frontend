interface FeatureBoxProps {
  title: string
  description: string
}

export const FeatureBox = ({ title, description }: FeatureBoxProps) => {
  return (
    <div className="flex w-full max-w-[35rem] items-center justify-between rounded-lg bg-blue-secondary px-4 py-3">
      <h2 className="font-medium text-gray-600 h2">{title}</h2>
      <h3 className="font-semibold text-blue-primary h3">{description}</h3>
    </div>
  )
}
