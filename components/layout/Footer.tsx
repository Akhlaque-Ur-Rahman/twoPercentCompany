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

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const pathname = usePathname() ?? "";
  const stickyBarVisible = !STICKY_BAR_HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  return (
    <footer
      className={cx(
        "relative overflow-hidden bg-2nd-bg text-body border-t border-header-stroke",
        stickyBarVisible &&
          "pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0"
      )}
    >
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/[0.07] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 size-72 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden
      />

      {/* Newsletter */}
      <div className="relative page-px section-y">
        <Newsletter />
      </div>

      {/* Main */}
      <div className="relative border-t border-header-stroke">
        <div className="page-px section-y">
          <div className="grid grid-cols-1 gap-phi-4 lg:grid-cols-12 lg:gap-phi-4 xl:gap-phi-5">
            {/* Brand column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-3 w-fit group"
              >
                <span className="relative size-11 shrink-0">
                  <Image
                    src={logo}
                    alt=""
                    aria-hidden
                    sizes="44px"
                    fill
                    className="object-contain"
                  />
                </span>
                <span className="type-card-title text-body group-hover:text-primary transition-colors duration-200">
                  2% Company
                </span>
              </Link>

              <p className="text-secondary-text type-body max-w-md leading-relaxed">
                {footerDescription}
              </p>

              {/* Contact actions */}
              <div className="flex flex-col gap-1 sm:gap-0">
                <a
                  href={mailHref}
                  className="group inline-flex items-center gap-3 type-caption text-secondary-text hover:text-body transition-colors min-h-11 w-fit"
                >
                  <span className="size-9 inline-flex items-center justify-center rounded-control border border-header-stroke bg-main-bg/40 text-primary group-hover:border-primary/40 transition-colors">
                    <Mail className="size-4" aria-hidden />
                  </span>
                  <span className="break-all">{contactInfo.email}</span>
                </a>
                <a
                  href={phoneHref}
                  className="group inline-flex items-center gap-3 type-caption text-secondary-text hover:text-body transition-colors min-h-11 w-fit"
                >
                  <span className="size-9 inline-flex items-center justify-center rounded-control border border-header-stroke bg-main-bg/40 text-primary group-hover:border-primary/40 transition-colors">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  {contactInfo.phone}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 type-caption text-secondary-text hover:text-body transition-colors min-h-11 w-fit"
                >
                  <span className="size-9 inline-flex items-center justify-center rounded-control border border-header-stroke bg-main-bg/40 text-primary group-hover:border-primary/40 transition-colors">
                    <FaWhatsapp className="size-4" aria-hidden />
                  </span>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-8">
              {/* Explore */}
              <nav aria-label="Explore">
                <h3 className="type-label text-body mb-4 tracking-wide uppercase">
                  <span className="inline-block border-b border-primary/50 pb-1">
                    Explore
                  </span>
                </h3>
                <ul className="flex flex-col">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center min-h-10 type-caption text-secondary-text hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Services */}
              <nav aria-label="Services">
                <h3 className="type-label text-body mb-4 tracking-wide uppercase">
                  <span className="inline-block border-b border-primary/50 pb-1">
                    Services
                  </span>
                </h3>
                <ul className="flex flex-col">
                  {servicesLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 min-h-10 type-caption text-secondary-text hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Visit — full width on mobile under the two cols */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="type-label text-body mb-4 tracking-wide uppercase">
                  <span className="inline-block border-b border-primary/50 pb-1">
                    Visit
                  </span>
                </h3>
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
                          className="size-11 inline-flex items-center justify-center rounded-control border border-header-stroke text-secondary-text hover:text-primary hover:border-primary/40 bg-main-bg/40 transition-colors"
                          aria-label={social.label}
                        >
                          <Icon className="size-5" aria-hidden />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-header-stroke bg-main-bg/50">
        <div className="page-px py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-caption text-secondary-text">
            © {year} 2% Company. All rights reserved.
          </p>
          <p className="type-caption text-secondary-text">
            Crafted by{" "}
            <a
              href="https://edunexservices.in/"
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
