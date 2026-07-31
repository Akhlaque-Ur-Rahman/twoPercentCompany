import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with 2% Company for all your property needs. Our team is ready to assist you in finding your perfect property or plot in Patna.',
  keywords: ['contact 2% company', 'property inquiry', 'real estate contact', 'Patna property contact'],
  openGraph: {
    title: 'Contact 2% Company | Get in Touch',
    description: 'Get in touch with 2% Company for all your property needs in Patna.',
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
