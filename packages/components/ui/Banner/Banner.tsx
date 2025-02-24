import ApplyBanner from './ApplyBanner'
import TookBanner from './TookBanner'

interface BannerProps {
  type: 1 | 3
}

export const Banner = ({ type }: BannerProps) => {
  return (
    <div className="w-full">
      {type === 1 && <TookBanner />}

      {type === 3 && <ApplyBanner />}
    </div>
  )
}
