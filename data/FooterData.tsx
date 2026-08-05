export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Plots", href: "/plots" },
  { label: "Our Experts", href: "/team" },
  { label: "About Us", href: "/aboutUs" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const servicesLinks: FooterLink[] = [
  { label: "Sell", href: "/sell" },
  { label: "Plots & Land", href: "/plots" },
  { label: "Be A Tenant", href: "/rent/tenants" },
  { label: "Be A Landlord", href: "/rent/landlords" },
  { label: "Be An Investor", href: "/beaninvestor" },
];

/**
 * Add real profile URLs when available (with react-icons).
 * Empty array hides social icons — no example.com placeholders.
 */
export const socialLinks: SocialLink[] = [];

export const contactInfo = {
  email: "2percent-patna@gmail.com",
  phone: "+91 99559 96464",
};

export const logo = "/images/2PercentCompany.png";

export const footerDescription =
  "Premium guidance for buying, selling, renting, and investing in Patna real estate.";
