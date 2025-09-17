"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { NavbarData, ContactBtnData } from "@/data/NavbarData";
import { usePathname } from "next/navigation";
import { ChartNoAxesGantt, X, ChevronDown, ChevronUp } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="xl:px-[40px] p-[24px] xl:py-[16px] flex justify-between items-center bg-2nd-bg relative z-50 outline-2 outline-header-stroke">
      {/* Logo */}
      <div className="logo-container relative">
        <Image
          src="/images/2PercentCompany.png"
          height={49}
          width={160}
          alt="brand-logo"
          className="w-[32px] h-[32px] lg:h-[48px] lg:w-[48px]"
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden xl:flex xl:px-[32px] xl:py-[8px] xl:gap-[24px] items-center relative">
        {NavbarData.map((item) => {
          const isActive = pathname === item.href;

          // Services with dropdown
          if (item.label === "Services" && item.submenu) {
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`px-12 py-4 rounded-[12px] block transition-all duration-200 flex items-center gap-1 ${
                    isActive
                      ? "text-primary bg-main-bg shadow-[0_0_0_2px_var(--color-header-stroke)]"
                      : "hover:bg-main-bg hover:shadow-[0_0_0_2px_var(--color-header-stroke)]"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:-rotate-180"
                  />
                </Link>

                {/* Dropdown */}
                <div className="absolute left-0 top-full w-full hidden group-hover:flex flex-col bg-2nd-bg border border-header-stroke rounded-lg shadow-lg z-50">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2 hover:bg-main-bg rounded-lg"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

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
        <Link href={ContactBtnData.href}>
          <button className="text-16-semibold cursor-pointer">
            {ContactBtnData.label}
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button className="xl:hidden text-white" onClick={() => setIsOpen(true)}>
        <ChartNoAxesGantt size={28} />
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Mobile Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-2nd-bg rounded-t-2xl z-50 transform transition-transform duration-300 px-[32px] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="text-right mt-4">
          <button className="text-white" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col mt-8 gap-4 pb-6">
          {NavbarData.map((item) => {
            const isActive = pathname === item.href;

            // Services with toggle
            if (item.label === "Services" && item.submenu) {
              return (
                <div key={item.href} className="flex flex-col gap-2">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex justify-center items-center gap-3 w-full py-3 px-4 text-left rounded-lg border border-header-stroke ${
                      isActive ? "bg-primary text-black" : ""
                    }`}
                  >
                    {item.label}
                    {servicesOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {servicesOpen && (
                    <div className="flex flex-col gap-2 pl-4">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="py-2 text-center rounded-lg border border-header-stroke hover:bg-primary hover:text-black"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 rounded-lg text-center border border-header-stroke ${
                  isActive
                    ? "bg-primary shadow-[0_0_0_2px_var(--color-header-stroke)] border-none"
                    : "hover:bg-main-bg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Contact Button */}
          <div className="border-2 border-header-stroke rounded-xl py-3 text-center mt-4">
            <Link
              href={ContactBtnData.href}
              className="text-lg w-full"
              onClick={() => setIsOpen(false)}
            >
              {ContactBtnData.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
