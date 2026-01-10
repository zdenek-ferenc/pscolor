import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { WorkShowcaseSection } from '@/components/sections/WorkShowcaseSection' 
import { TechnologySection } from '@/components/sections/TechnologySection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection' 

export const metadata = {
  title: 'P.S.Color | Autolakovna Ostrava',
  description: 'Precizní lakýrnické a karosářské práce v Ostravě. Spies Hecker technologie, vyřízení pojistných událostí.',
}

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-[var(--bg-darker)]">
      
      <HeroSection />      
      <ServicesSection />      
      <WhyUsSection />      
      <WorkShowcaseSection />
      <TechnologySection />
      <TestimonialsSection />
      <CtaSection />
      
    </main>
  )
}