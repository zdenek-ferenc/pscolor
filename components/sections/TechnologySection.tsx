'use client'

import Image from 'next/image'
import { ShieldCheck, Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

export const TechnologySection = () => {
    return (
        <section className="py-20 bg-[var(--bg-darker)] relative">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal variant="fade-right">
                <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[var(--accent-red)] tracking-tight">
                    Spies Hecker
                </h2>
                
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    Výsledek naší práce musí nejen skvěle vypadat, ale především musí vydržet. Proto se nespoléháme na náhody, 
                    ale na systémová řešení od Spies Hecker, německého lídra v oboru lakování.
                </p>
                
                <p className="text-lg text-gray-400 mb-8 border-l-4 border-[var(--accent-red)] pl-4 italic">
                    Díky jejich technologii a našim zkušenostem máme absolutní kontrolu nad každým detailem procesu.
                </p>

                <div className="space-y-6">
                    {[
                    { icon: ShieldCheck, title: 'Dlouhodobá životnost a odolnost', desc: 'Povrch laku je extrémně odolný vůči UV záření, povětrnostním vlivům i běžnému opotřebení.' },
                    { icon: Sparkles, title: 'Perfektní shoda odstínu a lesk', desc: 'Díky digitálnímu spektrometru a rozsáhlé databázi najdeme a namícháme naprosto přesný odstín vaší barvy.' },
                    ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 glass rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <item.icon className="w-8 h-8 text-[var(--accent-red)] flex-shrink-0 mt-1" strokeWidth={1.5} />
                        <div>
                        <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left">
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <Image
                    src="/spies-hecker.jpg" 
                    alt="Produkty Spies Hecker"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={65}
                    className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
            </ScrollReveal>
            </div>
        </div>
        </section>
    )
    }