'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PhoneCall } from 'lucide-react'

// Plovoucí tlačítko pro rychlé zavolání na mobilu.
// Kulaté a malé, aby nezakrývalo obsah; ukáže se po odscrollování z hero sekce
// a schová se u kontaktního formuláře a v patičce, kde je telefon vidět přímo.
export const MobileCallButton = () => {
  const [pastHero, setPastHero] = useState(false)
  const [contactInView, setContactInView] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setPastHero(window.scrollY > 560)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const targets = [document.getElementById('poptavka'), document.querySelector('footer')].filter(
      (el): el is HTMLElement => !!el,
    )
    const visible = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      setContactInView(visible.size > 0)
    })
    targets.forEach((t) => io.observe(t))

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      io.disconnect()
      setContactInView(false)
    }
  }, [pathname])

  const show = pastHero && !contactInView

  return (
    <a
      href="tel:+420739522226"
      aria-label="Zavolat +420 739 522 226"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_30px_rgb(224_48_42/0.35)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 md:hidden ${
        show ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-90 opacity-0'
      }`}
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <PhoneCall size={22} strokeWidth={2} />
    </a>
  )
}
