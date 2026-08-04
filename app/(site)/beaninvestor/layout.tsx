import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Be an Investor",
  description:
    "Partner with 2% Company on curated real-estate and proptech investments in Patna. Share your details and start a clear, confidential conversation.",
  keywords: [
    "invest in Patna real estate",
    "property investment Patna",
    "2% Company investor",
    "proptech investment India",
  ],
  openGraph: {
    title: "Be an Investor | 2% Company",
    description:
      "Curated investment opportunities with transparent guidance — from enquiry to partnership.",
    url: "https://www.2percentcompany.in/beaninvestor",
    type: "website",
  },
  alternates: {
    canonical: "/beaninvestor",
  },
};

export default function BeAnInvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
