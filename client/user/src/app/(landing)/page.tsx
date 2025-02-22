'use client'
import HomeSection from './_components/HomeSection'
import HowToUseSection from './_components/HowToUseSection'
import PricingSection from './_components/PricingSection'
import { useLandingStore } from './useLandingStore'

const Landing = () => {
  const { activeTab, setActiveTab } = useLandingStore()

  return (
    <div>
      {/* 🔹 네비게이션 바 */}
      <nav className="flex h-[7rem] items-center justify-center space-x-[1rem] bg-black text-white title2">
        <button
          onClick={() => setActiveTab('home')}
          className={
            activeTab === 'home'
              ? 'relative px-4 py-2 text-white transition-colors duration-300 after:absolute after:bottom-[-1.75rem] after:left-0 after:h-[4px] after:w-full after:bg-transparent hover:text-blue-primary hover:after:bg-blue-primary'
              : 'text-white'
          }
        >
          툭스캔은?
        </button>
        <button
          onClick={() => setActiveTab('howToUse')}
          className={
            activeTab === 'howToUse'
              ? 'relative px-4 py-2 text-white transition-colors duration-300 after:absolute after:bottom-[-1.75rem] after:left-0 after:h-[4px] after:w-full after:bg-transparent hover:text-blue-primary hover:after:bg-blue-primary'
              : 'text-white'
          }
        >
          이용방법
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={
            activeTab === 'pricing'
              ? 'relative px-4 py-2 text-white transition-colors duration-300 after:absolute after:bottom-[-1.75rem] after:left-0 after:h-[4px] after:w-full after:bg-transparent hover:text-blue-primary hover:after:bg-blue-primary'
              : 'text-white'
          }
        >
          가격안내
        </button>
      </nav>

      <main>
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'howToUse' && <HowToUseSection />}
        {activeTab === 'pricing' && <PricingSection />}
      </main>
    </div>
  )
}

export default Landing
