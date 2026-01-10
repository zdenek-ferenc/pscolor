    'use client';

    import { useState, useEffect, useCallback, useRef } from 'react';
    import Image from 'next/image';
    import { motion, AnimatePresence, Variants, cubicBezier } from 'framer-motion';
    import { X, ZoomIn, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

    const galleryItems = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    src: `/photos/${i + 1}.webp`,
    alt: `Realizace PS Color ${i + 1}`,
    }));

    const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.1,
        },
    },
    };

    const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        },
    },
    };

    const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.85,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.85,
    })
    };

    const transitionSettings = {
    x: { type: "tween" as const, ease: cubicBezier(0.32, 0.72, 0, 1), duration: 0.5 },
    opacity: { duration: 0.2 }
    };

    export default function GalleryPage() {
    const [index, setIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    const nextIndex = index !== null ? (index + 1) % galleryItems.length : null;
    const prevIndex = index !== null ? (index - 1 + galleryItems.length) % galleryItems.length : null;

    const changeImage = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setIndex((prevIndex) => {
        if (prevIndex === null) return null;
        const newIndex = prevIndex + newDirection;
        if (newIndex < 0) return galleryItems.length - 1;
        if (newIndex >= galleryItems.length) return 0;
        return newIndex;
        });
    }, []);

    const goToImage = (newIndex: number) => {
        if (index === null) return;
        setDirection(newIndex > index ? 1 : -1);
        setIndex(newIndex);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (index === null) return;
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') setIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [index, changeImage]);

    useEffect(() => {
        if (index !== null && thumbnailsRef.current) {
        const activeThumb = thumbnailsRef.current.children[index] as HTMLElement;
        if (activeThumb) {
            activeThumb.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
            });
        }
        }
    }, [index]);

    return (
        <div className="min-h-screen bg-[var(--bg-darker)] py-18 text-white flex flex-col font-sans">
        {index !== null && (
            <div className="fixed inset-0 pointer-events-none opacity-0 z-[-1]" aria-hidden="true">
                {nextIndex !== null && (
                    <Image 
                        src={galleryItems[nextIndex].src} 
                        alt="preload next"
                        width={100} height={100}
                        quality={85} sizes="100vw" priority={true}
                    />
                )}
                {prevIndex !== null && (
                    <Image 
                        src={galleryItems[prevIndex].src} 
                        alt="preload prev"
                        width={100} height={100}
                        quality={85} sizes="100vw" priority={true}
                    />
                )}
            </div>
        )}

        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16 space-y-4">
                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full shadow-sm mb-4 border border-white/10"
                >
                <Camera className="w-6 h-6 text-[var(--accent-red)] mr-2" />
                <span className="text-sm font-semibold tracking-wider uppercase text-gray-300">Fotogalerie</span>
                </motion.div>
                
                <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
                >
                Naše <span className="text-[var(--accent-red)]">práce</span>
                </motion.h1>
                
                <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                Detailní pohled na naše realizace. Preciznost v každém kroku.
                </motion.p>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {galleryItems.map((item, i) => (
                <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="group relative cursor-zoom-in aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-red-900/20 transition-all duration-500"
                    onClick={() => {
                    setIndex(i);
                    setDirection(0);
                    }}
                >
                    <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    quality={60} 
                    
                    loading="eager"
                    fetchPriority="high"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/10 border border-white/20 p-4 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ZoomIn size={24} />
                    </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>

            </div>
        </main>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {index !== null && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
                onClick={() => setIndex(null)}
            >
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[120] pointer-events-none">
                    <div className="pointer-events-auto bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-white font-medium text-sm tracking-widest">
                            {index + 1} / {galleryItems.length}
                        </span>
                    </div>

                    <button
                        className="pointer-events-auto cursor-pointer text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full"
                        onClick={() => setIndex(null)}
                    >
                        <X size={28} />
                    </button>
                </div>

                <button
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all bg-black/20 hover:bg-[var(--accent-red)] p-3 rounded-full z-[110] backdrop-blur-sm border border-white/5 hover:border-[var(--accent-red)] hover:scale-110 hidden lg:block"
                    onClick={(e) => { e.stopPropagation(); changeImage(-1); }}
                >
                <ChevronLeft size={32} />
                </button>

                <button
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all bg-black/20 hover:bg-[var(--accent-red)] p-3 rounded-full z-[110] backdrop-blur-sm border border-white/5 hover:border-[var(--accent-red)] hover:scale-110 hidden lg:block"
                    onClick={(e) => { e.stopPropagation(); changeImage(1); }}
                >
                <ChevronRight size={32} />
                </button>


                <div 
                className="flex-grow relative w-full h-full flex items-center justify-center p-4 sm:p-8 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={transitionSettings}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset }) => {
                            const swipe = offset.x;
                            if (swipe < -50) changeImage(1);
                            else if (swipe > 50) changeImage(-1);
                        }}
                        className="absolute w-full h-full max-h-[75vh] md:max-h-[80vh] flex items-center justify-center cursor-grab active:cursor-grabbing will-change-transform"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={galleryItems[index].src}
                                alt="placeholder"
                                fill
                                className="object-contain"
                                sizes="100vw"
                                quality={10}
                                priority={true}
                            />
                            <Image
                                src={galleryItems[index].src}
                                alt={galleryItems[index].alt}
                                fill
                                className="object-contain pointer-events-none select-none drop-shadow-2xl"
                                priority={true} 
                                quality={85}    
                                sizes="100vw"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
                </div>

                <div 
                    className="w-full h-auto z-[120] pb-6 pt-2 px-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div 
                        ref={thumbnailsRef}
                        className="flex justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 px-2 md:px-0 no-scrollbar"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {galleryItems.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => goToImage(i)}
                                className={`relative flex-shrink-0 w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                                    i === index 
                                        ? 'border-[var(--accent-red)] scale-110 opacity-100 shadow-lg shadow-red-900/20' 
                                        : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                                }`}
                            >
                                <Image
                                    src={item.src}
                                    alt={`Náhled ${i + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="150px"
                                    quality={50}
                                />
                            </button>
                        ))}
                    </div>
                </div>

            </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
    }