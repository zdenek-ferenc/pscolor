'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Car, Images, Phone } from 'lucide-react'

const navLinks = [
  { href: '#sluzby', label: 'Služby', icon: <Car size={20} /> },
  { href: '/galerie', label: 'Galerie', icon: <Images size={20} /> },
  { href: '#poptavka', label: 'Kontakt', icon: <Phone size={20} /> },
]

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all duration-300 hidden md:block ${scrolled ? 'py-2' : 'py-6'}`}>
        <div className="container mx-auto">
          <nav className={`rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-white/5 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md inset-shadow-sm inset-shadow-white/10 ' : 'bg-transparent border-transparent'}`}>
            <Link href="/" aria-label="Domů" className="flex-shrink-0">
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
                  className="relative text-white uppercase font-semibold tracking-wide group transition-colors duration-300 py-2 hover:text-gray-200"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-red)] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
            
            <Link 
              href="#poptavka" 
              className="px-6 py-2 bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-red-900/20 flex-shrink-0"
            >
              Poptávka
            </Link>
          </nav>
        </div>
      </header>
      <div className="block md:hidden">
        <MobileTopDock />
      </div>
    </>
  )
}

function MobileTopDock() {
  const [isOpen, setIsOpen] = useState(false)

  const glassStyle = "bg-white/5 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 shadow-md inset-shadow-sm inset-shadow-white/10"
  const glassdarkStyle = "bg-[var(--bg-dark)] rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md shadow-md"


  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex flex-col items-end">
      <div className={`w-full px-5 py-3 flex items-center justify-between ${glassStyle} transition-all duration-300`}>
        <Link href="/" aria-label="Domů" className="flex-shrink-0" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo.png"
            alt="Logo P.S.Color"
            width={110} 
            height={28} 
            priority 
            className="w-auto h-6 object-contain"
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-10 w-10 items-center justify-center -mr-2 active:scale-90 transition-transform"
          aria-label="Menu"
        >
          <div className="relative flex flex-col gap-[5px] items-end">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white origin-center rounded-full transition-all ease-in-out duration-100"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              className="w-4 h-0.5 bg-[var(--accent-red)] rounded-full transition-all ease-in-out duration-100"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 18 }}
              className="h-0.5 bg-white origin-center rounded-full transition-all ease-in-out duration-100"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} 
            className="mt-3 flex flex-col gap-2 w-full max-w-[200px]"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between gap-4 px-5 py-3 ${glassdarkStyle} group`}
                >
                  <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <div className="text-[var(--accent-red)] group-hover:text-red-400 transition-colors">
                    {link.icon}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}