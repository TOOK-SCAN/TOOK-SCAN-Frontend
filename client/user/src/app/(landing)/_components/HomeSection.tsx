'use client'
import { useEffect, useRef } from 'react'

import Anywhere from './HomeSection/Anywhere'
import Apply from './HomeSection/Apply'
import Exclusive from './HomeSection/Exclusive'
import TookScanHeroSection from './HomeSection/Hero'
import Merit from './HomeSection/Merit'
import PainPoints from './HomeSection/PainPoints'
import Service from './HomeSection/Service'
import TimeComparison from './HomeSection/TimeComparison'

const HomeSection = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const slider = sliderRef.current as unknown as HTMLElement
    let animationFrame: number

    const scroll = () => {
      if (slider) {
        slider.scrollLeft += 1
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0 // 무한 루프
        }
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div>
      <TookScanHeroSection />

      <Service />
      <TimeComparison />
      <Merit />

      <PainPoints />
      <Exclusive />
      <Anywhere />

      <Apply />
    </div>
  )
}

export default HomeSection
