'use client'

import { useState, useRef, MouseEvent } from 'react'
import Image from 'next/image'

interface ScannerComparisonProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  title: string
  price?: string
}

export const ScannerComparison = ({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  title,
  price,
}: ScannerComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX)
    }
  }

  return (
    <div className="group">
      {/* Comparison Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden bg-black cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover pointer-events-none"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover pointer-events-none"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
          
          {/* BEFORE Label */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-md border border-red/50">
            <span className="text-red font-semibold text-sm">PŘED</span>
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Slider Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-xl border-2 border-gray-300 flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-gray-600" />
              <div className="w-0.5 h-4 bg-gray-600" />
            </div>
          </div>
        </div>

        {/* AFTER Label */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-md border border-blue/50">
          <span className="text-blue font-semibold text-sm">PO</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          {title}
        </h3>
        {price && (
          <p className="text-lg md:text-xl font-semibold text-red">
            {price}
          </p>
        )}
      </div>
    </div>
  )
}
