import Image from 'next/image'

interface CardProps {
  title: string
  description: string
  imgSrc: string
  alt: string
  imgWidth?: number
  imgHeight?: number
  containerClassName?: string
  imageWrapperClassName?: string
}

export const Card = ({
  title,
  description,
  imgSrc,
  alt,
  imgWidth = 100,
  imgHeight = 100,
  containerClassName = '',
  imageWrapperClassName = '',
}: CardProps) => {
  return (
    <div
      className={`flex max-h-[23rem] min-h-[25rem] max-w-[23rem] flex-1 flex-col overflow-hidden rounded-xl bg-[#F2F7FF] shadow-sm md:flex-col ${containerClassName}`}
    >
      <div className="p-6">
        <h3 className="mb-2 btn1">{title}</h3>
        <p className="mb-4 text-gray-700 body2">{description}</p>
      </div>
      <div
        className={`relative flex h-40 items-end justify-center ${imageWrapperClassName}`}
      >
        <Image src={imgSrc} alt={alt} width={imgWidth} height={imgHeight} />
      </div>
    </div>
  )
}
