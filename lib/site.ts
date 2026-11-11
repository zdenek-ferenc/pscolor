// Základní údaje o firmě, sdílené mezi metadaty, strukturovanými daty a sitemapou.
// Doménu lze přepsat proměnnou NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pscolor.cz').replace(/\/$/, '')

export const SITE_NAME = 'P.S.Color'

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
