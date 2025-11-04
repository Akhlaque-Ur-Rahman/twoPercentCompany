import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about 2% Company - transforming industries with innovative real estate solutions and measurable impact. Discover our journey, values, and commitment to excellence in property services.',
  keywords: ['about 2% company', 'real estate company', 'property services', 'our story', 'company values'],
  openGraph: {
    title: 'About 2% Company - Our Story & Values',
    description: 'Learn about 2% Company - transforming industries with innovative real estate solutions and measurable impact.',
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
