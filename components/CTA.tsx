"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { whatsappHref } from "@/lib/contact";

const CTA = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-t border-header-stroke"
    >
      {/* Atmosphere — gold wash + abstract motif */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 80% at 0% 50%, rgba(143, 115, 48, 0.18), transparent 55%),
            radial-gradient(ellipse 50% 60% at 100% 100%, rgba(143, 115, 48, 0.08), transparent 50%),
            url('/images/AbstractDesign2.png')
          `,
          backgroundRepeat: "no-repeat, no-repeat, no-repeat",
          backgroundPosition: "left center, right bottom, left -10% center",
          backgroundSize: "auto, auto, min(520px, 90vw)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-main-bg/80 via-main-bg/55 to-main-bg"
        aria-hidden
      />

      <div className="relative page-px section-y-lg">
        <motion.div
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl">
            <p className="type-label text-primary mb-2 tracking-wide uppercase">
              Let&apos;s talk
            </p>
            <h2 id="cta-heading" className="type-section text-body">
              Ready to find your next property in Patna?
            </h2>
            <p className="text-secondary-text type-body mt-3 prose-measure">
              Tell us what you need — buy, sell, rent, or invest — and our team
              will guide you from first enquiry to closing.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row sm:items-center shrink-0">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full sm:w-auto min-h-12"
            >
              Contact 2% Company
              <ArrowUpRight size={16} aria-hidden />
            </Button>
            <a
              href={whatsappHref(
                "Hi 2% Company, I'd like help with a property enquiry."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-6 py-3 rounded-control border border-header-stroke bg-2nd-bg/80 type-body font-semibold text-body hover:border-primary/45 hover:text-primary transition-colors"
            >
              <FaWhatsapp size={16} aria-hidden />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
