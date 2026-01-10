'use client'

import { Paintbrush, Car, FileText } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ServiceCard } from '@/components/ui/ServiceCard'

export const ServicesSection = () => {
    return (
        <section id="sluzby" className="pb-20 py-12 sm:py-20 bg-[var(--bg-dark)] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
            <ScrollReveal variant="fade-up">
            <h2 className="uppercase text-3xl md:text-5xl text-[var(--accent-red)] font-extrabold mb-4 tracking-tight">
                Naše služby
            </h2>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-16">
                Specializujeme se na komplexní opravy, které vrátí vašemu vozu původní kondici a vzhled.
            </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <ScrollReveal variant="fade-up" delay={0.2}>
                <ServiceCard icon={<Paintbrush size={40} strokeWidth={1.5} />} title="Profesionální lakování">
                Zajišťujeme dokonalé lakování. Používáme prémiové laky a vlastní míchárnu barev pro 100% shodu odstínu.
                </ServiceCard>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.3}>
                <ServiceCard icon={<Car size={40} strokeWidth={1.5} />} title="Karosářské práce">
                Kompletní opravy karoserií po nehodách. Moderní vybavení pro přesné slícování a pevnost.
                </ServiceCard>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-up" delay={0.4}>
                <ServiceCard icon={<FileText size={40} strokeWidth={1.5} />} title="Pojistné události">
                Smluvní servis pojišťoven. Administrativu vyřešíme za vás a půjčíme náhradní vůz.
                </ServiceCard>
            </ScrollReveal>
            </div>
        </div>
        </section>
    )
    }