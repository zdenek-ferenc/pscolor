'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, FileText, Clock, ChevronRight, ArrowUp, Instagram } from 'lucide-react'

export const Footer = () => {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 text-gray-400 overflow-hidden font-sans">
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent-red)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="PS Color Logo" 
                width={160} 
                height={50} 
                className="h-auto w-32 md:w-40 object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Profesionální autolakovna a karosárna v Ostravě. 
              Vracíme vašemu vozu původní lesk a bezpečnost s důrazem na detail a kvalitu.
            </p>
            
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/p.s.color/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-red)] text-white transition-all duration-300 group">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:pl-4">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Menu
              <span className="w-1 h-1 rounded-full bg-[var(--accent-red)]"></span>
            </h3>
            <nav className="space-y-3">
              {[
                { label: 'Domů', href: '/' },
                { label: 'Naše služby', href: '/#sluzby' },
                { label: 'Fotogalerie', href: '/galerie' },
                { label: 'Nezávazná poptávka', href: '/#poptavka' },
              ].map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="flex items-center group hover:text-[var(--accent-red)] transition-colors duration-300"
                >
                  <ChevronRight size={14} className="mr-2 text-gray-600 group-hover:text-[var(--accent-red)] group-hover:translate-x-1 transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Kontakt
              <span className="w-1 h-1 rounded-full bg-[var(--accent-red)]"></span>
            </h3>
            <div className="space-y-5">
              <a href="tel:+420739522226" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:text-white transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-red uppercase tracking-wider font-semibold mb-0.5">Zavolejte nám</p>
                  <p className="text-white font-medium text-[var(--accent-red)] transition-colors">+420 739 522 226</p>
                </div>
              </a>

              <a href="mailto:info@pscolor.cz" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:text-white transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-red uppercase tracking-wider font-semibold mb-0.5">Napište nám</p>
                  <p className="text-white font-medium text-[var(--accent-red)] transition-colors">info@pscolor.cz</p>
                </div>
              </a>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:text-white transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-red uppercase tracking-wider font-semibold mb-0.5">Adresa dílny</p>
                  <p className="text-white">Novoveská 95/11, Ostrava</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Info
              <span className="w-1 h-1 rounded-full bg-[var(--accent-red)]"></span>
            </h3>
            
            <div className="bg-white/5 rounded-xl p-5 border border-white/5 space-y-4 mb-6">
              <div className="flex items-center gap-3 text-white font-medium mb-3 border-b border-white/10 pb-3">
                <Clock size={18} className="text-[var(--accent-red)]" />
                <span>Otevírací doba</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white">
                  <span>Po - Pá</span>
                  <span className="text-white font-semibold">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Víkendy</span>
                  <span>Zavřeno</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-300">
              <FileText size={14} className="mt-0.5 flex-shrink-0" />
              <div className='space-y-2'>
                <p>IČO: 29391512</p>
                <p>DIČ: CZ29391512</p>
                <p className="mt-1 opacity-70">Zapsáno u Krajského soudu v Ostravě, oddíl C, vložka 38332</p>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-white font-medium">P.S.Color</span> Autolakovna. Všechna práva vyhrazena.
          </p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm text-white hover:text-white transition-colors"
            >
              Zpět nahoru
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent-red)] group-hover:-translate-y-1 transition-all duration-300">
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}