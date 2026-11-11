'use client'

import { motion, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'fade'
  disableOnMobile?: boolean
  as?: 'div' | 'li'
}

const offsets = {
  'fade-up': { y: 28 },
  'fade-left': { x: 28 },
  'fade-right': { x: -28 },
  scale: { scale: 0.96 },
  fade: {},
} as const

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  as = 'div',
}: ScrollRevealProps) => {
  const reduce = useReducedMotion()
  const Comp = as === 'li' ? motion.li : motion.div

  return (
    <Comp
      initial={reduce ? false : { opacity: 0, ...offsets[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Comp>
  )
}
