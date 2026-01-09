import Link from 'next/link'
import { Phone, Mail, MapPin, FileText } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kontakt</h3>
            <div className="space-y-3">
              <a href="tel:+420739522226" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={18} />
                <span>+420 739 522 226</span>
              </a>
              <a href="mailto:info@pscolor.cz" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={18} />
                <span>info@pscolor.cz</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Novoveská 95/11<br />709 00 Ostrava</span>
              </div>
            
              <div className="flex items-center gap-2">
                <FileText size={18} className="flex-shrink-0" />
                <span className="text-sm">IČO: 29391512 | DIČ: CZ29391512</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rychlé odkazy</h3>
            <nav className="space-y-2">
              <Link href="#sluzby" className="block hover:text-white transition-colors">Naše služby</Link>
              <Link href="/galerie" className="block hover:text-white transition-colors">Galerie</Link>
              <Link href="#poptavka" className="block hover:text-white transition-colors">Kontaktní formulář</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Otevírací doba</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-6">
                <span>Po - Pá:</span>
                <span className="text-white">8:00 - 17:00</span>
              </div>
              <div className="flex gap-6">
                <span>Sobota:</span>
                <span className="text-red">Zavřeno</span>
              </div>
              <div className="flex gap-6">
                <span>Neděle:</span>
                <span className="text-red">Zavřeno</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} P.S.Color Autolakovna. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}