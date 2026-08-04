import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact 2% Company in Patna for buying, selling, renting, or investing. Call, WhatsApp, or send an enquiry — clear guidance from first message to closing.',
  keywords: [
    'contact 2% company',
    'Patna property enquiry',
    'real estate contact Patna',
    'WhatsApp property Patna',
  ],
  openGraph: {
    title: 'Contact 2% Company | Get in Touch',
    description:
      'Call, WhatsApp, or send an enquiry — Patna real-estate guidance from first message to closing.',
    url: 'https://www.2percentcompany.in/contact',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
