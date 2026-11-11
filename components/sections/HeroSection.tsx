'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const lines = ['Precizní lakýrnické a', 'karosářské práce v Ostravě']

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0])

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[640px] h-[100svh] max-h-[1000px] w-full items-end overflow-hidden text-foreground"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image
            src="/landingbg3.png"
            alt="Profesionální lakování auta"
            fill
            className="hidden md:block object-cover object-center"
            priority
            quality={75}
            sizes="100vw"
          />
          <Image
            src="/mobilelanding2.png"
            alt="Profesionální lakování auta"
            fill
            className="md:hidden object-cover object-center"
            priority
            quality={75}
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--bg)_0%,rgb(11_11_12/0.82)_28%,rgb(11_11_12/0.25)_62%,rgb(11_11_12/0.55)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(11_11_12/0.7)_0%,transparent_65%)]" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="container-x pb-14 md:pb-20 lg:pb-24">
        <h1 className="text-[clamp(2.3rem,1.4rem+4.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            {...fadeUp(0.6)}
            className="max-w-[46ch] text-base leading-relaxed text-[#c9c9cc] md:text-lg"
          >
            Garantujeme špičkový výsledek díky moderním technologiím a dlouholetým zkušenostem.
            Pro osobní i užitkové vozy.
          </motion.p>

          <motion.div {...fadeUp(0.72)} className="flex flex-col gap-3 sm:flex-row">
            <a href="#poptavka" className="btn btn-primary">
              Nezávazná poptávka
              <ArrowRight size={18} strokeWidth={2} className="btn-arrow" />
            </a>
            <a href="#sluzby" className="btn btn-ghost backdrop-blur-md">
              Naše služby
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
