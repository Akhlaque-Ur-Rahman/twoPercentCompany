"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { NavbarData, ContactBtnData } from "@/data/NavbarData";
import { usePathname } from "next/navigation";
import { ChartNoAxesGantt, X, ChevronDown, ArrowLeft } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<null | string>(null); // "Services" | "Rent" | null

  const checkActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

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
          priority
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden xl:flex xl:px-[32px] xl:py-[8px] xl:gap-[24px] items-center relative">
        {NavbarData.map((item) => {
          const isActive =
            checkActive(item.href) ||
            (item.submenu &&
              item.submenu.some((sub) => checkActive(sub.href)));

          if ((item.label === "Services" || item.label === "Rent") && item.submenu) {
            return (
              <div key={item.label} className="relative group">
                <span
                  className={`px-12 py-4 rounded-[12px] flex items-center gap-1 cursor-default select-none transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-main-bg shadow-[0_0_0_2px_var(--color-header-stroke)]"
                      : "hover:bg-main-bg hover:shadow-[0_0_0_2px_var(--color-header-stroke)]"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:-rotate-180"
                  />
                </span>

                {/* Desktop Dropdown */}
                <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-2nd-bg border border-header-stroke rounded-lg shadow-lg z-50 w-full">
                  {item.submenu.map((sub) => {
                    const subActive = checkActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block px-4 py-2 rounded-lg ${
                          subActive ? "bg-primary text-main-bg" : "hover:bg-main-bg"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-12 py-4 rounded-[12px] transition-all duration-200 ${
                isActive
                  ? "bg-primary text-main-bg shadow-[0_0_0_2px_var(--color-header-stroke)]"
                  : "hover:bg-main-bg hover:shadow-[0_0_0_2px_var(--color-header-stroke)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Contact Btn (Desktop) */}
      <div
        className={`contact-btn hidden xl:block rounded-[12px] xl:px-[32px] xl:py-[16px] transition-all duration-200 ${
          checkActive(ContactBtnData.href)
            ? "bg-primary text-black shadow-[0_0_0_2px_var(--color-header-stroke)]"
            : "border-2 border-header-stroke hover:bg-main-bg"
        }`}
      >
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setIsOpen(false);
            setSubmenuOpen(null);
          }}
        />
      )}

      {/* Main Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-2nd-bg rounded-t-2xl z-50 transform transition-transform duration-300 px-[32px] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="text-right mt-4">
          <button
            className="text-white"
            onClick={() => {
              setIsOpen(false);
              setSubmenuOpen(null);
            }}
          >
            <X size={28} />
          </button>
        </div>

        {/* Main Menu */}
        <nav className="flex flex-col mt-8 gap-4 pb-6 relative">
          {NavbarData.map((item) => {
            const isActive =
              checkActive(item.href) ||
              (item.submenu &&
                item.submenu.some((sub) => checkActive(sub.href)));

            // Only open submenu for Services or Rent
            if ((item.label === "Services" || item.label === "Rent") && item.submenu) {
              return (
                <button
                  key={item.label}
                  className={`flex justify-start items-center gap-3 w-full py-3 px-30 text-left rounded-lg border border-header-stroke ${
                    isActive ? "bg-primary text-black" : ""
                  }`}
                  onClick={() => setSubmenuOpen(item.label)}
                >
                  {item.label}
                  <ChevronDown />
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-30 rounded-lg text-left border border-header-stroke ${
                  isActive
                    ? "bg-primary text-black shadow-[0_0_0_2px_var(--color-header-stroke)] border-none"
                    : "hover:bg-main-bg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Contact Button */}
          <div
            className={`rounded-xl py-3 text-left  transition-all duration-200 ${
              checkActive(ContactBtnData.href)
                ? "bg-primary text-black shadow-[0_0_0_2px_var(--color-header-stroke)]"
                : "border-2 border-header-stroke hover:bg-main-bg"
            }`}
          >
            <Link
              href={ContactBtnData.href}
              className="text-lg w-full px-30"
              onClick={() => setIsOpen(false)}
            >
              {ContactBtnData.label}
            </Link>
          </div>
        </nav>

        {/* Submenu Drawer */}
        {submenuOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-2nd-bg rounded-t-2xl flex flex-col transform transition-transform duration-300 z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-header-stroke">
              <button
                onClick={() => setSubmenuOpen(null)}
                className="flex items-center gap-2 text-white"
              >
                <ArrowLeft size={20} /> Back
              </button>
              <span className="font-semibold text-white">{submenuOpen}</span>
            </div>
            <div className="flex flex-col mt-4 gap-2 px-4">
              {NavbarData.find((i) => i.label === submenuOpen)?.submenu?.map((sub) => {
                const subActive = checkActive(sub.href);
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => {
                      setIsOpen(false);
                      setSubmenuOpen(null);
                    }}
                    className={`py-3 px-38 rounded-lg border border-header-stroke text-left ${
                      subActive ? "bg-primary text-black" : "hover:bg-main-bg"
                    }`}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
