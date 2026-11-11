'use client'

import Image from 'next/image'
import { ShieldCheck, Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

const features = [
  {
    icon: ShieldCheck,
    title: 'Dlouhodobá životnost a odolnost',
    desc: 'Povrch laku je extrémně odolný vůči UV záření, povětrnostním vlivům i běžnému opotřebení.',
  },
  {
    icon: Sparkles,
    title: 'Perfektní shoda odstínu a lesk',
    desc: 'Díky digitálnímu spektrometru a rozsáhlé databázi najdeme a namícháme naprosto přesný odstín vaší barvy.',
  },
]

export const TechnologySection = () => {
  return (
    <section className="relative border-t border-line bg-sunken py-20 md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-7">
            <h2 className="text-[clamp(2.75rem,1.6rem+4.6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-foreground">
              Spies Hecker
            </h2>
            <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted">
              Výsledek naší práce musí nejen skvěle vypadat, ale především musí vydržet. Proto se nespoléháme na náhody,
              ale na systémová řešení od Spies Hecker, německého lídra v oboru lakování.
            </p>
            <blockquote className="mt-8 max-w-[48ch] border-l-2 border-accent pl-5 text-lg leading-relaxed text-foreground md:text-xl">
              Díky jejich technologii a našim zkušenostem máme absolutní kontrolu nad každým detailem procesu.
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-5">
            <div className="group relative aspect-[565/336] w-full overflow-hidden rounded-[20px] bg-raised">
              <Image
                src="/spies-hecker.jpg"
                alt="Produkty Spies Hecker"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                quality={80}
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 md:mt-20 md:grid-cols-2">
          {features.map((item, idx) => (
            <ScrollReveal key={item.title} delay={0.08 * idx}>
              <div className="flex h-full gap-5 border-t border-line-strong pt-8 pb-8 md:pb-0">
                <item.icon className="mt-1 h-6 w-6 flex-shrink-0 text-accent" strokeWidth={1.75} />
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                  <p className="mt-2 max-w-[46ch] leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
