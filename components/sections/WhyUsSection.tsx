'use client'

import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

export const WhyUsSection = () => {
    return (
        <section className="py-20 bg-[var(--bg-darker)] relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <ScrollReveal variant="fade-right">
            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                <Image 
                src="/why.jpg" 
                alt="Detailní práce na autě" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={65}
                className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />
            </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left">
            <div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-[var(--accent-red)] uppercase tracking-tight">
                Proč svěřit vůz právě nám?
                </h2>
                
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Naše práce je naší vizitkou. Zakládáme si na preciznosti, transparentnosti a osobním přístupu ke každé zakázce.
                </p>

                <ul>
                {[
                    { title: 'Zkušenosti, které mluví za vše:', text: 'S více než 15 lety praxe v oboru se nezalekneme žádné výzvy.' },
                    { title: 'Moderní technologie a materiály:', text: 'Investujeme do špičkového vybavení a používáme pouze prémiové materiály.' },
                    { title: 'Servis od A do Z bez starostí:', text: 'Od nahlášení škody, přes pojišťovnu, po zapůjčení náhradního vozu.' },
                ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/5">
                    <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-[var(--accent-red)] flex-shrink-0 mt-1" strokeWidth={2} />
                    <span className="text-gray-200 md:text-lg">
                        <span className="font-bold text-white block mb-0.5">{item.title}</span>
                        <span className="text-gray-400">{item.text}</span>
                    </span>
                    </li>
                ))}
                </ul>
            </div>
            </ScrollReveal>
        </div>
        </section>
    )
}