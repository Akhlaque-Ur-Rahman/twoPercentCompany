import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { ListingExpert } from "@/data/PropertyData";
import { listingEnquiryMessage, telHref, whatsappHref } from "@/lib/contact";

type ListingExpertCardProps = {
  expert: ListingExpert;
  listingTitle: string;
  listingUrl?: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

export default function ListingExpertCard({
  expert,
  listingTitle,
  listingUrl,
}: ListingExpertCardProps) {
  const message = listingEnquiryMessage(listingTitle, listingUrl);
  const waHref = whatsappHref(message, expert.phone);
  const callHref = expert.phone ? telHref(expert.phone) : undefined;

  return (
    <aside
      id="expert"
      aria-labelledby="expert-heading"
      className="scroll-mt-28 border border-header-stroke rounded-card bg-2nd-bg/60 p-5 sm:p-6 space-y-4"
    >
      <p className="type-label text-primary">Your advisor</p>
      <div className="flex items-start gap-4">
        <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-control border border-header-stroke">
          <Image
            src={expert.photo}
            alt={expert.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="min-w-0">
          <h2 id="expert-heading" className="type-subhead text-body">
            {expert.name}
          </h2>
          <p className="type-caption text-secondary-text mt-0.5">{expert.role}</p>
          {expert.bio && (
            <p className="type-caption text-secondary-text mt-2 line-clamp-3">
              {expert.bio}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-control bg-primary text-on-primary font-semibold type-caption hover:brightness-110 transition ${focusRing}`}
        >
          <FaWhatsapp size={15} aria-hidden />
          WhatsApp
        </a>
        {callHref && (
          <a
            href={callHref}
            className={`inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-control border border-header-stroke text-secondary-text hover:text-body hover:border-primary/40 transition-colors type-caption font-semibold ${focusRing}`}
          >
            <Phone size={15} aria-hidden />
            Call
          </a>
        )}
      </div>

      <Link
        href={`/team/${expert.slug}`}
        className={`inline-flex type-caption font-semibold text-primary hover:underline ${focusRing} rounded-sm`}
      >
        View full profile
      </Link>
    </aside>
  );
}
