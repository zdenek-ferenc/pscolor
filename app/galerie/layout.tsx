import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fotogalerie',
  description: 'Fotogalerie realizací autolakovny P.S.Color v Ostravě. Lakování dílů, opravy karoserií a práce v lakovací kabině.',
  alternates: { canonical: '/galerie' },
  openGraph: {
    title: 'Fotogalerie | P.S.Color Autolakovna Ostrava',
    url: '/galerie',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
