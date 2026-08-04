"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PropertyItem } from "@/data/PropertyData";
import { iconForTagLabel } from "@/lib/tagIcons";
import { formatPrice, formatPriceExact } from "@/lib/formatPrice";
import { telHref } from "@/lib/contact";

type ListingOverviewProps = {
  item: PropertyItem;
  ctaHref: string;
  ctaLabel: string;
  enquireHref: string;
  priceLabel?: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

function findSpec(
  specs: PropertyItem["specifications"],
  ...labels: string[]
): string | undefined {
  if (!specs?.length) return undefined;
  const wanted = labels.map((l) => l.toLowerCase());
  return specs.find((s) => wanted.includes(s.label.toLowerCase()))?.value;
}

const PROCESS = [
  {
    title: "Tell us your timeline",
    body: "Share budget, move-in date, and must-haves — we filter the noise.",
  },
  {
    title: "Book a guided visit",
    body: "We arrange a site visit around your schedule, with clear next steps.",
  },
  {
    title: "Close with transparent fees",
    body: "2% Company keeps commission and paperwork explained upfront.",
  },
] as const;

const ListingOverview: React.FC<ListingOverviewProps> = ({
  item,
  ctaHref,
  ctaLabel,
  enquireHref,
  priceLabel = "Price",
}) => {
  const isPlot = item.type === "plot";
  const status = findSpec(item.specifications, "Status");
  const facing = findSpec(item.specifications, "Facing");
  const furnished = findSpec(item.specifications, "Furnished Status");
  const floor = findSpec(item.specifications, "Floor");
  const area = findSpec(
    item.specifications,
    "Carpet Area",
    "Plot Area",
    "Super Area"
  );

  const decisionPoints = [
    ...item.tags.map((tag) => tag.label),
    status,
    furnished,
    facing ? `${facing} facing` : undefined,
    floor,
    area,
  ].filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i);

  const headline = isPlot
    ? "Ready to claim this plot?"
    : "Ready to make this home yours?";

  const supportLine = isPlot
    ? "Get availability, documentation help, and a clear path to purchase."
    : "Get a visit booked, honest pricing context, and help through paperwork.";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="type-label text-primary font-semibold tracking-[0.14em]">
          Next step
        </p>
        <h2 id="overview-heading" className="type-subhead text-body mt-2 text-balance">
          {headline}
        </h2>
        <p className="type-body text-secondary-text leading-relaxed mt-3 max-w-prose">
          {item.longDescription || item.description}
        </p>

        <p className="mt-5 flex items-start gap-2 type-caption text-secondary-text max-w-prose">
          <MapPin
            size={14}
            className="shrink-0 mt-0.5 text-primary/80"
            aria-hidden
          />
          <span>{item.address}</span>
        </p>
      </div>

      {decisionPoints.length > 0 && (
        <div>
          <h3 className="type-caption font-semibold text-body tracking-wide uppercase">
            At a glance
          </h3>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {decisionPoints.slice(0, 6).map((point, index) => {
              const tag = item.tags.find((t) => t.label === point);
              const Icon = tag
                ? (tag.icon ?? iconForTagLabel(tag.label))
                : Check;
              return (
                <li
                  key={`${point}-${index}`}
                  className="flex items-center gap-2.5 type-body text-secondary-text"
                >
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-control border border-header-stroke text-primary">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-body">{point}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div>
        <h3 className="type-caption font-semibold text-body tracking-wide uppercase">
          How we help you decide
        </h3>
        <ol className="mt-4 space-y-4">
          {PROCESS.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span
                className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-header-stroke type-caption font-semibold text-primary"
                aria-hidden
              >
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="type-body text-body font-medium">{step.title}</p>
                <p className="type-caption text-secondary-text mt-0.5 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-t border-header-stroke pt-6 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="type-caption text-secondary-text">{priceLabel}</p>
            <p
              className="type-price text-body mt-0.5"
              title={formatPriceExact(item.price)}
            >
              {formatPrice(item.price)}
            </p>
          </div>
          <p className="type-caption text-secondary-text max-w-[22ch] sm:text-right">
            {supportLine}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={ctaHref}
            className={`inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-control hover:brightness-110 transition w-full sm:w-auto ${focusRing}`}
          >
            {ctaLabel}
            <ArrowRight size={16} aria-hidden />
          </Link>
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control border border-header-stroke text-body hover:border-primary/40 transition-colors w-full sm:w-auto ${focusRing}`}
          >
            <FaWhatsapp size={16} aria-hidden />
            WhatsApp now
          </a>
          <a
            href={telHref()}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control border border-header-stroke text-secondary-text hover:text-body hover:border-primary/40 transition-colors w-full sm:w-auto ${focusRing}`}
          >
            <Phone size={16} aria-hidden />
            Call
          </a>
        </div>

        <p className="type-caption text-secondary-text">
          Prefer talking first? Message us — we reply on WhatsApp during business
          hours.
        </p>
      </div>
    </div>
  );
};

export default ListingOverview;
