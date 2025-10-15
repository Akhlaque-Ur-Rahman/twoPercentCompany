import { IconType } from "react-icons";
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType; // store the component
}

// Quick links
export const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About Us", href: "/aboutUs" },
  { label: "Services", href: "services" },
  { label: "Contact", href: "/contact" },
];

// Services / Other links
export const servicesLinks: FooterLink[] = [
  { label: "Sell", href: "/sell" },
  { label: "Be A Tenant", href: "/tenants" },
  { label: "Be A Landlord", href: "/landlords" },
  { label: "Be An Investor", href: "/beaninvestor" },

];

// Social links
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://example.com/social", icon: FaLinkedin },
  { label: "Instagram", href: "https://example.com/social", icon: FaInstagram },
  { label: "Twitter", href: "https://example.com/social", icon: FaTwitter },
  { label: "Facebook", href: "https://example.com/social", icon: FaFacebook },
];

// Contact info
export const contactInfo = {
  email: "2percent-patna@gmail.com",
  phone: "+91 99559 96464",
};

// Logo placeholder
export const logo = "/images/2PercentCompany.png";

// Footer description
export const footerDescription =
  "Bringing you the latest properties, plots, and real estate insights.";
