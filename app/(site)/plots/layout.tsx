import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plots for Sale',
  description: 'Discover premium residential and commercial plots in Patna. Investment-ready plots with clear titles and excellent location connectivity.',
  keywords: ['plots for sale', 'land for sale', 'residential plots', 'commercial plots', 'Patna plots', 'investment plots'],
  openGraph: {
    title: 'Plots for Sale in Patna | 2% Company',
    description: 'Discover premium residential and commercial plots in Patna. Investment-ready plots with clear titles.',
    url: 'https://www.2percentcompany.in/plots',
    type: 'website',
  },
  alternates: {
    canonical: '/plots',
  },
}

export default function PlotsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
