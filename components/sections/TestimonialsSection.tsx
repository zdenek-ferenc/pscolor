    'use client'

    import { ScrollReveal } from '@/components/ScrollReveal'
    import { TestimonialCard } from '@/components/ui/TestimonialCard'

    export const TestimonialsSection = () => {
    return (
        <section className="py-12 md:py-24 bg-[var(--bg-dark)] relative">
        <div className="container mx-auto px-4">
            <ScrollReveal variant="fade-up">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 md:mb-16 text-white tracking-tight">
                Co o nás říkají <span className="text-[var(--accent-red)]">zákazníci</span>
            </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal variant="fade-right" delay={0.1}>
                <TestimonialCard 
                quote="Autolakovnu mi doporučil kamarád a udělal dobře. Oprava proběhla rychle, bez zbytečného čekání, a výsledek je fakt špičkový. Oceňuju i přátelský přístup." 
                author="Dominik D." 
                />
            </ScrollReveal>
            
            <ScrollReveal variant="fade-left" delay={0.2}>
                <TestimonialCard 
                quote="Velká spokojenost! Moje auto které bylo havarované a pojištěné u České pojišťovny, bylo opravené rychle a kvalitně! Doporučuji!" 
                author="Radomír M." 
                />
            </ScrollReveal>
            </div>
        </div>
        </section>
    )
    }