'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Check } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

const reasons = [
  { title: 'Zkušenosti, které mluví za vše', text: 'S více než 15 lety praxe v oboru se nezalekneme žádné výzvy.' },
  { title: 'Moderní technologie a materiály', text: 'Investujeme do špičkového vybavení a používáme pouze prémiové materiály.' },
  { title: 'Servis od A do Z bez starostí', text: 'Od nahlášení škody, přes pojišťovnu, po zapůjčení náhradního vozu.' },
]

export const WhyUsSection = () => {
  const imageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%'])

  return (
    <section className="relative border-t border-line bg-sunken py-20 md:py-32">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <ScrollReveal className="lg:col-span-5">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-raised max-lg:max-h-[560px] max-lg:aspect-[4/3.6]"
          >
            <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src="/why.jpg"
                alt="Detailní práce na autě"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={65}
                className="object-cover"
              />
            </motion.div>
          </div>
        </ScrollReveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <ScrollReveal>
            <h2 className="section-title max-w-[14ch]">Proč svěřit vůz právě nám?</h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
              Naše práce je naší vizitkou. Zakládáme si na preciznosti, transparentnosti a osobním přístupu ke každé zakázce.
            </p>
          </ScrollReveal>

          <ul className="mt-10 md:mt-12">
            {reasons.map((item, idx) => (
              <ScrollReveal
                as="li"
                key={item.title}
                delay={0.08 * idx}
                className="group grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-6 last:border-b"
              >
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent/12 text-accent ring-1 ring-accent/30 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p>
                  </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
