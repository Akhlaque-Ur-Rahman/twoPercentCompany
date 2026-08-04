import { contactInfo } from "@/data/FooterData";

/** Digits only, with country code (e.g. 919955996464). */
export function phoneDigits(phone = contactInfo.phone): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function telHref(phone = contactInfo.phone): string {
  return `tel:+${phoneDigits(phone)}`;
}

export function mailtoHref(email = contactInfo.email): string {
  return `mailto:${email}`;
}

/** WhatsApp chat URL; optional prefilled message. */
export function whatsappHref(
  message?: string,
  phone = contactInfo.phone
): string {
  const base = `https://wa.me/${phoneDigits(phone)}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

export function listingEnquiryMessage(title: string, href?: string): string {
  const link = href ? `\n${href}` : "";
  return `Hi 2% Company, I'm interested in "${title}". Please share more details.${link}`;
}
