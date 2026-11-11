'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { ArrowUpRight, PhoneCall } from 'lucide-react'

type NavLink = {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/#sluzby', label: 'Služby' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/#poptavka', label: 'Kontakt' },
]

const ease = [0.16, 1, 0.3, 1] as const

export const Header = () => {
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Header stays put. It only switches from transparent to solid once the page is scrolled.
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  useEffect(() => {
    setScrolled(scrollY.get() > 8)
  }, [scrollY])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`border-b transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || isOpen
            ? 'border-line bg-[rgb(11_11_12/0.92)] shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-6 md:grid md:h-[72px] md:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label="Domů" className="flex-shrink-0 md:justify-self-start" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.png"
              alt="Logo P.S.Color"
              width={150}
              height={46}
              priority
              className="h-8 md:h-9 w-auto transition-opacity hover:opacity-80"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-[15px] font-medium text-muted hover:text-foreground transition-colors duration-300"
              >
                {link.label}
                <span className="absolute left-4 right-4 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-self-end gap-5">
            <a
              href="tel:+420739522226"
              className="hidden lg:inline whitespace-nowrap tabular-nums text-sm text-muted hover:text-foreground transition-colors"
            >
              +420 739 522 226
            </a>
            <Link href="/#poptavka" className="btn btn-primary !h-10 !px-5 !text-sm">
              Poptávka
            </Link>
          </div>

          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full active:scale-95 transition-transform"
            aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
            aria-expanded={isOpen}
          >
            <span className="relative block h-3 w-6">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="absolute left-0 top-0 h-[1.5px] w-6 rounded-full bg-foreground"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -5, width: 24 } : { rotate: 0, y: 0, width: 16 }}
                transition={{ duration: 0.35, ease }}
                className="absolute right-0 bottom-0 h-[1.5px] rounded-full bg-foreground"
              />
            </span>
          </button>
        </nav>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="md:hidden overflow-hidden"
            >
              <div className="container-x pb-6 pt-2">
                <ul className="border-t border-line">
                  {navLinks.map((link, idx) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + idx * 0.05, duration: 0.4, ease }}
                      className="border-b border-line"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight size={20} strokeWidth={1.5} className="text-dim" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, ease }}
                  className="mt-6 grid grid-cols-2 gap-3"
                >
                  <a href="tel:+420739522226" className="btn btn-ghost w-full">
                    <PhoneCall size={18} strokeWidth={1.75} />
                    Zavolat
                  </a>
                  <Link href="/#poptavka" onClick={() => setIsOpen(false)} className="btn btn-primary w-full">
                    Poptávka
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
