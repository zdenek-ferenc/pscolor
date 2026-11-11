import Link from 'next/link'
import Image from 'next/image'
import { ArrowUp, Instagram } from 'lucide-react'

const menu = [
  { label: 'Domů', href: '/' },
  { label: 'Naše služby', href: '/#sluzby' },
  { label: 'Fotogalerie', href: '/galerie' },
  { label: 'Nezávazná poptávka', href: '/#poptavka' },
]

const headingClass = 'text-sm font-medium text-dim'

export const Footer = () => {
  return (
    <footer className="relative border-t border-line bg-background text-muted">
      <div className="container-x pt-16 pb-10 md:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="Domů">
              <Image
                src="/logo.png"
                alt="PS Color Logo"
                width={150}
                height={46}
                className="h-10 w-auto opacity-90 transition-opacity hover:opacity-100"
              />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Profesionální autolakovna a karosárna v Ostravě. Vracíme vašemu vozu původní lesk a bezpečnost s důrazem na
              detail a kvalitu.
            </p>
            <a
              href="https://www.instagram.com/p.s.color/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram P.S.Color"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent"
            >
              <Instagram size={17} strokeWidth={1.75} />
            </a>
          </div>

          <div className="lg:col-span-2">
            <h3 className={headingClass}>Menu</h3>
            <nav className="mt-5 flex flex-col gap-3">
              {menu.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-foreground/85 transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h3 className={headingClass}>Kontakt</h3>
            <div className="mt-5 flex flex-col gap-5">
              <a href="tel:+420739522226" className="group block">
                <span className="block text-sm text-muted">Zavolejte nám</span>
                <span className="mt-0.5 block tabular-nums text-foreground transition-colors group-hover:text-accent">
                  +420 739 522 226
                </span>
              </a>
              <a href="mailto:info@pscolor.cz" className="group block">
                <span className="block text-sm text-muted">Napište nám</span>
                <span className="mt-0.5 block text-foreground transition-colors group-hover:text-accent">
                  info@pscolor.cz
                </span>
              </a>
              <div>
                <span className="block text-sm text-muted">Adresa dílny</span>
                <span className="mt-0.5 block text-foreground">Novoveská 95/11, Ostrava</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className={headingClass}>Info</h3>
            <div className="mt-5">
              <p className="text-sm text-muted">Otevírací doba</p>
              <dl className="mt-2 space-y-1.5 text-foreground">
                <div className="flex justify-between gap-6">
                  <dt>Po - Pá</dt>
                  <dd className="tabular-nums">8:00 - 17:00</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt>Víkendy</dt>
                  <dd className="text-muted">Zavřeno</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 space-y-1.5 text-xs leading-relaxed text-dim">
              <p>IČO: 29391512</p>
              <p>DIČ: CZ29391512</p>
              <p>Zapsáno u Krajského soudu v Ostravě, oddíl C, vložka 38332</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} <span className="text-foreground">P.S.Color</span> Autolakovna. Všechna práva
            vyhrazena.
          </p>

          <a href="#top" className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground">
            Zpět nahoru
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUp size={15} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
