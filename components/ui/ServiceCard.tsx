'use client'

import React, { useRef, useState } from 'react'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

export const ServiceCard = ({ icon, title, children }: ServiceCardProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setOpacity(1)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full overflow-hidden rounded-2xl bg-white/5 border border-white/10"
    >

      <div
        className="pointer-events-none absolute -inset-px transition duration-500 opacity-0 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(202, 155, 155, 0.15), transparent 40%)`,
        }}
      />
      
      <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a]" />

      <div 
        className="pointer-events-none absolute inset-[1px] rounded-2xl transition duration-500 opacity-0 group-hover:opacity-100"
        style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(202, 155, 155, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
        <div className="mb-5 text-[var(--accent-red)] group-hover:scale-110 transition-transform duration-300 origin-left drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          {icon}
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-[var(--accent-red)] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 text-base md:text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {children}
        </p>
      </div>
    </div>
  )
}