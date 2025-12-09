'use client'

import { ReactNode } from 'react'

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  variant?: 'light' | 'medium' | 'heavy'
  hover?: boolean
}

export const GlassmorphicCard = ({
  children,
  className = '',
  variant = 'medium',
  hover = true,
}: GlassmorphicCardProps) => {
  const variantClasses = {
    light: 'glass-light',
    medium: 'glass-medium',
    heavy: 'glass-heavy',
  }

  return (
    <div
      className={`
        ${variantClasses[variant]}
        rounded-xl
        ${hover ? 'transition-all duration-300 hover:scale-[1.02] hover:glow-red-sm' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
