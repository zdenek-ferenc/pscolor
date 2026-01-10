'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/ScrollReveal'

export const HeroSection = () => {
    return (
        <section className="relative w-full h-[600px] md:h-[800px] sm:min-h-screen flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="hidden md:block absolute inset-0">
            <Image
            src="/landingbg3.png"
            alt="Profesionální lakování auta"
            fill
            className="object-cover"
            priority
            quality={75} 
            sizes="100vw"
            />
            </div>

            <div className="block md:hidden absolute inset-0">
            <Image
            src="/mobilelanding2.png"
            alt="Profesionální lakování auta"
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="100vw"
            />
            </div>

            
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-22 sm:py-32 text-center">
            <ScrollReveal variant="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                Precizní lakýrnické a <br className="hidden sm:block" /> karosářské práce v Ostravě
            </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 mb-10 leading-relaxed font-light">
                Garantujeme špičkový výsledek díky moderním technologiím a dlouholetým zkušenostem.
                Pro osobní i užitkové vozy.
            </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.2}>
            <div className="flex justify-center gap-10 md:gap-6 flex-wrap">
                <a 
                href="#poptavka"
                className="px-8 py-4 bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg shadow-red-900/20 hover:shadow-red-900/40"
                >
                Nezávazná poptávka
                </a>
                
                <a 
                href="#sluzby"
                className="px-8 py-4 glass border-2 border-white/10 hover:border-white/30 text-white font-bold text-lg rounded-full transition-all duration-300 hover:bg-white/5"
                >
                Naše služby
                </a>
            </div>
            </ScrollReveal>
        </div>
        </section>
    )
    }