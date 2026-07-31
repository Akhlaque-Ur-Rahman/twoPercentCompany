import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties for Sale',
  description: 'Browse our premium collection of residential properties in Patna. Find 1BHK, 2BHK, 3BHK apartments, villas, and independent houses with modern amenities.',
  keywords: ['properties for sale', 'apartments', 'villas', 'residential properties', 'Patna properties', '1BHK', '2BHK', '3BHK'],
  openGraph: {
    title: 'Properties for Sale in Patna | 2% Company',
    description: 'Browse our premium collection of residential properties in Patna. Find your dream home with modern amenities.',
    url: 'https://www.2percentcompany.in/properties',
    type: 'website',
  },
  alternates: {
    canonical: '/properties',
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
