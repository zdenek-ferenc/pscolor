import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Providers } from '@/components/Providers'
import { Footer } from '@/components/Footer'
import { MobileCallButton } from '@/components/MobileCallButton'
import { SITE_NAME, SITE_URL, localBusinessJsonLd } from '@/lib/site'

const geist = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist',
  display: 'swap',
})

const description = 'Precizní opravy karoserií a laků v Ostravě. Vrátíme vašemu vozu dokonalý vzhled.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'P.S.Color | Autolakovna Ostrava',
    template: '%s | P.S.Color Autolakovna Ostrava',
  },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: SITE_NAME,
    title: 'P.S.Color | Autolakovna Ostrava',
    description,
    url: '/',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Lakovací kabina P.S.Color' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P.S.Color | Autolakovna Ostrava',
    description,
    images: ['/og.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={geist.variable}>
      <body className="bg-background text-foreground antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <div id="top" aria-hidden="true" className="absolute top-0 h-px w-px" />
        {/* Bez JavaScriptu nic nezůstane schované za scroll animací. */}
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <Providers>
          <Header />
          {children}
          <Footer />
          <MobileCallButton />
        </Providers>
      </body>
    </html>
  )
}
