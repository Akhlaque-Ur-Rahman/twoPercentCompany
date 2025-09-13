"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { NavbarData } from "@/data/NavbarData";
import { usePathname } from "next/navigation";
import { ChartNoAxesGantt, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="xl:px-[40px] p-[24px] xl:py-[16px] flex justify-between items-center bg-2nd-bg relative z-50 outline-2 outline-header-stroke">
      {/* Logo */}
      <div className="logo-container relative">
        <Image src="/images/2PercentCompany.png" height={49} width={160} alt="brand-logo" className="w-[32px] h-[32px] lg:h-[48px] lg:w-[48px]" />
      </div>

      {/* Desktop Nav */}
      <div className="nav-items hidden xl:flex xl:px-[32px] xl:py-[8px] xl:gap-[24px]">
        {NavbarData.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-12 py-4 rounded-[12px] block transition-all duration-200 ${
                isActive
                  ? "text-primary bg-main-bg shadow-[0_0_0_2px_var(--color-header-stroke)]"
                  : "hover:bg-main-bg hover:shadow-[0_0_0_2px_var(--color-header-stroke)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Contact Btn (Desktop) */}
      <div className="contact-btn hidden xl:block border-2 border-header-stroke rounded-[12px] xl:px-[32px] xl:py-[16px]">
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
        className={`fixed bottom-0 left-0 right-0 bg-2nd-bg rounded-t-2xl z-50 transform transition-transform duration-300  px-[32px] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Close button */}
        

        {/* Drawer Nav Links */}
        <nav className="flex flex-col mt-8 border-1 border-header-stroke p-[24px] gap-[24px] rounded-[24px]">
          <div className="text-right">
          <button
          className=" text-white"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>
        </div>
          {NavbarData.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // close on click
                className={`text-lg py-3 px-4 rounded-lg text-center border-1 border-header-stroke ${
                  isActive
                    ? "bg-primary shadow-[0_0_0_2px_var(--color-header-stroke)] border-none"
                    : " hover:bg-main-bg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Contact Button */}
        <div className=" border-2 border-header-stroke rounded-xl py-3 text-center">
          <button className="text-lg  w-full">Contact Us</button>
        </div>
        </nav>

        
      </div>
    </header>
  );
};

export default Navbar;
