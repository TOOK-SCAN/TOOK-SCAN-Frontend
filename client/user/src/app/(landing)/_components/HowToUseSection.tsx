'use client'

import { useEffect, useRef } from 'react'
import Hero from '../_components/HowToUse/Hero'
import Mobile from '../_components/HowToUse/Mobile'
import HowItWorks from './HowToUse/HowItWorks'

const HowToUseSection = () => {
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
      <Hero />
      <Mobile />
      <HowItWorks />
    </div>
  )
}

export default HowToUseSection
