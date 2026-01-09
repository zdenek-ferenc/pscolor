    'use client';

    import { useState } from 'react';
    import Image from 'next/image';
    import { motion, AnimatePresence, Variants } from 'framer-motion';
    import { X, ZoomIn, Camera } from 'lucide-react';

    const galleryItems = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    src: `/photos/${i + 1}.jpg`,
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
        type: 'spring' as const, 
        stiffness: 100,
        damping: 20,
        },
    },
    };

    export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

    return (
        <div className="min-h-screen bg-darker py-18 text-white flex flex-col font-sans">
        
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16 space-y-4">
                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full shadow-sm mb-4 border border-white/5"
                >
                <Camera className="w-6 h-6 text-red mr-2" />
                <span className="text-sm font-semibold tracking-wider uppercase text-gray-300">Fotogalerie</span>
                </motion.div>
                
                <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-white"
                >
                Naše <span className="text-red">práce</span>
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
                {galleryItems.map((item) => (
                <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="group relative cursor-zoom-in aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                    onClick={() => setSelectedImage(item)}
                >
                    <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white">
                            <ZoomIn size={24} />
                        </div>
                    </div>
                </motion.div>
                ))}
            </motion.div>

            </div>
        </main>

        <AnimatePresence>
            {selectedImage && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            >
                <button
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full z-50"
                onClick={() => setSelectedImage(null)}
                >
                <X size={32} />
                </button>

                <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-full flex items-center justify-center"
                >
                <div className="relative w-full max-w-7xl h-auto max-h-[90vh] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900">
                    <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        fill
                        className="object-contain"
                        quality={95}
                        priority
                    />
                </div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
    }