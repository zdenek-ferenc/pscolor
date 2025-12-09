'use client' 

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'


const navLinks = [
{ href: '#sluzby', label: 'Služby' },
{ href: '/galerie', label: 'Galerie' },
{ href: '#poptavka', label: 'Kontakt' },
]

export const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false)

return (
    <>
    <header className="fixed top-4 left-0 right-0 z-50 px-4 hidden md:block">
        <div className="container mx-auto">
          <nav className="glass rounded-full px-6 py-3 flex items-center justify-between backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
            <Link href="/" aria-label="Hlavní strana P.S.Color Autolakovna" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Logo P.S.Color"
                width={140} 
                height={35} 
                priority 
                className="transition-opacity hover:opacity-80"
              />
            </Link>
            
            <div className="flex items-center gap-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="relative text-white text-sm font-semibold tracking-wide group transition-colors duration-300 py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
            
            <Link 
              href="#poptavka" 
              className="px-6 py-2 bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white font-semibold text-sm rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0"
            >
              Poptávka
            </Link>
          </nav>
        </div>
    </header>

    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 md:hidden backdrop-blur-xl bg-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" aria-label="Hlavní strana P.S.Color Autolakovna">
              <Image
                src="/logo.webp"
                alt="Logo P.S.Color"
                width={120} 
                height={30} 
                priority 
              />
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="p-2 text-white hover:text-red-400 transition-colors"
              aria-label="Otevřít menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
    </header>

    {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          
          <div 
            className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm glass border-l border-white/10 p-6 backdrop-blur-2xl bg-white/10"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold text-red">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="p-2 text-white hover:text-red transition-colors"
                aria-label="Zavřít menu"
              >
                <X size={28} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-2xl text-white hover:text-red-400 transition-all duration-300 font-semibold uppercase tracking-wide animate-fade-up opacity-0"
                  style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
                  onClick={() => setIsMenuOpen(false)} 
                >
                  {link.label}
                </Link>
              ))}
              
              <Link 
                href="#poptavka" 
                className="mt-6 bg-red hover:bg-red/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-center animate-fade-up opacity-0"
                style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Nezávazná poptávka
              </Link>
            </nav>
          </div>
        </div>
    )}
    </>
)
}