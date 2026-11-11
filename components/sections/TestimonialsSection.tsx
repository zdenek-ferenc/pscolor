'use client'

import { ScrollReveal } from '@/components/ScrollReveal'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

const testimonials = [
  {
    quote:
      'Autolakovnu mi doporučil kamarád a udělal dobře. Oprava proběhla rychle, bez zbytečného čekání, a výsledek je fakt špičkový. Oceňuju i přátelský přístup.',
    author: 'Dominik D.',
  },
  {
    quote:
      'Velká spokojenost! Moje auto které bylo havarované a pojištěné u České pojišťovny, bylo opravené rychle a kvalitně! Doporučuji!',
    author: 'Radomír M.',
  },
]

export const TestimonialsSection = () => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container-x">
        <ScrollReveal>
          <h2 className="section-title max-w-[16ch]">
            Co o nás říkají <span className="text-accent">zákazníci</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-2 md:gap-0">
          {testimonials.map((t, idx) => (
            <ScrollReveal
              key={t.author}
              delay={0.1 * idx}
              className={idx === 0 ? 'md:pr-12 lg:pr-16' : 'border-t border-line pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-16'}
            >
              <TestimonialCard quote={t.quote} author={t.author} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
