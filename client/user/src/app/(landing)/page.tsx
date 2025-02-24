'use client'
import { useState } from 'react'
import HomeSection from './_components/HomeSection'
import HowToUseSection from './_components/HowToUseSection'
import NavBar from './_components/Navbar'
import PricingSection from './_components/PricingSection'

export default function Landing() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div>
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'home' && <HomeSection />}
      {activeTab === 'howToUse' && <HowToUseSection />}
      {activeTab === 'pricing' && <PricingSection />}
    </div>
  )
}
