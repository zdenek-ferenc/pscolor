    'use client'

    import { Star, Quote } from 'lucide-react'

    interface TestimonialCardProps {
    quote: string
    author: string
    rating?: number
    }

    export const TestimonialCard = ({ quote, author, rating = 5 }: TestimonialCardProps) => {
    return (
        <div className="glass p-6 md:p-8 rounded-2xl h-full transition-all duration-300 hover:shadow-2xl border border-white/5 group flex flex-col relative overflow-hidden">
        
        <div className="absolute top-4 right-6 text-[var(--accent-red)]/10 transition-colors duration-300">
            <Quote size={80} />
        </div>

        <div className="flex gap-1 mb-4 md:mb-6 relative z-10">
            {[...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                size={18} 
                fill={i < rating ? "#EAB308" : "transparent"} 
                className={`${i < rating ? "text-yellow-500" : "text-gray-700"}`} 
            />
            ))}
        </div>

        <p className="text-gray-200 italic md:text-lg leading-relaxed mb-6 md:mb-8 flex-grow relative z-10">
            &quot;{quote}&quot;
        </p>
        <div className="flex items-center gap-4 pt-4 md:pt-6 border-t border-white/5 mt-auto relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black  flex items-center justify-center shadow-inner">
            <span className="text-white font-bold text-lg">{author.charAt(0)}</span>
            </div>
            <div>
            <p className="font-bold text-white">{author}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Ověřený zákazník
            </p>
            </div>
        </div>
        </div>
    )
    }