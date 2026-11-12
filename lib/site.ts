// Základní údaje o firmě, sdílené mezi metadaty, strukturovanými daty a sitemapou.
// Doménu lze přepsat proměnnou NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pscolor.cz').replace(/\/$/, '')

export const SITE_NAME = 'P.S.Color'

// Profil P.S. COLOR s.r.o. na Mapách Google, odkaz otevírá rovnou záložku Recenze.
// Hodnocení a počet recenzí je třeba občas ručně aktualizovat (stav 11/2026: 5,0 ze 7).
export const GOOGLE_REVIEWS = {
  url: 'https://www.google.com/maps/place/P.S.+COLOR+s.r.o./@49.8335777,18.2497059,17z/data=!4m8!3m7!1s0x4713e3ebbf0586bd:0xfd25f93973cfda0a!8m2!3d49.8335777!4d18.2497059!9m1!1b1!16s%2Fg%2F11kpl3drsm',
  rating: '5,0',
  count: 7,
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoBodyShop',
  name: 'P.S.Color',
  description: 'Precizní lakýrnické a karosářské práce v Ostravě. Spies Hecker technologie, vyřízení pojistných událostí.',
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/logo.png`,
  telephone: '+420739522226',
  email: 'info@pscolor.cz',
  vatID: 'CZ29391512',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Novoveská 95/11',
    addressLocality: 'Ostrava',
    postalCode: '709 00',
    addressCountry: 'CZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.83367,
    longitude: 18.25002,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: ['https://www.instagram.com/p.s.color/'],
}
