import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist ({
  subsets:["latin"],
  variable:"--font-urbanist"
})

export const metadata: Metadata = {
  title: "2% Company",
  description: "Best Website for Propertiy and Plot Purchase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} sans`}
      >
        {children}
      </body>
    </html>
  );
}
