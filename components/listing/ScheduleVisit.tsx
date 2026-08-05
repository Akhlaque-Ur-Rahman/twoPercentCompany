"use client";

import React, { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappHref } from "@/lib/contact";
import { submitLead } from "@/lib/submitLead";

type ScheduleVisitProps = {
  title: string;
  listingUrl?: string;
};

function nextDays(count: number): { label: string; iso: string }[] {
  const out: { label: string; iso: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    });
  }
  return out;
}

const TIMES = ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"];

export default function ScheduleVisit({ title, listingUrl }: ScheduleVisitProps) {
  const days = useMemo(() => nextDays(7), []);
  const [day, setDay] = useState(days[0]?.iso ?? "");
  const [time, setTime] = useState(TIMES[0]);
  const [tourType, setTourType] = useState<"In Person" | "Video Call">(
    "In Person"
  );

  const dayLabel = days.find((d) => d.iso === day)?.label ?? day;

  const message = [
    `Hi 2% Company, I'd like to schedule a visit for "${title}".`,
    `Preferred: ${dayLabel} at ${time} (${tourType}).`,
    listingUrl ? listingUrl : "",
  ]
    .filter(Boolean)
    .join("\n");

  const href = whatsappHref(message);

  const handleRequest = async () => {
    const result = await submitLead({
      type: "tour",
      name: "Visit request",
      message,
      title,
      listingUrl,
      day: dayLabel,
      time,
      tourType,
    });
    // Always open WhatsApp as primary CTA; lead save is best-effort
    if (!result.ok) {
      console.warn("[ScheduleVisit] lead save failed:", result.error);
    }
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      aria-labelledby="schedule-visit-heading"
      className="border border-header-stroke rounded-card bg-2nd-bg/60 p-5 sm:p-6 space-y-5"
    >
      <div>
        <h2 id="schedule-visit-heading" className="type-subhead text-body">
          Schedule a visit
        </h2>
        <p className="type-caption text-secondary-text mt-1">
          Pick a day and time — we&apos;ll confirm on WhatsApp.
        </p>
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar"
        role="group"
        aria-label="Preferred day"
      >
        {days.map((d) => {
          const active = d.iso === day;
          return (
            <button
              key={d.iso}
              type="button"
              onClick={() => setDay(d.iso)}
              className={`shrink-0 px-3.5 py-2.5 rounded-control type-caption font-semibold border transition-colors ${
                active
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-main-bg text-secondary-text border-header-stroke hover:border-primary/40"
              }`}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Preferred time">
        {TIMES.map((t) => {
          const active = t === time;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className={`px-3.5 py-2 rounded-control type-caption font-semibold border transition-colors ${
                active
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-main-bg text-secondary-text border-header-stroke hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2" role="group" aria-label="Tour type">
        {(["In Person", "Video Call"] as const).map((t) => {
          const active = tourType === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTourType(t)}
              className={`px-3.5 py-2 rounded-control type-caption font-semibold border transition-colors ${
                active
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-main-bg text-secondary-text border-header-stroke hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleRequest}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-control bg-primary text-on-primary font-semibold type-body hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
      >
        <FaWhatsapp size={16} aria-hidden />
        Request visit on WhatsApp
      </button>
    </section>
  );
}
