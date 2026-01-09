'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Car, Paintbrush, FileText, Star, ShieldCheck, Sparkles, CheckCircle2, Phone } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ScannerComparison } from '@/components/ScannerComparison'
import { ContactForm } from '@/components/ContactForm'

const ServiceCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="p-6 sm:p-8 glass rounded-xl hover:bg-white/10 transition-smooth hover-lift h-full">
    <div className="mb-5 text-red">
      {icon}
    </div>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
      {title}
    </h3>
    <p className="text-gray-300 text-base md:text-lg leading-relaxed">{children}</p>
  </div>
);

const TestimonialCard = ({ quote, author }: { quote: string, author: string }) => (
  <div className="glass p-8 rounded-xl h-full transition-smooth hover-lift">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={20} fill="#3B82F6" className="text-blue" />
      ))}
    </div>
    <p className="text-gray-200 italic mb-6 text-lg leading-relaxed">{quote}</p>
    <p className="font-bold text-white">— {author}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative w-full h-[800px] sm:min-h-screen flex items-center text-white">
        <div className="absolute inset-0">
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/landingbg.png"
              alt="Profesionální lakování auta"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>

          <div className="block md:hidden absolute inset-0">
            <Image
              src="/mobilelanding.png"
              alt="Profesionální lakování auta"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>

          <div className="absolute inset-0"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:py-32 text-center">
          <ScrollReveal variant="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Precizní opravy karoserií a laků v Ostravě
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 mb-10 leading-relaxed">
              Garantujeme špičkový výsledek díky moderním technologiím a dlouholetým zkušenostem. Pro osobní i užitkové vozy.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2}>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link 
                href="#poptavka" 
                className="px-8 py-4 bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg hover:scale-105"
              >
                Nezávazná poptávka
              </Link>
              
              <Link 
                href="#sluzby" 
                className="px-8 py-4 glass border-2 border-white/20 hover:border-white/40 text-white font-bold text-lg rounded-full transition-all duration-300 hover:bg-white/10"
              >
                Naše služby
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="sluzby" className="pb-20 sm:py-20 bg-dark">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal variant="fade-up">
            <h2 className="uppercase text-3xl md:text-5xl text-red font-extrabold mb-4">
              Naše služby
            </h2>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Specializujeme se na komplexní opravy, které vrátí vašemu vozu původní kondici a vzhled.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <ScrollReveal variant="fade-up" delay={0.2}>
              <ServiceCard icon={<Car size={40} strokeWidth={1.5} />} title="Precizní karosářské práce">
                Provádíme kompletní opravy karoserií po nehodách. Díky modernímu vybavení garantujeme přesné slícování dílů a navrácení původní pevnosti karoserie.
              </ServiceCard>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-up" delay={0.3}>
              <ServiceCard icon={<Paintbrush size={40} strokeWidth={1.5} />} title="Profesionální lakování vozů">
                Zajišťujeme dokonalé lakování. Používáme prémiové laky a vlastní míchárnu barev, abychom zaručili 100% shodu s původním odstínem a dlouhou životnost.
              </ServiceCard>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-up" delay={0.4}>
              <ServiceCard icon={<FileText size={40} strokeWidth={1.5} />} title="Vyřízení pojistných událostí">
                Jsme smluvním servisem pojišťoven. Veškerou administrativu vyřešíme za vás a pro vaše pohodlí nabízíme náhradní vůz po celou dobu opravy.
              </ServiceCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal variant="fade-right">
            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image 
                src="/why.jpg" 
                alt="Detailní práce na autě" 
                fill 
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-extrabold text-red uppercase">
                Proč svěřit vůz právě nám?
              </h2>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Naše práce je naší vizitkou. Zakládáme si na preciznosti, transparentnosti a osobním přístupu ke každé zakázce.
              </p>

              <ul className="space-y-4">
                {[
                  { title: 'Zkušenosti, které mluví za vše:', text: 'S více než 15 lety praxe v oboru se nezalekneme žádné výzvy.' },
                  { title: 'Moderní technologie a materiály:', text: 'Investujeme do špičkového vybavení a používáme pouze prémiové materiály.' },
                  { title: 'Servis od A do Z bez starostí:', text: 'Od nahlášení škody, přes pojišťovnu, po zapůjčení náhradního vozu.' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-red flex-shrink-0 mt-1" strokeWidth={2} />
                    <span className="text-gray-200 md:text-lg">
                      <span className="font-bold text-red">{item.title}</span> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal variant="fade-up">
            <h2 className="text-red text-3xl md:text-5xl font-extrabold uppercase mb-4">
              Naše práce mluví za vše
            </h2>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16">
              Podívejte se na reálné proměny vozů, které prošly našima rukama.
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <ScrollReveal variant="fade-up" delay={0.2}>
              <ScannerComparison
                beforeImage="/ford1.jpg"
                afterImage="/ford2.jpg"
                beforeAlt="Ford před opravou"
                afterAlt="Ford po opravě"
                title="Oprava čelní části Fordu po nehodě"
                price="15 000 Kč"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal variant="fade-up" delay={0.3}>
            <Link 
              href="/galerie" 
              className="mt-12 inline-flex items-center gap-3 text-white px-8 py-3 glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Prohlédnout celou galerii
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal variant="fade-right">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-red">
                  Spies Hecker
                </h2>
                
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Výsledek naší práce musí nejen skvěle vypadat, ale především musí vydržet. Proto se nespoléháme na náhody, 
                  ale na systémová řešení od Spies Hecker, německého lídra v oboru lakování.
                </p>
                
                <p className="text-lg text-gray-400 mb-8">
                  Díky jejich technologii a našim zkušenostem máme absolutní kontrolu nad každým detailem procesu.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: ShieldCheck, title: 'Dlouhodobá životnost a odolnost', desc: 'Povrch laku je extrémně odolný vůči UV záření, povětrnostním vlivům i běžnému opotřebení.' },
                    { icon: Sparkles, title: 'Perfektní shoda odstínu a lesk', desc: 'Díky digitálnímu spektrometru a rozsáhlé databázi najdeme a namícháme naprosto přesný odstín vaší barvy.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <item.icon className="w-7 h-7 text-red flex-shrink-0 mt-1" strokeWidth={2} />
                      <div>
                        <h4 className="font-bold text-lg text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/spies-hecker.jpg" 
                  alt="Produkty Spies Hecker"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
              Co o nás říkají naši zákazníci
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal variant="fade-right" delay={0.1}>
              <TestimonialCard 
                quote="Po nehodě naší firemní dodávky se v P.S.Color postarali o vše. Rychle vyřídili pojistnou událost a díky náhradnímu vozu jsme minimalizovali prostoje. Profesionální přístup, doporučuji." 
                author="Martin V., jednatel, DAKO STAV s.r.o." 
              />
            </ScrollReveal>
            
            <ScrollReveal variant="fade-left" delay={0.2}>
              <TestimonialCard 
                quote="Nejlepší servis, jaký jsem zažila. Po srážce se zvěří jsem nemusela řešit vůbec nic – vše zařídili s pojišťovnou a auto mi vrátili v lepším stavu, než bylo předtím. Obrovská úleva a skvělá práce." 
                author="Jana S., Ostrava-Poruba" 
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="poptavka" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="block text-white">Získejte nezávaznou</span>
                <span className="block text-red mt-2">cenovou nabídku</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Vyplňte formulář a nahrajte fotku poškození. Ozveme se vám do 24 hodin s odhadem ceny a časovým rámcem opravy.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1}>
            <ContactForm />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <div className="mt-16 text-center">
              <p className="text-gray-400 mb-4">Nebo nás kontaktujte přímo:</p>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <a 
                  href="tel:+420739522226" 
                  className="flex items-center gap-3 text-lg font-semibold text-white hover:text-red transition-colors duration-300"
                >
                  <Phone size={24} />
                  <span>+420 739 522 226</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}