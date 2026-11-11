'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { PhoneCall } from 'lucide-react'

// Plovoucí tlačítko pro rychlé zavolání na mobilu. Objeví se, jakmile zákazník odscrolluje z hero sekce.
export const MobileCallButton = () => {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 560))

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="tel:+420739522226"
          aria-label="Zavolat +420 739 522 226"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="btn btn-primary fixed right-4 z-30 !h-12 !px-5 shadow-[0_10px_30px_rgb(224_48_42/0.35)] md:hidden"
          style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          <PhoneCall size={18} strokeWidth={2} />
          Zavolat
        </motion.a>
      )}
    </AnimatePresence>
  )
}
