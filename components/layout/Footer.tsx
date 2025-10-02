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

const Footer: React.FC = () => {
  return (
    <footer className="bg-2nd-bg text-white py-10 px-6 sm:px-10">
      <Newsletter />

      <div className="flex flex-wrap justify-center lg:justify-between gap-8 ">
        {/* Logo / About */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 flex-[1_1_200px]">
          <div className="relative w-[48px] h-[48px]">
            <Image src={logo} alt="BrandLogo" sizes="48px" fill className="object-contain" priority />
          </div>
          <p className="text-secondary-text text-[14px] sm:text-[15px]">
            {footerDescription}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2 text-center lg:text-left flex-[1_1_150px]">
          <h3 className=" text-primary font-semibold mb-2">Quick Links</h3>
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-secondary-text hover:text-primary transition text-[14px] sm:text-[15px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Services */}
        <div className="flex flex-col space-y-2 text-center lg:text-left flex-[1_1_150px]">
          <h3 className=" text-primary font-semibold mb-2">Services</h3>
          {servicesLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-secondary-text hover:text-primary transition text-[14px] sm:text-[15px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 flex-[1_1_200px]">
          <h3 className=" text-primary font-semibold mb-2">Connect With Us</h3>
          <div className="flex gap-4 justify-center lg:justify-start">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-secondary-text hover:text-primary transition text-2xl"
                  aria-label={social.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
          <p className="text-secondary-text text-[14px] sm:text-[15px] flex gap-2 items-center">
            <Mail className="size-4" writingMode={2} />
            {contactInfo.email}
          </p>
          <p className="text-secondary-text text-[14px] sm:text-[15px] flex gap-2 items-center">
            <Phone className="size-4" writingMode={2} />
            {contactInfo.phone}
          </p>
        </div>
      </div>

      {/* Copyright */}

      <div className="border-t border-header-stroke mt-10 pt-4 text-center text-secondary-text text-[13px] sm:text-[14px] space-y-1">
        <div>© 2025 2%Company. All rights reserved.</div>
        <div className="text-[12px] sm:text-[13px]">
          Made with <span className="text-red-500">❤️</span> by EDUNEX SERVICES
        </div>
      </div>
    </footer>
  );
};

export default Footer;
