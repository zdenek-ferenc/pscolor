import { getImageProps } from 'next/image'
import { preload } from 'react-dom'
import { ArrowRight } from 'lucide-react'
import { HeroParallax } from '@/components/sections/HeroParallax'

const lines = ['Precizní lakýrnické a', 'karosářské práce v Ostravě']

// Art direction: one <picture>, so the phone downloads only the portrait photo and the
// desktop only the landscape one (two <Image priority> used to preload both everywhere).
const shared = { alt: 'Profesionální lakování auta', fill: true, quality: 75, sizes: '100vw', priority: true } as const
const {
  props: { srcSet: desktopSrcSet, src: desktopSrc },
} = getImageProps({ ...shared, src: '/hero-desktop.webp' })
const { props: mobileImg } = getImageProps({ ...shared, src: '/hero-mobile.webp' })

// Server component: the headline, copy and photo are in the HTML and their intro runs on CSS,
// so nothing above the fold waits for JavaScript (the old motion intro held LCP back ~1.5 s).
export const HeroSection = () => {
  // Preload only the photo that matches the viewport, at high priority (it is the LCP element).
  preload(mobileImg.src, {
    as: 'image',
    imageSrcSet: mobileImg.srcSet,
    imageSizes: '100vw',
    media: '(max-width: 767px)',
    fetchPriority: 'high',
  })
  preload(desktopSrc, {
    as: 'image',
    imageSrcSet: desktopSrcSet,
    imageSizes: '100vw',
    media: '(min-width: 768px)',
    fetchPriority: 'high',
  })

  return (
    <section className="hero relative isolate flex min-h-[600px] h-[88svh] max-h-[860px] w-full items-end overflow-hidden text-foreground">
      <HeroParallax>
        <picture className="hero-photo absolute inset-0 block">
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img
            {...mobileImg}
            fetchPriority="high"
            loading="eager"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--bg)_0%,rgb(11_11_12/0.82)_28%,rgb(11_11_12/0.25)_62%,rgb(11_11_12/0.55)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(11_11_12/0.7)_0%,transparent_65%)]" />
      </HeroParallax>

      <div className="container-x pb-14 md:pb-20 lg:pb-24">
        <h1 className="text-[clamp(2.3rem,1.4rem+4.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line block" style={{ animationDelay: `${80 + i * 90}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            className="hero-fade max-w-[46ch] text-base leading-relaxed text-[#c9c9cc] md:text-lg"
            style={{ animationDelay: '260ms' }}
          >
            Garantujeme špičkový výsledek díky moderním technologiím a dlouholetým zkušenostem.
            Pro osobní i užitkové vozy.
          </p>

          <div className="hero-fade flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '340ms' }}>
            <a href="#poptavka" className="btn btn-primary">
              Nezávazná poptávka
              <ArrowRight size={18} strokeWidth={2} className="btn-arrow" />
            </a>
            <a href="#sluzby" className="btn btn-ghost backdrop-blur-md">
              Naše služby
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
