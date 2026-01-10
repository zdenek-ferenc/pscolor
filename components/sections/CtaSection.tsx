'use client'

import { Phone, Mail, MapPin, Navigation } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ContactForm } from '@/components/ContactForm'

export const CtaSection = () => {
    // Odkaz pro tlačítko "Navigovat" (otevře aplikaci Google Maps v novém okně - to je OK)
    const mapLink = "https://www.google.com/maps/search/?api=1&query=Novovesk%C3%A1+95%2F11%2C+709+00+Ostrava"
    
    // Embed odkaz pro OpenStreetMap (přesné souřadnice vaší dílny)
    // bbox = ohraničení (zoom), marker = špendlík
    const mapEmbedSrc = "https://www.openstreetmap.org/export/embed.html?bbox=18.2460%2C49.8310%2C18.2540%2C49.8360&layer=mapnik&marker=49.83367%2C18.25002"

    return (
        <section id="poptavka" className="py-12 md:py-24 bg-[var(--bg-dark)] relative border-t border-white/5">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal variant="fade-up">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight">
                            <span className="block text-white">Získejte nezávaznou</span>
                            <span className="block text-[var(--accent-red)] mt-2">cenovou nabídku</span>
                        </h2>
                        <p className="md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Vyplňte formulář a nahrajte fotku poškození. Ozveme se vám do 24 hodin s odhadem ceny a časovým rámcem opravy.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            
                    {/* LEVÝ SLOUPEC (Kontakt + Mapa) */}
                    <div className="lg:col-span-2 flex flex-col gap-6 justify-start order-2 lg:order-1">
                        
                        {/* 1. Karta s kontakty */}
                        <ScrollReveal variant="fade-right">
                            <div className="p-6 md:p-8 glass rounded-2xl border border-white/5">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-6">Rychlý kontakt</h3>
                                
                                <div className="space-y-6">
                                    <a href="tel:+420739522226" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                        <div className="md:w-12 w-10 md:h-12 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent-red)] transition-colors border border-white/5 group-hover:border-[var(--accent-red)]/50">
                                            <Phone size={22} className="text-[var(--accent-red)] group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-300 font-medium">Zavolejte nám</p>
                                            <p className="text-lg font-bold tracking-wide">+420 739 522 226</p>
                                        </div>
                                    </a>

                                    <a href="mailto:info@pscolor.cz" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                        <div className="md:w-12 w-10 md:h-12 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent-red)] transition-colors border border-white/5 group-hover:border-[var(--accent-red)]/50">
                                            <Mail size={22} className="text-[var(--accent-red)] group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-300 font-medium">Napište nám</p>
                                            <p className="text-lg font-bold tracking-wide">info@pscolor.cz</p> 
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 2. Karta s mapou (OpenStreetMap bez cookies) */}
                        <ScrollReveal variant="fade-right" delay={0.1}>
                            <div className="h-full glass rounded-2xl border border-white/5 overflow-hidden flex flex-col min-h-[300px]">
                                <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex flex-col md:flex-row items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[var(--accent-red)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <MapPin size={20} className="text-[var(--accent-red)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Kde nás najdete</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                                Novoveská 95/11<br />
                                                709 00 Ostrava
                                            </p>
                                            <a 
                                                href={mapLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white hover:text-red uppercase tracking-wider transition-colors"
                                            >
                                                <Navigation size={14} />
                                                Navigovat
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Map Container - OpenStreetMap */}
                                <div className="relative w-full flex-grow min-h-[250px] bg-[#242f3e]">
                                    <iframe 
                                        src={mapEmbedSrc}
                                        width="100%" 
                                        height="100%" 
                                        // CSS Filtry pro Dark Mode efekt na OSM mapě
                                        style={{ border: 0, filter: "grayscale(1) invert(1) contrast(0.85) brightness(0.9)" }} 
                                        allowFullScreen 
                                        loading="lazy" 
                                        title="Mapa PS Color"
                                        className="absolute inset-0 opacity-80 hover:opacity-100 transition-opacity duration-500"
                                    ></iframe>
                                    
                                    {/* Overlay pro sjednocení barvy */}
                                    <div className="absolute inset-0 bg-[var(--accent-red)] mix-blend-overlay opacity-10 pointer-events-none" />
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>

                    {/* PRAVÝ SLOUPEC (Formulář) */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <ScrollReveal variant="fade-up" delay={0.2}>
                            <div className="glass p-1 rounded-2xl border border-white/10 shadow-2xl bg-black/40 h-full">
                                <ContactForm />
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    )
}