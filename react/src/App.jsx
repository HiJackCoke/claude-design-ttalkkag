import { useEffect } from 'react'
import GalaxyBackground from './components/background/GalaxyBackground'
import Navbar from './components/Navbar'
import HUD from './components/HUD'
import TweaksPanel from './components/TweaksPanel'
import HeroSection from './components/sections/HeroSection'
import SignalSection from './components/sections/SignalSection'
import MissionSection from './components/sections/MissionSection'
import SolutionSection from './components/sections/SolutionSection'
import CTASection from './components/sections/CTASection'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()

  useEffect(() => {
    document.documentElement.style.setProperty('--starfield-density', '1')
    document.documentElement.style.setProperty('--vignette-intensity', '0.75')
  }, [])

  return (
    <>
      <GalaxyBackground />
      <div className="vignette"></div>

      <Navbar />
      <HUD />
      <TweaksPanel />

      <main>
        <HeroSection />
        <SignalSection />
        <MissionSection />
        <SolutionSection />
        <CTASection />
      </main>

      <Footer />
    </>
  )
}
