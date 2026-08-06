"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { Input, Textarea } from "@/components/ui/Input";
import FilterSelect from "@/components/ui/FilterSelect";
import Button from "@/components/ui/Button";
import { submitLead } from "@/lib/submitLead";
import { toastCopy } from "@/components/ui/AppToast";
import { contactInfo } from "@/data/FooterData";
import { telHref, whatsappHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INQUIRY_OPTIONS = [
  { value: "purchase", label: "Purchase" },
  { value: "rent", label: "Rent" },
  { value: "sell", label: "Sell" },
  { value: "valuation", label: "Valuation" },
];

const ROLE_OPTIONS = [
  { value: "buyer", label: "I'm a buyer / tenant" },
  { value: "owner", label: "I'm a property owner" },
  { value: "investor", label: "I'm an investor" },
];

const fadeUp = (reduceMotion: boolean, delay = 0) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.5, delay },
      };

export default function HomeInquirySection() {
  const reduceMotion = usePrefersReducedMotion();
  const [inquiryType, setInquiryType] = useState("purchase");
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !phone.trim() && !email.trim()) {
      toast.error(toastCopy.requiredSubmit);
      return;
    }
    setSubmitting(true);
    const intentLabel =
      INQUIRY_OPTIONS.find((o) => o.value === inquiryType)?.label ?? inquiryType;
    const roleLabel =
      ROLE_OPTIONS.find((o) => o.value === role)?.label ?? role;
    const result = await submitLead({
      type: "home_inquiry",
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      message:
        message.trim() ||
        `Homepage inquiry — ${intentLabel}. ${roleLabel}.`,
      inquiryType,
      role,
      source: "homepage",
    });
    setSubmitting(false);
    if (result.ok) {
      toast.success(toastCopy.submitSuccess);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } else {
      toast.error(result.error || toastCopy.submitError);
    }
  };

  return (
    <section
      aria-labelledby="home-inquiry-heading"
      className="relative overflow-hidden border-b border-header-stroke"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 70% at 0% 40%, color-mix(in srgb, var(--color-primary) 16%, transparent), transparent 58%),
            radial-gradient(ellipse 40% 50% at 100% 80%, color-mix(in srgb, var(--color-primary) 7%, transparent), transparent 52%)
          `,
        }}
      />

      <div className="relative page-px section-y-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-phi-4 lg:gap-phi-5 lg:items-center">
          <motion.div
            className="lg:col-span-5 flex flex-col gap-phi-4"
            {...fadeUp(reduceMotion)}
          >
            <div>
              <p className="type-label text-primary mb-2 tracking-wide uppercase">
                Talk to us
              </p>
              <h2
                id="home-inquiry-heading"
                className="type-section text-body text-balance"
              >
                Real estate inquiry
              </h2>
              <p className="text-secondary-text type-body mt-3 max-w-md">
                Tell us what you need — purchase, rent, sell, or a quick
                valuation. We&apos;ll follow up from Patna.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={telHref()}
                className="group flex items-center gap-4 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg rounded-sm"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-header-stroke bg-2nd-bg text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                  <Phone size={18} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="type-label text-primary block mb-0.5">
                    Call
                  </span>
                  <span className="type-body text-body group-hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </span>
                </span>
              </a>

              <a
                href={whatsappHref(
                  "Hi 2% Company, I'd like help with a property enquiry."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg rounded-sm"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-header-stroke bg-2nd-bg text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                  <FaWhatsapp size={18} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="type-label text-primary block mb-0.5">
                    WhatsApp
                  </span>
                  <span className="type-body text-body group-hover:text-primary transition-colors">
                    Chat with the team
                  </span>
                </span>
              </a>
            </div>

            <p className="flex items-start gap-2 type-caption text-secondary-text max-w-sm pt-1 border-t border-header-stroke">
              <MapPin
                size={14}
                className="text-primary shrink-0 mt-0.5"
                aria-hidden
              />
              Serving buyers, sellers, tenants, and investors across Patna.
            </p>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="lg:col-span-7 rounded-card border border-header-stroke bg-2nd-bg/90 p-5 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            noValidate
            {...fadeUp(reduceMotion, 0.08)}
          >
            <div className="flex flex-col gap-1.5">
              <span className="type-label text-secondary-text">
                Inquiry type
              </span>
              <FilterSelect
                label="Inquiry type"
                value={inquiryType}
                onChange={setInquiryType}
                options={INQUIRY_OPTIONS}
                buttonClassName="bg-main-bg border"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="type-label text-secondary-text">I am</span>
              <FilterSelect
                label="I am"
                value={role}
                onChange={setRole}
                options={ROLE_OPTIONS}
                buttonClassName="bg-main-bg border"
              />
            </div>
            <Input
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Your name"
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="WhatsApp number"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="Optional"
              wrapperClassName="sm:col-span-2"
            />
            <Textarea
              label="Message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Locality, budget, or timing — whatever helps."
              rows={3}
              wrapperClassName="sm:col-span-2"
            />
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 sm:items-center pt-1">
              <Button
                type="submit"
                disabled={submitting}
                size="md"
                className="min-h-12 w-full sm:w-auto"
              >
                {submitting ? "Sending…" : "Submit inquiry"}
                {!submitting && (
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                )}
              </Button>
              <p className="type-caption text-secondary-text sm:pl-1">
                Usually reply within a day.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
