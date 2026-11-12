'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

// Natural pixel ratios of the photos in /public/photos (keeps the masonry layout CLS-free).
const dimensions: Record<number, [number, number]> = {
  1: [3, 4],
  2: [3, 4],
  3: [4, 3],
  4: [4, 3],
  5: [3, 4],
  6: [3, 4],
  7: [1179, 917],
  8: [1179, 1539],
  9: [1179, 1570],
  10: [1179, 1563],
}

const galleryItems = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  src: `/photos/${i + 1}.webp`,
  alt: `Realizace PS Color ${i + 1}`,
  w: dimensions[i + 1][0],
  h: dimensions[i + 1][1],
}))

const ease = [0.16, 1, 0.3, 1] as const

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '60%' : direction < 0 ? '-60%' : 0,
    opacity: 0,
    scale: direction === 0 ? 0.96 : 1,
  }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '60%' : '-60%',
    opacity: 0,
  }),
}

const transitionSettings = {
  x: { type: 'tween' as const, ease: [0.32, 0.72, 0, 1] as const, duration: 0.55 },
  opacity: { duration: 0.3 },
  scale: { duration: 0.5, ease },
}

export default function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const nextIndex = index !== null ? (index + 1) % galleryItems.length : null
  const prevIndex = index !== null ? (index - 1 + galleryItems.length) % galleryItems.length : null

  const changeImage = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setIndex((prev) => {
      if (prev === null) return null
      const n = prev + newDirection
      if (n < 0) return galleryItems.length - 1
      if (n >= galleryItems.length) return 0
      return n
    })
  }, [])

  const goToImage = (newIndex: number) => {
    if (index === null) return
    setDirection(newIndex > index ? 1 : -1)
    setIndex(newIndex)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return
      if (e.key === 'ArrowLeft') changeImage(-1)
      if (e.key === 'ArrowRight') changeImage(1)
      if (e.key === 'Escape') setIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, changeImage])

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    if (index === null) return
    const html = document.documentElement
    html.classList.add('lenis-stopped')
    html.style.overflow = 'hidden'
    return () => {
      html.classList.remove('lenis-stopped')
      html.style.overflow = ''
    }
  }, [index])

  useEffect(() => {
    if (index !== null && thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[index] as HTMLElement
      activeThumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [index])

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      {index !== null && (
        <div className="pointer-events-none fixed inset-0 z-[-1] opacity-0" aria-hidden="true">
          {nextIndex !== null && (
            <Image src={galleryItems[nextIndex].src} alt="" width={100} height={100} quality={85} sizes="100vw" />
          )}
          {prevIndex !== null && (
            <Image src={galleryItems[prevIndex].src} alt="" width={100} height={100} quality={85} sizes="100vw" />
          )}
        </div>
      )}

      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-x">
          <div className="max-w-3xl">
            <m.p {...fadeUp(0)} className="text-sm font-medium text-dim">
              Fotogalerie
            </m.p>
            <h1 className="mt-4 overflow-hidden pb-[0.06em] text-[clamp(2.75rem,1.6rem+4.6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              <m.span
                className="block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.1, ease }}
              >
                Naše <span className="text-accent">práce</span>
              </m.span>
            </h1>
            <m.p {...fadeUp(0.25)} className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
              Detailní pohled na naše realizace. Preciznost v každém kroku.
            </m.p>
          </div>

          <div className="mt-14 columns-1 gap-4 sm:columns-2 md:mt-20 lg:columns-3 lg:gap-5">
            {galleryItems.map((item, i) => (
              <m.button
                key={item.id}
                type="button"
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
                onClick={() => {
                  setDirection(0)
                  setIndex(i)
                }}
                aria-label={`Otevřít fotografii ${i + 1}`}
                className="group relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-[20px] bg-raised break-inside-avoid lg:mb-5"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.w * 100}
                  height={item.h * 100}
                  className="h-auto w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={60}
                  priority={i === 0}
                />
                <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
                <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-[#0b0b0c] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  <Plus size={20} strokeWidth={2} />
                </span>
              </m.button>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {index !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[rgb(8_8_9/0.96)] backdrop-blur-md"
            onClick={() => setIndex(null)}
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
            aria-label="Fotogalerie"
          >
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-[120] flex items-center justify-between p-4 md:p-6">
              <span className="pointer-events-auto tabular-nums text-sm text-muted">
                {index + 1} / {galleryItems.length}
              </span>
              <button
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-foreground transition-colors hover:bg-white/10"
                onClick={() => setIndex(null)}
                aria-label="Zavřít"
              >
                <X size={20} />
              </button>
            </div>

            <button
              className="absolute left-6 top-1/2 z-[110] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong text-foreground transition-colors hover:border-accent hover:bg-accent lg:flex"
              onClick={(e) => {
                e.stopPropagation()
                changeImage(-1)
              }}
              aria-label="Předchozí fotografie"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              className="absolute right-6 top-1/2 z-[110] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong text-foreground transition-colors hover:border-accent hover:bg-accent lg:flex"
              onClick={(e) => {
                e.stopPropagation()
                changeImage(1)
              }}
              aria-label="Další fotografie"
            >
              <ChevronRight size={22} />
            </button>

            <div
              className="relative flex h-full w-full flex-grow items-center justify-center overflow-hidden p-4 pt-20 sm:p-8 sm:pt-20 lg:px-24"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <m.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transitionSettings}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, { offset }) => {
                    if (offset.x < -50) changeImage(1)
                    else if (offset.x > 50) changeImage(-1)
                  }}
                  className="absolute flex h-full max-h-[72vh] w-full cursor-grab items-center justify-center active:cursor-grabbing md:max-h-[78vh]"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={galleryItems[index].src}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="100vw"
                      quality={10}
                      priority
                    />
                    <Image
                      src={galleryItems[index].src}
                      alt={galleryItems[index].alt}
                      fill
                      className="pointer-events-none select-none object-contain"
                      priority
                      quality={85}
                      sizes="100vw"
                    />
                  </div>
                </m.div>
              </AnimatePresence>
            </div>

            <div className="z-[120] h-auto w-full px-4 pb-6 pt-2" onClick={(e) => e.stopPropagation()}>
              <div
                ref={thumbnailsRef}
                className="no-scrollbar flex justify-start gap-2 overflow-x-auto px-2 pb-2 md:justify-center md:gap-3 md:px-0"
                style={{ scrollBehavior: 'smooth' }}
              >
                {galleryItems.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => goToImage(i)}
                    aria-label={`Zobrazit fotografii ${i + 1}`}
                    className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 md:h-16 md:w-24 ${
                      i === index
                        ? 'opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-[#08080a]'
                        : 'opacity-40 hover:opacity-90'
                    }`}
                  >
                    <Image src={item.src} alt="" fill className="object-cover" sizes="150px" quality={50} />
                  </button>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
