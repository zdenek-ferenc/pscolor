import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Stránka nenalezena',
}

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center pt-24 pb-16">
      <div className="container-x">
        <p className="text-sm font-medium text-dim">Chyba 404</p>
        <h1 className="mt-4 text-[clamp(2.5rem,1.6rem+4vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
          Tuhle stránku <span className="text-accent">nemáme</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
          Odkaz je možná neplatný nebo stránka byla přesunuta. Pokračujte na hlavní stránku nebo nám rovnou zavolejte.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Zpět na hlavní stránku
            <ArrowRight size={18} strokeWidth={2} className="btn-arrow" />
          </Link>
          <a href="tel:+420739522226" className="btn btn-ghost">
            +420 739 522 226
          </a>
        </div>
      </div>
    </main>
  )
}
