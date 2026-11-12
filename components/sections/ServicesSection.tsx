import Image from 'next/image'
import { Paintbrush, Car, FileText } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

type Service = {
  icon: React.ReactNode
  title: string
  text: string
}

const services: Service[] = [
  {
    icon: <Paintbrush size={20} strokeWidth={1.75} />,
    title: 'Profesionální lakování',
    text: 'Zajišťujeme dokonalé lakování. Používáme prémiové laky a vlastní míchárnu barev pro 100% shodu odstínu.',
  },
  {
    icon: <Car size={20} strokeWidth={1.75} />,
    title: 'Karosářské práce',
    text: 'Kompletní opravy karoserií po nehodách. Moderní vybavení pro přesné slícování a pevnost.',
  },
  {
    icon: <FileText size={20} strokeWidth={1.75} />,
    title: 'Pojistné události',
    text: 'Smluvní servis pojišťoven. Administrativu vyřešíme za vás a půjčíme náhradní vůz.',
  },
]

const TileBody = ({
  service,
  size = 'md',
  onAccent = false,
}: {
  service: Service
  size?: 'md' | 'lg'
  onAccent?: boolean
}) => (
  <div className="relative z-10 flex h-full flex-col justify-between gap-10 p-6 sm:p-8">
    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-foreground backdrop-blur-md">
      {service.icon}
    </span>
    <div>
      <h3
        className={`font-semibold tracking-[-0.03em] text-foreground ${
          size === 'lg' ? 'text-2xl sm:text-[2rem] leading-tight' : 'text-xl sm:text-2xl'
        }`}
      >
        {service.title}
      </h3>
      <p
        className={`mt-3 leading-relaxed ${onAccent ? 'text-white' : 'text-white/75'} ${
          size === 'lg' ? 'max-w-[44ch] text-base sm:text-lg' : 'max-w-[40ch] text-[15px] sm:text-base'
        }`}
      >
        {service.text}
      </p>
    </div>
  </div>
)

export const ServicesSection = () => {
  const [paint, body, insurance] = services

  return (
    <section id="sluzby" className="relative pt-16 pb-16 md:pt-24 md:pb-32">
      <div className="container-x">
        <ScrollReveal>
          <div className="max-w-2xl">
            <h2 className="section-title">Naše služby</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">
              Specializujeme se na komplexní opravy, které vrátí vašemu vozu původní kondici a vzhled.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
          <ScrollReveal className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <article className="group relative h-full min-h-[420px] overflow-hidden rounded-[20px] bg-raised sm:min-h-[480px] lg:min-h-[620px]">
              <Image
                src="/photos/6.webp"
                alt="Lakování vozu v lakovací kabině"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={65}
                className="object-cover object-[50%_35%] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(8_8_9/0.92)_0%,rgb(8_8_9/0.45)_45%,rgb(8_8_9/0.1)_100%)]" />
              <TileBody service={paint} size="lg" />
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="lg:col-span-5">
            <article className="group relative h-full min-h-[300px] overflow-hidden rounded-[20px] bg-raised">
              <Image
                src="/photos/8.webp"
                alt="Karosářské práce na voze"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
                quality={60}
                className="object-cover object-[50%_40%] transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(8_8_9/0.94)_0%,rgb(8_8_9/0.55)_55%,rgb(8_8_9/0.2)_100%)]" />
              <TileBody service={body} />
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.16} className="lg:col-span-5">
            <article className="group relative h-full min-h-[300px] overflow-hidden rounded-[20px] bg-accent">
              <Image
                src="/photos/2.webp"
                alt="Zamaskovaný vůz připravený k lakování"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
                quality={60}
                className="object-cover object-[50%_45%] grayscale contrast-125 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-accent mix-blend-multiply" />
              <div className="absolute inset-0 bg-accent/40" />
              <TileBody service={insurance} onAccent />
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
