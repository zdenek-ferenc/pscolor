'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'fade'
  disableOnMobile?: boolean 
}

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 30 }, 
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: -30 }, 
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 }, 
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  disableOnMobile = false,
}: ScrollRevealProps) => {
  const ref = useRef(null)
  
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const isInView = useInView(ref, { 
    once: true, 
    margin: isMobile ? '-20px' : '-50px'
  })

  const finalDelay = isMobile ? Math.min(delay, 0.1) : delay

  if (disableOnMobile && isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration: isMobile ? 0.5 : 0.6, 
        delay: finalDelay,
        ease: [0.21, 0.47, 0.32, 0.98], 
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }} 
    >
      {children}
    </motion.div>
  )
}