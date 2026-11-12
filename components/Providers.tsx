'use client'

import { useEffect } from 'react'
import { LazyMotion } from 'motion/react'

const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default)

// App-wide client wrapper:
// - LazyMotion: components use the tiny `m.*` elements; the animation engine loads in a separate chunk.
// - Lenis smooth scrolling only for mouse/trackpad users, imported lazily once the page is idle,
//   so phones never download or run it.
export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let destroy: (() => void) | undefined

    const start = async () => {
      const { default: Lenis } = await import('lenis')
      if (cancelled) return
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: { offset: -88 },
      })
      let frame = 0
      const raf = (time: number) => {
        lenis.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
      destroy = () => {
        cancelAnimationFrame(frame)
        lenis.destroy()
      }
    }

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
    const handle = idle(() => void start())

    return () => {
      cancelled = true
      if (window.cancelIdleCallback && typeof handle === 'number') window.cancelIdleCallback(handle)
      destroy?.()
    }
  }, [])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  )
}
