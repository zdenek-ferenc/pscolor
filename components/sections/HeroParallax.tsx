'use client'

import { useEffect, useRef } from 'react'

// Background layer of the hero: drifts down slightly as the page scrolls.
// Plain rAF + transform (no animation library), skipped for reduced motion.
export const HeroParallax = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const h = el.parentElement?.offsetHeight || window.innerHeight
      const y = window.scrollY
      if (y > h) return
      el.style.transform = `translate3d(0, ${(y / h) * 18}%, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 -z-10 will-change-transform">
      {children}
    </div>
  )
}
