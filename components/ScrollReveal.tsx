'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
}

// One IntersectionObserver shared by every reveal on the page; the fade itself is a CSS
// transition (.reveal in globals.css), so this costs a few hundred bytes instead of an animation library.
let observer: IntersectionObserver | null = null
const getObserver = () => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.12 },
    )
  }
  return observer
}

export const ScrollReveal = ({ children, className = '', delay = 0, as = 'div' }: ScrollRevealProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  const Comp = as
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={`reveal ${className}`}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Comp>
  )
}
