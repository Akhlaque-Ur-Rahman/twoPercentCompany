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
import { Mail, Phone } from "lucide-react";

const phoneHref = `tel:${contactInfo.phone.replace(/\s+/g, "")}`;
const mailHref = `mailto:${contactInfo.email}`;

const Footer: React.FC = () => {
  return (
    <footer className="bg-2nd-bg text-body section-y page-px">
      <Newsletter />

      <div className="flex flex-wrap justify-center lg:justify-between gap-8">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 flex-[1_1_200px]">
          <div className="relative w-12 h-12">
            <Image
              src={logo}
              alt="2% Company"
              sizes="48px"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-secondary-text type-caption">{footerDescription}</p>
        </div>

        <div className="flex flex-col space-y-2 text-center lg:text-left flex-[1_1_150px]">
          <h3 className="text-primary type-label mb-2">Quick Links</h3>
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-secondary-text hover:text-primary transition type-caption"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col space-y-2 text-center lg:text-left flex-[1_1_150px]">
          <h3 className="text-primary type-label mb-2">Services</h3>
          {servicesLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-secondary-text hover:text-primary transition type-caption"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 flex-[1_1_200px]">
          <h3 className="text-primary type-label mb-2">Connect With Us</h3>
          {socialLinks.length > 0 && (
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-text hover:text-primary transition min-w-11 min-h-11 inline-flex items-center justify-center"
                    aria-label={social.label}
                  >
                    <Icon className="size-6" aria-hidden />
                  </a>
                );
              })}
            </div>
          )}
          <a
            href={mailHref}
            className="text-secondary-text hover:text-primary transition type-caption flex gap-2 items-center min-h-11"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {contactInfo.email}
          </a>
          <a
            href={phoneHref}
            className="text-secondary-text hover:text-primary transition type-caption flex gap-2 items-center min-h-11"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {contactInfo.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-header-stroke mt-10 pt-4 text-center text-secondary-text type-caption space-y-1">
        <div>© {new Date().getFullYear()} 2% Company. All rights reserved.</div>
        <div>
          <p>
            Made with <span className="text-red-500">❤</span> by{" "}
            <a
              href="https://edunexservices.com/"
              className="hover:underline"
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
