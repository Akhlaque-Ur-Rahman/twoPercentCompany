"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { navbarData } from "@/data/navbarData";
import { usePathname } from "next/navigation";
import { ChartNoAxesGantt, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="xl:px-[40px] xl:py-[16px] flex justify-between items-center bg-2nd-bg relative z-50 outline-2 outline-header-stroke">
      {/* Logo */}
      <div className="logo-container relative h-[49px] w-[160px]">
        <Image src="/images/logo.png" fill alt="brand-logo" />
      </div>

      {/* Desktop Nav */}
      <div className="nav-items hidden xl:flex xl:px-[32px] xl:py-[8px] xl:gap-[24px]">
        {navbarData.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-12 py-4 rounded-[12px] block transition-all duration-200 ${
                isActive
                  ? "text-primary bg-main-bg shadow-[0_0_0_2px_var(--color-header-stroke)]"
                  : "hover:bg-main-bg hover:shadow-[0_0_0_2px_var(--color-header-stroke)] text-secondary-text"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Contact Btn (Desktop) */}
      <div className="contact-btn hidden xl:block border-2 border-white rounded-[12px] xl:px-[32px] xl:py-[16px]">
        <button className="text-16-semibold cursor-pointer">Contact Us</button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="xl:hidden text-white"
        onClick={() => setIsOpen(true)}
      >
        <ChartNoAxesGantt size={28} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-2nd-bg rounded-t-2xl p-6 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-6 text-white"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col gap-4 mt-8">
          {navbarData.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // close on click
                className={`text-lg py-3 px-4 rounded-lg text-center border-1 border-white ${
                  isActive
                    ? "bg-primary shadow-[0_0_0_2px_var(--color-header-stroke)] border-none"
                    : "text-secondary-text hover:bg-main-bg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Contact Button */}
        <div className="mt-6 border-2 border-white rounded-xl py-3 text-center">
          <button className="text-2xl font-bold w-full">Contact Us</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
