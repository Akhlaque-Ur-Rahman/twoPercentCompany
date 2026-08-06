"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { NavbarData, ContactBtnData, type NavItem } from "@/data/NavbarData";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight, Heart } from "lucide-react";
import { useSavedListings } from "@/components/providers/SavedListingsProvider";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const Navbar = () => {
  const pathname = usePathname();
  const { count: savedCount, hydrated: savedHydrated } = useSavedListings();
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const drawerId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const itemActive = (item: NavItem) =>
    checkActive(item.href) ||
    Boolean(item.submenu?.some((sub) => checkActive(sub.href)));

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setSubmenuOpen(null);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeDrawer();
    setDesktopOpen(null);
  }, [pathname, closeDrawer]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

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
    <>
      <header
        className={cx(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "bg-main-bg/85 backdrop-blur-md border-b border-header-stroke"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="page-px flex items-center justify-between gap-4 h-16 lg:h-[4.5rem]">
          <Link
            href="/"
            className="shrink-0 min-h-11 inline-flex items-center"
            onClick={closeDrawer}
            aria-label="2% Company home"
          >
            <Image
              src="/images/2PercentCompany.png"
              height={48}
              width={48}
              alt="2% Company"
              sizes="40px"
              className="size-9 lg:size-10 object-contain"
              priority
            />
          </Link>

          <nav
            ref={desktopNavRef}
            className="hidden xl:flex items-center gap-1"
            aria-label="Primary"
          >
            {NavbarData.map((item) => {
              const active = itemActive(item);
              const hasSub = Boolean(item.submenu?.length);
              const open = desktopOpen === item.label;

              if (hasSub && item.submenu) {
                const menuId = `desktop-menu-${item.label}`;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDesktopOpen(item.label)}
                    onMouseLeave={() => setDesktopOpen(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-haspopup="menu"
                      aria-controls={menuId}
                      onClick={() =>
                        setDesktopOpen(open ? null : item.label)
                      }
                      onFocus={() => setDesktopOpen(item.label)}
                      className={cx(
                        "relative inline-flex items-center gap-1.5 min-h-11 px-3 type-body transition-colors duration-200 rounded-control",
                        active || open
                          ? "text-body"
                          : "text-secondary-text hover:text-body"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cx(
                          "transition-transform duration-200 opacity-70",
                          open && "rotate-180"
                        )}
                        aria-hidden
                      />
                      {(active || open) && (
                        <span
                          className="absolute bottom-1 left-3 right-3 h-px bg-primary"
                          aria-hidden
                        />
                      )}
                    </button>

                    <div
                      id={menuId}
                      role="menu"
                      className={cx(
                        "absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200",
                        open
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="min-w-[17rem] rounded-media border border-header-stroke bg-2nd-bg/95 backdrop-blur-md p-2">
                        <Link
                          href={item.href}
                          role="menuitem"
                          onClick={() => setDesktopOpen(null)}
                          className="group flex items-center justify-between gap-3 rounded-control px-3 py-2.5 type-caption text-secondary-text hover:text-body hover:bg-main-bg transition-colors"
                        >
                          All {item.label}
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                            aria-hidden
                          />
                        </Link>
                        <div className="my-1 border-t border-header-stroke" />
                        {item.submenu.map((sub) => {
                          const subActive = checkActive(sub.href);
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              role="menuitem"
                              onClick={() => setDesktopOpen(null)}
                              className={cx(
                                "block rounded-control px-3 py-2.5 transition-colors",
                                subActive ? "bg-main-bg" : "hover:bg-main-bg"
                              )}
                            >
                              <span
                                className={cx(
                                  "type-body block",
                                  subActive ? "text-primary" : "text-body"
                                )}
                              >
                                {sub.label}
                              </span>
                              {sub.description && (
                                <span className="type-caption text-secondary-text block mt-0.5">
                                  {sub.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "relative inline-flex items-center min-h-11 px-3 type-body transition-colors duration-200",
                    active
                      ? "text-body"
                      : "text-secondary-text hover:text-body"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-1 left-3 right-3 h-px bg-primary"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/saved"
              className={cx(
                "relative inline-flex items-center justify-center min-w-11 min-h-11 rounded-control border border-header-stroke text-body hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg",
                checkActive("/saved") && "border-primary/50 text-primary"
              )}
              aria-label={
                savedHydrated && savedCount > 0
                  ? `Saved listings, ${savedCount}`
                  : "Saved listings"
              }
            >
              <Heart
                size={18}
                className={
                  savedHydrated && savedCount > 0
                    ? "fill-primary text-primary"
                    : ""
                }
                aria-hidden
              />
              {savedHydrated && savedCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-on-primary type-caption font-semibold inline-flex items-center justify-center">
                  {savedCount > 99 ? "99+" : savedCount}
                </span>
              )}
            </Link>
            <Link
              href={ContactBtnData.href}
              className={cx(
                "group hidden sm:inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-control type-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg",
                checkActive(ContactBtnData.href)
                  ? "bg-primary text-on-primary"
                  : "bg-primary text-on-primary hover:brightness-110"
              )}
            >
              {ContactBtnData.label}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="xl:hidden text-body min-w-11 min-h-11 inline-flex items-center justify-center rounded-control outline-none border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls={drawerId}
              onClick={() => (isOpen ? closeDrawer() : setIsOpen(true))}
            >
              {isOpen ? (
                <X size={22} aria-hidden />
              ) : (
                <Menu size={22} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={cx(
          "fixed inset-0 z-[60] bg-overlay transition-opacity duration-300 xl:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
        onClick={closeDrawer}
      />

      {/* Mobile bottom drawer */}
      <div
        id={drawerId}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cx(
          "fixed inset-x-0 bottom-0 z-[70] flex max-h-[min(88dvh,40rem)] flex-col rounded-t-card border-t border-white/10 bg-2nd-bg/70 backdrop-blur-xl shadow-[0_-12px_40px_rgb(0_0_0_/0.45)] transition-transform duration-300 ease-out xl:hidden supports-[backdrop-filter]:bg-2nd-bg/55",
          isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        )}
        inert={!isOpen ? true : undefined}
      >
        <div className="shrink-0 pt-3 pb-2 px-5">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" aria-hidden />
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              onClick={closeDrawer}
              className="shrink-0 min-h-11 inline-flex items-center"
              aria-label="2% Company home"
            >
              <Image
                src="/images/2PercentCompany.png"
                height={40}
                width={40}
                alt="2% Company"
                sizes="36px"
                className="size-9 object-contain"
              />
            </Link>
            <button
              type="button"
              className="text-body min-w-11 min-h-11 inline-flex items-center justify-center rounded-control hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close menu"
              onClick={closeDrawer}
            >
              <X size={22} aria-hidden />
            </button>
          </div>
        </div>

        <nav
          className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-5 py-2"
          aria-label="Primary"
          data-lenis-prevent
        >
          <ul className="flex flex-col gap-0.5 pb-2">
            {NavbarData.map((item) => {
              const active = itemActive(item);
              const hasSub = Boolean(item.submenu?.length);
              const expanded = submenuOpen === item.label;

              if (hasSub && item.submenu) {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setSubmenuOpen(expanded ? null : item.label)
                      }
                      className={cx(
                        "flex w-full items-center justify-between gap-3 min-h-12 px-3 rounded-control type-body font-medium transition-colors",
                        active ? "text-body" : "text-secondary-text hover:text-body"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {active && (
                          <span
                            className="w-1 h-4 rounded-full bg-primary shrink-0"
                            aria-hidden
                          />
                        )}
                        {item.label}
                      </span>
                      <ChevronDown
                        size={18}
                        className={cx(
                          "transition-transform duration-200 shrink-0 opacity-60",
                          expanded && "rotate-180"
                        )}
                        aria-hidden
                      />
                    </button>

                    <div
                      className={cx(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-3 mb-2 flex flex-col gap-0.5 rounded-control border border-white/10 bg-black/30 backdrop-blur-sm p-1.5">
                          <Link
                            href={item.href}
                            onClick={closeDrawer}
                            className="min-h-11 px-3 inline-flex items-center type-body text-secondary-text hover:text-body rounded-control transition-colors"
                          >
                            Overview
                          </Link>
                          {item.submenu.map((sub) => {
                            const subActive = checkActive(sub.href);
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={closeDrawer}
                                className={cx(
                                  "min-h-11 px-3 py-2 flex flex-col justify-center rounded-control transition-colors",
                                  subActive
                                    ? "bg-2nd-bg text-primary"
                                    : "text-body hover:bg-2nd-bg"
                                )}
                              >
                                <span className="type-body">{sub.label}</span>
                                {sub.description && (
                                  <span className="type-caption text-secondary-text mt-0.5">
                                    {sub.description}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeDrawer}
                    className={cx(
                      "flex items-center gap-3 min-h-12 px-3 rounded-control type-body font-medium transition-colors",
                      active
                        ? "text-body"
                        : "text-secondary-text hover:text-body"
                    )}
                  >
                    {active && (
                      <span
                        className="w-1 h-4 rounded-full bg-primary shrink-0"
                        aria-hidden
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-white/10 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-3">
          <Link
            href={ContactBtnData.href}
            onClick={closeDrawer}
            className="group flex w-full items-center justify-center gap-2 min-h-12 rounded-control bg-primary text-on-primary font-semibold type-body hover:brightness-110 transition"
          >
            {ContactBtnData.label}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
          <p className="type-caption text-secondary-text text-center">
            Patna · Buy · Sell · Rent · Invest
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
