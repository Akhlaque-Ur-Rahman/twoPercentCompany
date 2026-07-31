"use client";

import React from "react";
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
import { Mail, Phone, ArrowUpRight } from "lucide-react";

const phoneHref = `tel:${contactInfo.phone.replace(/\s+/g, "")}`;
const mailHref = `mailto:${contactInfo.email}`;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-2nd-bg text-body border-t border-header-stroke">
      <div className="page-px section-y">
        <Newsletter />
      </div>

      <div className="border-t border-header-stroke">
        <div className="page-px section-y">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-4 flex flex-col gap-5">
              <Link href="/" className="inline-flex items-center gap-3 w-fit group">
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
              <div className="flex flex-col gap-2 pt-1">
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
              </div>
            </div>

            <div className="lg:col-span-2 sm:col-start-1 lg:col-start-auto">
              <h3 className="type-label text-body mb-4">Explore</h3>
              <ul className="flex flex-col gap-1">
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
            </div>

            <div className="lg:col-span-3">
              <h3 className="type-label text-body mb-4">Services</h3>
              <ul className="flex flex-col gap-1">
                {servicesLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 min-h-10 type-caption text-secondary-text hover:text-primary transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 transition-all"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="type-label text-body mb-4">Visit</h3>
              <p className="type-caption text-secondary-text leading-relaxed max-w-xs">
                Serving buyers, sellers, tenants, and investors across Patna and
                surrounding areas.
              </p>
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
                className="mt-6 inline-flex items-center gap-2 type-body font-semibold text-primary hover:brightness-110 transition min-h-11"
              >
                Get in touch
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-header-stroke">
        <div className="page-px py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
