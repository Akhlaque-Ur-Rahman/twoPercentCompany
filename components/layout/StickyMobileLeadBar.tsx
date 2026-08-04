"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { contactInfo } from "@/data/FooterData";
import { telHref, whatsappHref } from "@/lib/contact";

const HIDDEN_PREFIXES = ["/contact", "/admin"];

const StickyMobileLeadBar = () => {
  const pathname = usePathname() ?? "";
  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (hidden) return null;

  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      <div className="pointer-events-auto border-t border-header-stroke bg-2nd-bg/95 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.28)]">
        <div className="page-px py-2.5 grid grid-cols-2 gap-2 sm:gap-3">
          <a
            href={telHref()}
            className="inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-12 rounded-control border border-header-stroke type-body font-semibold text-body hover:border-primary/40 transition-colors"
          >
            <Phone size={16} aria-hidden />
            Call
          </a>
          <a
            href={whatsappHref(
              "Hi 2% Company, I'd like help with a property enquiry."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-12 rounded-control bg-primary text-on-primary type-body font-semibold hover:brightness-110 transition"
            aria-label={`WhatsApp ${contactInfo.phone}`}
          >
            <FaWhatsapp size={16} aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileLeadBar;
