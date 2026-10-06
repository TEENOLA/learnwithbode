import { useState } from 'react'
import type { ServiceNeed } from './data/content'
import Classes from './components/Classes'
import EnquiryForm from './components/EnquiryForm'
import FindATutor from './components/FindATutor'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import SineExplainer from './components/SineExplainer'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import TutorSection from './components/TutorSection'
import WhatWeTeach from './components/WhatWeTeach'
import WhyLwb from './components/WhyLwb'

export default function App() {
  const [selectedNeed, setSelectedNeed] = useState<ServiceNeed>('general')

  return (
    <>
      <a
        href="#main"
        className="absolute left-2 top-2 z-50 -translate-y-20 rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header onChooseNeed={setSelectedNeed} />
      <main id="main">
        <Hero onChooseNeed={setSelectedNeed} />
        <WhatWeTeach />
        <WhyLwb />
        <SineExplainer />
        <Classes onChooseNeed={setSelectedNeed} />
        <TutorSection />
        <Testimonials />
        <HowItWorks />
        <FindATutor onChooseNeed={setSelectedNeed} />
        <Faq />
        <EnquiryForm selectedNeed={selectedNeed} onChangeNeed={setSelectedNeed} />
      </main>
      <Footer />
    </>
  )
}
