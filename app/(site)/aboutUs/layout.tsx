import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about 2% Company — a Patna real-estate partner for buying, selling, renting, and investing, with clear guidance from enquiry to closing.',
  keywords: [
    'about 2% company',
    'Patna real estate',
    'property services Patna',
    'our story',
    'company values',
  ],
  openGraph: {
    title: 'About 2% Company — Our Story & Values',
    description:
      'A Patna real-estate partner for buying, selling, renting, and investing — with clear guidance at every step.',
    url: 'https://www.2percentcompany.in/aboutUs',
    type: 'website',
  },
  alternates: {
    canonical: '/aboutUs',
  },
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
