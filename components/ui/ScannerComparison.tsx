'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScannerComparisonProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  title: string
  /**
   * Transform applied to the "after" photo so the car lines up with the "before" shot.
   * Origin is in the photo's own coordinates (photos are square, shown as object-cover).
   */
  afterAlign?: { transform: string; origin: string }
}

export const ScannerComparison = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  title,
  afterAlign,
}: ScannerComparisonProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const stopHintRef = useRef<() => void>(() => {})
  const reduce = useReducedMotion()
  const inView = useInView(containerRef, { once: true, amount: 0.6 })
  const position = useMotionValue(50)
  const [ariaValue, setAriaValue] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const clipPath = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`)
  const left = useTransform(position, (p) => `${p}%`)

  useMotionValueEvent(position, 'change', (p) => {
    const rounded = Math.round(p)
    setAriaValue((prev) => (prev === rounded ? prev : rounded))
  })

  // Small hint that the image can be dragged, plays once on first view.
  // A hand-rolled tween keeps the full animation engine out of this page's bundle.
  useEffect(() => {
    if (!inView || reduce) return
    const keys = [50, 36, 62, 50]
    const duration = 2200
    const delay = 400
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    let frame = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now + delay
      const t = Math.min(1, Math.max(0, (now - start) / duration))
      const seg = Math.min(keys.length - 2, Math.floor(t * (keys.length - 1)))
      const local = t * (keys.length - 1) - seg
      position.set(keys[seg] + (keys[seg + 1] - keys[seg]) * ease(local))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    stopHintRef.current = () => cancelAnimationFrame(frame)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, position])

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    stopHintRef.current()
    position.set(Math.max(0, Math.min(100, pct)))
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    setFromClientX(e.clientX)
  }

  const stop = () => {
    draggingRef.current = false
    setIsDragging(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4
    stopHintRef.current()
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      position.set(Math.max(0, position.get() - step))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      position.set(Math.min(100, position.get() + step))
    }
  }

  return (
    <figure className="select-none">
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label={`${title}: porovnání před a po opravě`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValue}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        onKeyDown={onKeyDown}
        className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-[20px] bg-raised sm:aspect-[16/10]"
      >
        {/* Square frame = object-cover crop for a square photo in a landscape box,
            so alignment origins stay correct at every aspect ratio. */}
        <div className="absolute inset-x-0 top-1/2 aspect-square -translate-y-1/2">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 960px) 100vw, 920px"
            quality={65}
            className="pointer-events-none object-cover"
            style={afterAlign ? { transform: afterAlign.transform, transformOrigin: afterAlign.origin } : undefined}
            draggable={false}
          />
        </div>

        <m.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath }}>
          <div className="absolute inset-x-0 top-1/2 aspect-square -translate-y-1/2">
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              sizes="(max-width: 960px) 100vw, 920px"
              quality={65}
              className="pointer-events-none object-cover"
              draggable={false}
            />
          </div>
        </m.div>

        <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md md:bottom-6 md:left-6 md:text-sm">
          Před opravou
        </span>
        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#0b0b0c] backdrop-blur-md md:bottom-6 md:right-6 md:text-sm">
          Po opravě
        </span>

        <m.div
          className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgb(0_0_0/0.15)]"
          style={{ left }}
        />
        <m.div
          className="pointer-events-none absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left }}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center gap-0.5 rounded-full bg-white text-[#0b0b0c] shadow-[0_8px_30px_rgb(0_0_0/0.35)] transition-transform duration-300 md:h-12 md:w-12 ${
              isDragging ? 'scale-110' : ''
            }`}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            <ChevronRight size={16} strokeWidth={2.5} />
          </div>
        </m.div>
      </div>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  )
}
