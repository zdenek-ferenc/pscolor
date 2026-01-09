import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Footer } from '@/components/Footer'

const urbanist = Urbanist({ 
  subsets: ['latin-ext'],
  variable: '--font-urbanist',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'P.S.Color | Autolakovna Ostrava',
  description: 'Precizní opravy karoserií a laků v Ostravě. Vrátíme vašemu vozu dokonalý vzhled.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={`${urbanist.variable}`}>
      <body className="bg-darker text-gray-100 antialiased selection:bg-red selection:text-white font-sans">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}