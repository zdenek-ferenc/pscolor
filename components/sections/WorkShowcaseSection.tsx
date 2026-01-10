'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ScannerComparison } from '@/components/ui/ScannerComparison'

export const WorkShowcaseSection = () => {
    return (
        <section className="py-16 md:py-24 bg-[var(--bg-dark)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
            <ScrollReveal variant="fade-up">
            <h2 className="text-[var(--accent-red)] text-3xl md:text-5xl font-extrabold uppercase mb-4 tracking-tight">
                Naše práce mluví za vše
            </h2>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16 font-light">
                Podívejte se na reálné proměny vozů, které prošly našima rukama.
            </p>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto mb-8">
            <ScrollReveal variant="fade-up" delay={0.2}>
                <ScannerComparison
                beforeImage="/ford1.jpg"
                afterImage="/ford2.jpg"
                beforeAlt="Ford před opravou"
                afterAlt="Ford po opravě"
                title="Oprava čelní části Fordu po nehodě"
                />
            </ScrollReveal>
            </div>

            <ScrollReveal variant="fade-up" delay={0.1}>
            <button>
                <Link 
                href="/galerie" 
                className="inline-flex items-center gap-3 text-white px-10 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20"
                >
                Prohlédnout celou galerii
                </Link>
            </button>
            </ScrollReveal>
        </div>
        </section>
    )
    }