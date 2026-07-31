"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { NavbarData, ContactBtnData } from "@/data/NavbarData";
import { usePathname } from "next/navigation";
import { ChartNoAxesGantt, X, ChevronDown, ArrowLeft } from "lucide-react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<null | string>(null);
  const [desktopOpen, setDesktopOpen] = useState<null | string>(null);
  const drawerId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  const checkActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setSubmenuOpen(null);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Escape closes drawer / desktop menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isOpen) {
        closeDrawer();
        menuButtonRef.current?.focus();
      }
      if (desktopOpen) setDesktopOpen(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, desktopOpen, closeDrawer]);

  // Focus trap + initial focus in drawer
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;
    const drawer = drawerRef.current;
    const focusables = Array.from(
      drawer.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter((el) => !el.hasAttribute("disabled"));
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    drawer.addEventListener("keydown", onKeyDown);
    return () => drawer.removeEventListener("keydown", onKeyDown);
  }, [isOpen, submenuOpen]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!desktopOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(e.target as Node)
      ) {
        setDesktopOpen(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [desktopOpen]);

  return (
    <header className="xl:px-10 p-6 xl:py-4 flex justify-between items-center bg-2nd-bg relative z-50 outline-2 outline-header-stroke">
      <Link href="/" className="logo-container relative shrink-0">
        <Image
          src="/images/2PercentCompany.png"
          height={49}
          width={160}
          alt="2% Company"
          sizes="48px"
          className="w-8 h-8 lg:h-12 lg:w-12 object-contain"
          priority
        />
      </Link>

      {/* Desktop Nav */}
      <div
        ref={desktopNavRef}
        className="hidden xl:flex xl:px-8 xl:py-2 xl:gap-6 items-center relative"
      >
        {NavbarData.map((item) => {
          const isActive =
            checkActive(item.href) ||
            (item.submenu && item.submenu.some((sub) => checkActive(sub.href)));

          if ((item.label === "Services" || item.label === "Rent") && item.submenu) {
            const open = desktopOpen === item.label;
            const menuId = `desktop-menu-${item.label}`;
            return (
              <div key={item.label} className="relative">
                <div className="flex items-stretch rounded-control overflow-hidden">
                  <Link
                    href={item.href}
                    className={`px-8 py-4 transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-on-primary"
                        : "hover:bg-main-bg"
                    }`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="menu"
                    aria-controls={menuId}
                    onClick={() =>
                      setDesktopOpen(open ? null : item.label)
                    }
                    className={`px-3 py-4 transition-all duration-200 border-l border-header-stroke ${
                      isActive
                        ? "bg-primary text-on-primary"
                        : "hover:bg-main-bg"
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        open ? "-rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                    <span className="sr-only">{item.label} submenu</span>
                  </button>
                </div>

                {open && (
                  <div
                    id={menuId}
                    role="menu"
                    className="absolute left-0 top-full mt-1 flex flex-col bg-2nd-bg border border-header-stroke rounded-control shadow-lg z-50 min-w-full"
                  >
                    {item.submenu.map((sub) => {
                      const subActive = checkActive(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          role="menuitem"
                          onClick={() => setDesktopOpen(null)}
                          className={`block px-4 py-3 rounded-control ${
                            subActive
                              ? "bg-primary text-on-primary"
                              : "hover:bg-main-bg"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-12 py-4 rounded-control transition-all duration-200 ${
                isActive
                  ? "bg-primary text-on-primary shadow-[0_0_0_2px_var(--color-header-stroke)]"
                  : "hover:bg-main-bg hover:shadow-[0_0_0_2px_var(--color-header-stroke)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <Link
        href={ContactBtnData.href}
        className={`contact-btn hidden xl:inline-flex items-center rounded-control xl:px-8 xl:py-4 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          checkActive(ContactBtnData.href)
            ? "bg-primary text-on-primary shadow-[0_0_0_2px_var(--color-header-stroke)]"
            : "border-2 border-header-stroke hover:bg-main-bg"
        }`}
      >
        {ContactBtnData.label}
      </Link>

      <button
        ref={menuButtonRef}
        type="button"
        className="xl:hidden text-body min-w-11 min-h-11 inline-flex items-center justify-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={drawerId}
        onClick={() => setIsOpen(true)}
      >
        <ChartNoAxesGantt size={28} aria-hidden />
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 bg-overlay z-40 cursor-default"
          onClick={closeDrawer}
        />
      )}

      <div
        id={drawerId}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed bottom-0 left-0 right-0 bg-2nd-bg rounded-t-2xl z-50 transform transition-transform duration-300 px-8 max-h-[90vh] overflow-y-auto ${
          isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
        inert={!isOpen ? true : undefined}
      >
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="text-body min-w-11 min-h-11 inline-flex items-center justify-center"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <X size={28} aria-hidden />
          </button>
        </div>

        <nav className="flex flex-col mt-8 gap-4 pb-6 relative" aria-label="Primary">
          {NavbarData.map((item) => {
            const isActive =
              checkActive(item.href) ||
              (item.submenu &&
                item.submenu.some((sub) => checkActive(sub.href)));

            if (
              (item.label === "Services" || item.label === "Rent") &&
              item.submenu
            ) {
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-expanded={submenuOpen === item.label}
                  className={`flex justify-start items-center gap-3 w-full min-h-11 py-3 px-6 text-left rounded-control border border-header-stroke ${
                    isActive ? "bg-primary text-on-primary" : ""
                  }`}
                  onClick={() => setSubmenuOpen(item.label)}
                >
                  {item.label}
                  <ChevronDown aria-hidden />
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDrawer}
                className={`py-3 px-6 min-h-11 rounded-control text-left border border-header-stroke inline-flex items-center ${
                  isActive
                    ? "bg-primary text-on-primary shadow-[0_0_0_2px_var(--color-header-stroke)] border-none"
                    : "hover:bg-main-bg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href={ContactBtnData.href}
            className={`rounded-control py-3 px-6 min-h-11 inline-flex items-center type-body transition-all duration-200 ${
              checkActive(ContactBtnData.href)
                ? "bg-primary text-on-primary shadow-[0_0_0_2px_var(--color-header-stroke)]"
                : "border-2 border-header-stroke hover:bg-main-bg"
            }`}
            onClick={closeDrawer}
          >
            {ContactBtnData.label}
          </Link>
        </nav>

        {submenuOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-2nd-bg rounded-t-2xl flex flex-col z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-header-stroke">
              <button
                type="button"
                onClick={() => setSubmenuOpen(null)}
                className="flex items-center gap-2 text-body min-h-11 px-2"
              >
                <ArrowLeft size={20} aria-hidden /> Back
              </button>
              <Link
                href={
                  NavbarData.find((i) => i.label === submenuOpen)?.href ?? "/"
                }
                onClick={closeDrawer}
                className="font-semibold text-body hover:text-primary transition-colors min-h-11 inline-flex items-center"
              >
                {submenuOpen}
              </Link>
            </div>
            <div className="flex flex-col mt-4 gap-2 px-4 pb-6">
              {NavbarData.find((i) => i.label === submenuOpen)?.submenu?.map(
                (sub) => {
                  const subActive = checkActive(sub.href);
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={closeDrawer}
                      className={`py-3 px-6 min-h-11 rounded-control border border-header-stroke text-left inline-flex items-center ${
                        subActive
                          ? "bg-primary text-on-primary"
                          : "hover:bg-main-bg"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
