"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  quickLinks,
  servicesLinks,
  socialLinks,
  contactInfo,
  logo,
  footerDescription,
} from "@/data/FooterData";
import Newsletter from "./NewsLetter";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowUpRight, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";

const phoneHref = telHref();
const mailHref = mailtoHref();
const waHref = whatsappHref(
  "Hi 2% Company, I'd like help with a property enquiry."
);

const STICKY_BAR_HIDDEN_PREFIXES = ["/contact", "/admin"];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const pathname = usePathname() ?? "";
  const stickyBarVisible = !STICKY_BAR_HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  return (
    <footer
      className={[
        "bg-2nd-bg text-body border-t border-header-stroke",
        stickyBarVisible &&
          "pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Newsletter */}
      <div className="page-px section-y">
        <Newsletter />
      </div>

      {/* Main */}
      <div className="border-t border-header-stroke">
        <div className="page-px section-y">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-5">
              <Link
                href="/"
                className="inline-flex items-center gap-3 w-fit group"
              >
                <span className="relative size-10 shrink-0">
                  <Image
                    src={logo}
                    alt=""
                    aria-hidden
                    sizes="40px"
                    fill
                    className="object-contain"
                  />
                </span>
                <span className="type-label text-body group-hover:text-primary transition-colors">
                  2% Company
                </span>
              </Link>

              <p className="text-secondary-text type-body prose-measure max-w-sm">
                {footerDescription}
              </p>

              <div className="flex flex-col gap-1">
                <a
                  href={mailHref}
                  className="inline-flex items-center gap-2.5 type-caption text-secondary-text hover:text-primary transition-colors min-h-11 w-fit"
                >
                  <Mail className="size-4 shrink-0" aria-hidden />
                  {contactInfo.email}
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2.5 type-caption text-secondary-text hover:text-primary transition-colors min-h-11 w-fit"
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {contactInfo.phone}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 type-caption text-secondary-text hover:text-primary transition-colors min-h-11 w-fit"
                >
                  <FaWhatsapp className="size-4 shrink-0" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Explore */}
            <nav
              aria-label="Explore"
              className="lg:col-span-2 sm:col-span-1"
            >
              <h3 className="type-label text-body mb-3 sm:mb-4">Explore</h3>
              <ul className="flex flex-col gap-0.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center min-h-10 type-caption text-secondary-text hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <nav
              aria-label="Services"
              className="lg:col-span-3 sm:col-span-1"
            >
              <h3 className="type-label text-body mb-3 sm:mb-4">Services</h3>
              <ul className="flex flex-col gap-0.5">
                {servicesLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 min-h-10 type-caption text-secondary-text hover:text-primary transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 translate-x-0 -translate-y-0.5 group-hover:opacity-100 transition-all duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Visit */}
            <div className="sm:col-span-2 lg:col-span-3 lg:col-start-auto">
              <h3 className="type-label text-body mb-3 sm:mb-4">Visit</h3>
              <div className="flex gap-2.5 type-caption text-secondary-text leading-relaxed max-w-xs">
                <MapPin
                  className="size-4 shrink-0 mt-0.5 text-primary"
                  aria-hidden
                />
                <p>
                  Serving buyers, sellers, tenants, and investors across Patna
                  and surrounding areas.
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-11 inline-flex items-center justify-center rounded-control border border-header-stroke text-secondary-text hover:text-primary hover:border-primary/40 transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="size-5" aria-hidden />
                      </a>
                    );
                  })}
                </div>
              )}

              <Link
                href="/contact"
                className="group mt-5 inline-flex items-center gap-2 type-body font-semibold text-primary hover:brightness-110 transition min-h-11"
              >
                Get in touch
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-header-stroke">
        <div className="page-px py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-caption text-secondary-text">
            © {year} 2% Company. All rights reserved.
          </p>
          <p className="type-caption text-secondary-text">
            Crafted by{" "}
            <a
              href="https://edunexservices.com/"
              className="text-body hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              EduNex
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
