import { ArrowUpRight, Star } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { GoogleMark } from '@/components/ui/GoogleMark'
import { GOOGLE_REVIEWS } from '@/lib/site'

const testimonials = [
  {
    quote:
      'Autolakovnu mi doporučil kamarád a udělal dobře. Oprava proběhla rychle, bez zbytečného čekání, a výsledek je fakt špičkový. Oceňuju i přátelský přístup.',
    author: 'Dominik D.',
  },
  {
    quote:
      'Velká spokojenost! Moje auto které bylo havarované a pojištěné u České pojišťovny, bylo opravené rychle a kvalitně! Doporučuji!',
    author: 'Radomír M.',
  },
  {
    quote:
      'Rychlé vyřízení, do týdne jsem měl auto opravené, oproti jiným lakovnám, kde mi řekli termín za měsíc, a kvalita super.',
    author: 'Jakub P.',
  },
]

const columnClass = (idx: number) => {
  if (idx === 0) return 'md:pr-10 lg:pr-12'
  const divider = 'border-t border-line pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-10 lg:pl-12'
  // Mobil a tablet: dvě recenze. Třetí se ukáže až od 1024 px, kde mají tři sloupce dost místa.
  return idx === 1 ? `${divider} lg:pr-12` : `${divider} hidden lg:block`
}

export const TestimonialsSection = () => {
  return (
    <section className="relative py-16 md:py-32">
      <div className="container-x">
        <ScrollReveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="section-title max-w-[16ch]">
              Co o nás říkají <span className="text-accent">zákazníci</span>
            </h2>

            <a
              href={GOOGLE_REVIEWS.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center gap-4 self-start rounded-2xl border border-line-strong px-5 py-4 transition-colors duration-300 hover:border-white/40 md:self-auto"
              aria-label={`Hodnocení ${GOOGLE_REVIEWS.rating} z 5 na Googlu, ${GOOGLE_REVIEWS.count} recenzí. Otevřít recenze na Mapách Google`}
            >
              <GoogleMark size={28} />
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <span className="text-2xl font-semibold leading-none tracking-[-0.03em] text-foreground">
                    {GOOGLE_REVIEWS.rating}
                  </span>
                  <span className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} strokeWidth={0} fill="currentColor" className="text-accent" />
                    ))}
                  </span>
                </span>
                <span className="whitespace-nowrap text-sm text-muted">
                  {GOOGLE_REVIEWS.count} recenzí na Googlu
                </span>
              </span>
              <ArrowUpRight
                size={18}
                strokeWidth={2}
                className="ml-2 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </a>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-2 md:gap-0 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={t.author} delay={0.1 * idx} className={columnClass(idx)}>
              <TestimonialCard quote={t.quote} author={t.author} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
