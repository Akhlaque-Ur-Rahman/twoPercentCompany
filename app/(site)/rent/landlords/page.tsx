"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  KeyRound,
  BadgeCheck,
  Megaphone,
  Handshake,
  ArrowDown,
} from "lucide-react";
import PropertyForm from "@/components/PropertyForm";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const steps = [
  {
    step: "01",
    title: "Share property details",
    description:
      "Tell us about the home — layout, rent, photos, and key features.",
    Icon: FileText,
  },
  {
    step: "02",
    title: "We verify & list",
    description:
      "We review the listing and put it in front of serious tenant leads.",
    Icon: Megaphone,
  },
  {
    step: "03",
    title: "Connect with tenants",
    description:
      "Handle enquiries with clear follow-up — or let us help coordinate.",
    Icon: KeyRound,
  },
];

const benefits = [
  {
    title: "Verified tenant reach",
    description: "Your rental reaches people actively looking in Patna.",
    Icon: Users,
  },
  {
    title: "Clear, guided listing",
    description:
      "Structured details and photos so tenants know what they are getting.",
    Icon: BadgeCheck,
  },
  {
    title: "Fair, local support",
    description:
      "Transparent process and 2% Company support — no guesswork.",
    Icon: Handshake,
  },
];

const LandlordPage = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="flex flex-col bg-main-bg text-body overflow-x-clip">
      {/* Hero — full-bleed rental visual + brand-first hierarchy */}
      <div className="relative min-h-[calc(100svh-4rem)] sm:min-h-[78svh] lg:min-h-[85svh] flex flex-col justify-end overflow-hidden border-b border-header-stroke">
        <Image
          src="/images/apartment2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_40%] sm:object-[center_35%] lg:object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.82) 38%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0.55) 100%),
              radial-gradient(ellipse 70% 50% at 50% 100%, rgba(143, 115, 48, 0.2), transparent 55%)
            `,
          }}
        />

        <div className="relative page-px pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-20 w-full max-w-7xl mx-auto">
          <motion.div
            className="max-w-2xl w-full"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="type-label text-primary mb-2 sm:mb-3 tracking-wide uppercase">
              2% Company
            </p>
            <h1 className="type-display text-body mb-3 sm:mb-4 text-balance">
              List your rental with clarity
            </h1>
            <p className="text-secondary-text type-body mb-6 sm:mb-8 max-w-xl">
              Reach verified tenants with professional support — from details to
              enquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full">
              <Button
                href="#list-rental"
                size="lg"
                className="w-full sm:w-auto min-h-12 touch-manipulation"
              >
                List my rental
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Button>
              <p className="type-caption text-secondary-text text-center sm:text-left sm:pl-1">
                Takes a few minutes · No obligation
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Process */}
      <div className="section-y page-px border-b border-header-stroke">
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <motion.div
            className="mb-8 sm:mb-10 max-w-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
          >
            <p className="type-label text-primary mb-2">How it works</p>
            <h2 className="type-section text-body">Three clear steps</h2>
          </motion.div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-header-stroke">
            {steps.map(({ step, title, description, Icon }, index) => (
              <motion.li
                key={step}
                className="md:px-8 first:md:pl-0 last:md:pr-0 flex flex-col gap-2.5 sm:gap-3 border-b border-header-stroke py-6 first:pt-0 last:border-b-0 last:pb-0 md:border-b-0 md:py-0"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="type-stat text-primary/80 tabular-nums leading-none">
                    {step}
                  </span>
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-primary shrink-0"
                    aria-hidden
                  />
                </div>
                <h3 className="type-card-title text-body">{title}</h3>
                <p className="type-body text-secondary-text">{description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* Listing form — form first on mobile; benefits below */}
      <div
        id="list-rental"
        className="section-y page-px scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-14 xl:gap-20 max-w-7xl mx-auto w-full min-w-0 items-start">
          <motion.aside
            className="lg:w-[42%] w-full min-w-0 lg:sticky lg:top-28 order-2 lg:order-1 flex flex-col gap-6 sm:gap-8"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <p className="type-label text-primary mb-2">Why list with us</p>
              <h2 className="type-section text-body mb-3 text-balance">
                Built for serious landlords
              </h2>
              <p className="text-secondary-text type-body max-w-xl">
                Reach verified tenants, present a clear listing, and get local
                support through every enquiry.
              </p>
            </div>

            <ul className="flex flex-col gap-5 sm:gap-6">
              {benefits.map(({ title, description, Icon }) => (
                <li key={title} className="flex gap-3 sm:gap-4 min-w-0">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-header-stroke text-primary bg-2nd-bg">
                    <Icon size={18} strokeWidth={1.5} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="type-body font-semibold text-body mb-1">
                      {title}
                    </h3>
                    <p className="type-body text-secondary-text">{description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative hidden lg:block aspect-[4/3] w-full overflow-hidden rounded-media border border-header-stroke">
              <Image
                src="/images/apartment1.png"
                alt="Rental-ready apartment interior"
                fill
                sizes="(max-width: 1024px) 0px, 42vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-main-bg/70 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </motion.aside>

          <motion.div
            className="lg:w-[58%] w-full min-w-0 order-1 lg:order-2"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : 0.08,
            }}
          >
            <div className="mb-4 sm:mb-5 lg:mb-6">
              <p className="type-label text-primary mb-1">Start here</p>
              <h2 className="type-subhead text-body">Rental listing form</h2>
            </div>
            <PropertyForm type="rent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandlordPage;
