'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScannerComparisonProps {
    beforeImage: string
    afterImage: string
    beforeAlt: string
    afterAlt: string
    title: string
    }

export const ScannerComparison = ({
    beforeImage,
    afterImage,
    beforeAlt,
    afterAlt,
    title,
    }: ScannerComparisonProps) => {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const calculatePosition = useCallback((clientX: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
        setSliderPosition(percentage)
    }, [])

    const startDragging = () => setIsDragging(true)
    const stopDragging = () => setIsDragging(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            e.preventDefault()
            calculatePosition(e.clientX)
        }
        }

        const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
            calculatePosition(e.touches[0].clientX)
        }
        }

        if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', stopDragging)
        window.addEventListener('touchmove', handleTouchMove)
        window.addEventListener('touchend', stopDragging)
        }

        return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', stopDragging)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', stopDragging)
        }
    }, [isDragging, calculatePosition])

    return (
        <div className="group select-none">
        <div 
            ref={containerRef}
            className="relative w-full h-64 sm:h-80 md:h-[500px] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 touch-none cursor-ew-resize"
            onMouseDown={startDragging}
            onTouchStart={startDragging}
        >
            <div className="absolute inset-0">
            <Image
                src={afterImage}
                alt={afterAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                quality={60} 
                className="object-cover pointer-events-none"
                draggable={false}
                priority
            />
            <div className="absolute top-3 right-3 md:top-6 md:right-6 px-2 py-1 md:px-4 md:py-2 rounded-2xl border-2 border-red bg-black/60 shadow-lg animate-in fade-in duration-700 flex items-center justify-center">
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-widest uppercase opacity-90">Po <span className='hidden md:inline-block'>opravě</span> </span>
                </div>
            </div>

            <div 
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
            <Image
                src={beforeImage}
                alt={beforeAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                quality={60}
                className="object-cover pointer-events-none"
                draggable={false}
                priority
                />
                <div className="absolute top-3 left-3 md:top-6 md:left-6 px-2 py-1 md:px-4 md:py-2 bg-black/30 backdrop-blur-md  rounded-2xl shadow-lg border-2 border-blue-800 flex items-center justify-center">
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-widest uppercase">Před <span className='hidden md:inline-block'>opravou</span> </span>
                </div>
            </div>

            <div
                className="absolute top-0 bottom-0 w-1 bg-black/90 backdrop-blur-sm z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
                >
                <div className="absolute inset-0 bg-black blur-[4px]" />
                </div>

            <div 
                className="absolute top-4/7 -translate-y-1/2 ml-0.5 z-30 pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
                >
                <div className={`md:w-10 w-8 md:h-10 h-8 rounded-xl bg-red flex items-center justify-center transition-transform duration-200 ${isDragging ? 'scale-110 border-[var(--accent-red)]/50' : ''}`}>
                    <ChevronLeft className={`w-5 h-5 transition-colors  duration-300 ${isDragging ? 'text-white/50' : 'text-white'}`} />
                    <ChevronRight className={`w-5 h-5 transition-colors  duration-300 ${isDragging ? 'text-white/50' : 'text-white'}`} />
                </div>
            </div>
        </div>

        <div className="mt-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
            {title}
            </h3>
            <p className="text-sm text-gray-300 font-medium">
            Tažením porovnejte rozdíl
            </p>
        </div>
        </div>
    )
    }