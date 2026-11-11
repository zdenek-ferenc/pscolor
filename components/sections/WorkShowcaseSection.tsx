'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ScannerComparison } from '@/components/ui/ScannerComparison'

export const WorkShowcaseSection = () => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container-x">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">Naše práce mluví za vše</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Podívejte se na reálné proměny vozů, které prošly našima rukama.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-12 max-w-[920px] md:mt-16">
          <ScrollReveal delay={0.1}>
            <ScannerComparison
              beforeImage="/ford1.jpg"
              afterImage="/ford2.jpg"
              beforeAlt="Ford před opravou"
              afterAlt="Ford po opravě"
              title="Oprava čelní části Fordu po nehodě"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <p className="text-base text-muted">Oprava čelní části Fordu po nehodě</p>
              <Link href="/galerie" className="btn btn-ghost">
                Prohlédnout celou galerii
                <ArrowRight size={18} strokeWidth={2} className="btn-arrow" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
