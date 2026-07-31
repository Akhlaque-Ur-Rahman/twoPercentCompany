import type { Metadata } from "next";
import { Instrument_Serif, Urbanist } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from "@/components/StructuredData";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "2% Company - Best Property and Plot Purchase Platform",
    template: "%s | 2% Company"
  },
  description: "Best Website for Property and Plot Purchase in Patna. Find premium residential properties, plots, and rental options with 2% Company.",
  keywords: ["property", "real estate", "plots", "housing", "apartments", "Patna", "buy property", "rent property"],
  authors: [{ name: "2% Company" }],
  creator: "2% Company",
  publisher: "2% Company",
  metadataBase: new URL('https://www.2percentcompany.in/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.2percentcompany.in/",
    siteName: "2% Company",
    title: "2% Company - Best Property and Plot Purchase Platform",
    description: "Best Website for Property and Plot Purchase in Patna. Find premium residential properties, plots, and rental options.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "2% Company - Property and Plot Purchase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2% Company - Best Property and Plot Purchase Platform",
    description: "Best Website for Property and Plot Purchase in Patna.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body
        className={`${urbanist.variable} ${instrumentSerif.variable} font-urbanist antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
