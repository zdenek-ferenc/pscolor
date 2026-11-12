import { Phone, Mail, MapPin, Navigation, ArrowUpRight, Clock } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ContactForm } from '@/components/ContactForm'

export const CtaSection = () => {
  // Odkaz pro tlačítko "Navigovat" (otevře aplikaci Google Maps v novém okně)
  const mapLink = 'https://www.google.com/maps/search/?api=1&query=Novovesk%C3%A1+95%2F11%2C+709+00+Ostrava'

  // Embed odkaz pro OpenStreetMap (přesné souřadnice dílny), bez cookies
  const mapEmbedSrc =
    'https://www.openstreetmap.org/export/embed.html?bbox=18.2460%2C49.8310%2C18.2540%2C49.8360&layer=mapnik&marker=49.83367%2C18.25002'

  return (
    <section id="poptavka" className="relative border-t border-line bg-sunken py-16 md:py-32">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-12">
        {/* Nadpis */}
        <ScrollReveal className="lg:col-span-5">
          <h2 className="text-[clamp(2.25rem,1.4rem+2.4vw,3rem)] font-semibold leading-[1] tracking-[-0.045em]">
            <span className="block text-foreground">Získejte nezávaznou</span>
            <span className="block text-accent">cenovou nabídku</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
            Vyplňte formulář a nahrajte fotku poškození. Ozveme se vám do 24 hodin s odhadem ceny a časovým rámcem opravy.
          </p>
        </ScrollReveal>

        {/* Formulář */}
        <ScrollReveal delay={0.1} className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:pl-6 xl:pl-10">
          <div className="rounded-[20px] border border-line bg-raised p-5 sm:p-8 md:p-10">
            <ContactForm />
          </div>
        </ScrollReveal>

        {/* Kontakty + mapa */}
        <ScrollReveal delay={0.15} className="lg:col-span-5 lg:row-start-2">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-sm font-medium text-dim">Rychlý kontakt</h3>
              <div className="mt-4 divide-y divide-line border-y border-line">
                <a href="tel:+420739522226" className="group flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-4">
                    <Phone size={20} strokeWidth={1.75} className="text-accent" />
                    <span>
                      <span className="block text-sm text-muted">Zavolejte nám</span>
                      <span className="block tabular-nums text-lg font-medium tracking-tight text-foreground md:text-xl">
                        +420 739 522 226
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </a>
                <a href="mailto:info@pscolor.cz" className="group flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-4">
                    <Mail size={20} strokeWidth={1.75} className="text-accent" />
                    <span>
                      <span className="block text-sm text-muted">Napište nám</span>
                      <span className="block text-lg font-medium tracking-tight text-foreground md:text-xl">
                        info@pscolor.cz
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </a>
                <div className="flex items-start gap-4 py-5">
                  <Clock size={20} strokeWidth={1.75} className="mt-0.5 text-accent" />
                  <div className="flex-1">
                    <span className="block text-sm text-muted">Otevírací doba</span>
                    <dl className="mt-1 space-y-0.5 text-foreground">
                      <div className="flex justify-between gap-6">
                        <dt>Po - Pá</dt>
                        <dd className="tabular-nums font-medium">8:00 - 17:00</dd>
                      </div>
                      <div className="flex justify-between gap-6">
                        <dt>Víkendy</dt>
                        <dd className="text-muted">Zavřeno</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-line bg-raised">
              <div className="relative h-56 w-full bg-[#1a1a1d] md:h-64">
                <iframe
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.9) brightness(0.85)' }}
                  allowFullScreen
                  loading="lazy"
                  title="Mapa PS Color"
                  className="absolute inset-0"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} strokeWidth={1.75} className="mt-0.5 flex-shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold text-foreground">Kde nás najdete</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      Novoveská 95/11
                      <br />
                      709 00 Ostrava
                    </p>
                  </div>
                </div>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !h-10 !px-4 !text-sm"
                >
                  <Navigation size={15} strokeWidth={2} />
                  Navigovat
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
