"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { listingEnquiryMessage, whatsappHref } from "@/lib/contact";
import { submitLead } from "@/lib/submitLead";
import { fieldControlClass, textareaControlClass } from "@/components/ui/Input";

type ListingEnquireFormProps = {
  title: string;
  listingUrl?: string;
  expertPhone?: string;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

const inputClass = `${fieldControlClass} placeholder:text-secondary-text/70 touch-manipulation`;

const ROLES = ["Buyer", "Tenant", "Investor", "Other"] as const;

export default function ListingEnquireForm({
  title,
  listingUrl,
  expertPhone,
}: ListingEnquireFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("Buyer");
  const [message, setMessage] = useState(
    `Hello, I am interested in "${title}".`
  );
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const waMessage = [
    listingEnquiryMessage(title, listingUrl),
    name ? `Name: ${name}` : "",
    phone ? `Phone: ${phone}` : "",
    email ? `Email: ${email}` : "",
    `I'm a: ${role}`,
    message && message !== `Hello, I am interested in "${title}".`
      ? message
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  const waHref = whatsappHref(waMessage, expertPhone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !phone.trim() && !email.trim()) {
      setError("Please share your name, phone, or email.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setError("");
    const result = await submitLead({
      type: "listing_enquiry",
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      message: [message.trim(), `I'm a: ${role}`, listingUrl]
        .filter(Boolean)
        .join("\n"),
      title,
      listingUrl,
      role,
    });
    if (!result.ok) {
      setError(result.error || "Could not save enquiry");
      setStatus("error");
    } else {
      setStatus("done");
    }
    window.open(waHref, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="enquire"
      aria-labelledby="enquire-heading"
      className="scroll-mt-28 border border-header-stroke rounded-card bg-2nd-bg/60 p-5 sm:p-6"
    >
      <h2 id="enquire-heading" className="type-subhead text-body">
        Enquire about this property
      </h2>
      <p className="type-caption text-secondary-text mt-1 mb-5">
        Leave your details — we also open WhatsApp so you can continue the chat.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block space-y-1.5">
            <span className="type-caption text-secondary-text">Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="type-caption text-secondary-text">Phone</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="WhatsApp number"
            />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className="type-caption text-secondary-text">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="optional@"
          />
        </label>

        <fieldset>
          <legend className="type-caption text-secondary-text mb-2">
            I&apos;m a
          </legend>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3.5 py-2 rounded-control type-caption font-semibold border transition-colors ${
                    active
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-main-bg text-secondary-text border-header-stroke hover:border-primary/40"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="block space-y-1.5">
          <span className="type-caption text-secondary-text">Message</span>
          <textarea
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${textareaControlClass} placeholder:text-secondary-text/70 touch-manipulation`}
          />
        </label>

        {status === "error" && error && (
          <p className="type-caption text-error" role="alert">
            {error}
          </p>
        )}
        {status === "done" && (
          <p className="type-caption text-primary" role="status">
            Enquiry saved — continuing on WhatsApp.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            type="submit"
            disabled={status === "saving"}
            className={`inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-control bg-primary text-on-primary font-semibold type-body hover:brightness-110 transition disabled:opacity-60 ${focusRing}`}
          >
            <FaWhatsapp size={16} aria-hidden />
            {status === "saving" ? "Sending…" : "Send & open WhatsApp"}
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-control border border-header-stroke text-secondary-text hover:text-body hover:border-primary/40 transition-colors type-caption font-semibold ${focusRing}`}
          >
            WhatsApp only
          </a>
        </div>
      </form>
    </section>
  );
}
