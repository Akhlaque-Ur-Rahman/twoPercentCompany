"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { contactInfo } from "@/data/FooterData";
import {
  mailtoHref,
  telHref,
  whatsappHref,
} from "@/lib/contact";
import { submitLead } from "@/lib/submitLead";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { toast } from "react-toastify";
import AppToast, { toastCopy } from "@/components/ui/AppToast";

type EnquiryType = "Property" | "Plot";

type FormData = {
  name: string;
  email: string;
  phone: string;
  type: EnquiryType | "";
  purpose: string;
  budget: string;
  location: string;
  notes: string;
  listingSlug: string;
};

const PROPERTY_PURPOSES = ["Buy", "Sell", "Rent"] as const;
const PLOT_PURPOSES = ["Invest", "Develop", "Resell"] as const;
const BUDGET_SUGGESTIONS = ["Under ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹2Cr", "₹2Cr+"] as const;

const channels = [
  {
    label: "Call",
    value: contactInfo.phone,
    href: telHref(),
    Icon: Phone,
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: whatsappHref(
      "Hi 2% Company, I'd like help with a property enquiry."
    ),
    Icon: FaWhatsapp,
    external: true,
  },
  {
    label: "Email",
    value: contactInfo.email,
    href: mailtoHref(),
    Icon: Mail,
    external: false,
  },
] as const;

function chipClass(active: boolean, fullWidth = false) {
  return [
    "min-h-11 px-4 rounded-control border type-body font-medium transition-colors touch-manipulation",
    fullWidth ? "w-full justify-center inline-flex items-center" : "",
    active
      ? "border-primary bg-primary/15 text-primary"
      : "border-header-stroke bg-main-bg text-secondary-text hover:border-primary/40 hover:text-body",
  ].join(" ");
}

function buildWhatsAppMessage(data: FormData) {
  const lines = [
    "Hi 2% Company, I'd like to enquire.",
    "",
    `Name: ${data.name.trim()}`,
    `Phone: ${data.phone.trim()}`,
  ];
  if (data.email.trim()) lines.push(`Email: ${data.email.trim()}`);
  lines.push(
    `Type: ${data.type}`,
    `Purpose: ${data.purpose}`,
    `Budget: ${data.budget.trim()}`,
    `Location: ${data.location.trim()}`
  );
  if (data.listingSlug.trim()) {
    lines.push(`Listing: ${data.listingSlug.trim()}`);
  }
  if (data.notes.trim()) {
    lines.push(`Notes: ${data.notes.trim()}`);
  }
  return lines.join("\n");
}

function formProgress(values: FormData) {
  const checks = [
    Boolean(values.type),
    Boolean(values.purpose),
    Boolean(values.budget.trim()),
    Boolean(values.location.trim()),
    Boolean(values.name.trim().length >= 2),
    Boolean(values.phone.replace(/\D/g, "").length >= 8),
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

const fadeUp = (reduceMotion: boolean, delay = 0) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.45, delay },
      };

const ContactPage: React.FC = () => {
  const reduceMotion = usePrefersReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [listingSlug, setListingSlug] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsAppHref, setWhatsAppHref] = useState(
    whatsappHref("Hi 2% Company, I'd like help with a property enquiry.")
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      type: "",
      purpose: "",
      budget: "",
      location: "",
      notes: "",
      listingSlug: "",
    },
  });

  const values = watch();
  const selectedType = values.type;
  const selectedPurpose = values.purpose;
  const selectedBudget = values.budget;
  const progress = formProgress(values);

  const purposes =
    selectedType === "Property"
      ? PROPERTY_PURPOSES
      : selectedType === "Plot"
        ? PLOT_PURPOSES
        : [];

  const { ref: nameRegisterRef, ...nameRegister } = register("name", {
    required: true,
    minLength: 2,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propertySlug = params.get("property")?.trim();
    const plotSlug = params.get("plot")?.trim();
    const slug = propertySlug || plotSlug;
    if (!slug) return;

    setListingSlug(slug);
    setValue("listingSlug", slug);
    if (plotSlug) {
      setValue("type", "Plot", { shouldValidate: true });
      setValue("purpose", "Invest", { shouldValidate: true });
    } else {
      setValue("type", "Property", { shouldValidate: true });
      setValue("purpose", "Buy", { shouldValidate: true });
    }
  }, [setValue]);

  const onInvalid = () => {
    const target =
      (formRef.current?.querySelector(
        "input[aria-invalid='true'], textarea[aria-invalid='true']"
      ) as HTMLElement | null) ?? formRef.current;
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (target instanceof HTMLElement) {
      target.focus?.({ preventScroll: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    const result = await submitLead({
      type: data.listingSlug ? "listing_enquiry" : "contact",
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.notes,
      enquiryType: data.type,
      purpose: data.purpose,
      budget: data.budget,
      location: data.location,
      listingSlug: data.listingSlug,
    });

    if (!result.ok) {
      toast.error(result.error || toastCopy.submitError);
      return;
    }

    const href = whatsappHref(buildWhatsAppMessage(data));
    setWhatsAppHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
    toast.success(toastCopy.submitSuccess);
    // Full reset — keep listing slug only if this was a listing enquiry
    reset({
      name: "",
      email: "",
      phone: "",
      type: "",
      purpose: "",
      budget: "",
      location: "",
      notes: "",
      listingSlug: data.listingSlug.trim(),
    });
  };

  const startAnother = () => {
    setIsSubmitted(false);
    reset({
      name: "",
      email: "",
      phone: "",
      type: "",
      purpose: "",
      budget: "",
      location: "",
      notes: "",
      listingSlug: listingSlug ?? "",
    });
    // Re-apply listing defaults if user came from a listing page
    if (listingSlug) {
      const params = new URLSearchParams(window.location.search);
      if (params.get("plot")?.trim()) {
        setValue("type", "Plot", { shouldValidate: false });
        setValue("purpose", "Invest", { shouldValidate: false });
      } else if (params.get("property")?.trim()) {
        setValue("type", "Property", { shouldValidate: false });
        setValue("purpose", "Buy", { shouldValidate: false });
      }
    }
    requestAnimationFrame(() => {
      nameInputRef.current?.focus({ preventScroll: true });
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="flex flex-col bg-main-bg text-body overflow-x-clip">
      <AppToast />
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-4rem)] sm:min-h-[68svh] lg:min-h-[72svh] flex flex-col justify-end overflow-hidden border-b border-header-stroke">
        <Image
          src="/images/luxury-house.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_42%] sm:object-[center_38%] lg:object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/[0.96] via-black/80 to-black/55"
          aria-hidden
        />
        <div className="absolute inset-0 glow-primary-bottom" aria-hidden />

        <div className="relative page-px page-hero-y w-full max-w-7xl mx-auto">
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
              Contact us
            </h1>
            <p className="text-secondary-text type-body mb-6 sm:mb-8 max-w-xl">
              Tell us what you need in Patna — buy, sell, rent, or invest — and
              we&apos;ll guide you from first enquiry to closing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full">
              <Button
                href="#enquiry"
                size="lg"
                className="w-full sm:w-auto min-h-12 touch-manipulation"
              >
                Send enquiry
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Button>
              <a
                href={whatsappHref(
                  "Hi 2% Company, I'd like help with a property enquiry."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-8 py-4 rounded-control border border-header-stroke bg-2nd-bg/70 backdrop-blur-sm type-body font-semibold text-body hover:border-primary/45 hover:text-primary transition-colors touch-manipulation"
              >
                <FaWhatsapp size={16} aria-hidden />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direct channels */}
      <section
        aria-label="Direct contact"
        className="page-px section-y border-b border-header-stroke"
      >
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <motion.div className="mb-8 sm:mb-10 max-w-xl" {...fadeUp(reduceMotion)}>
            <p className="type-label text-primary mb-2 tracking-wide uppercase">
              Reach us
            </p>
            <h2 className="type-section text-body">Prefer a direct line?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-header-stroke">
            {channels.map(({ label, value, href, Icon, external }, index) => (
              <motion.a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-start gap-4 md:px-8 first:md:pl-0 last:md:pr-0 border-b border-header-stroke py-6 first:pt-0 last:border-b-0 last:pb-0 md:border-b-0 md:py-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg rounded-sm"
                {...fadeUp(reduceMotion, index * 0.06)}
              >
                <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-header-stroke text-primary bg-2nd-bg group-hover:border-primary/40 transition-colors">
                  <Icon size={18} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="type-label text-primary block mb-1">
                    {label}
                  </span>
                  <span className="type-body text-body group-hover:text-primary transition-colors break-all">
                    {value}
                  </span>
                </span>
              </motion.a>
            ))}
          </div>

          <p className="mt-8 sm:mt-10 flex items-start gap-2 type-caption text-secondary-text max-w-xl">
            <MapPin size={14} className="text-primary shrink-0 mt-0.5" aria-hidden />
            Serving buyers, sellers, tenants, and investors across Patna.
          </p>
        </div>
      </section>

      {/* Enquiry form — wide multi-column, less vertical stack */}
      <section
        id="enquiry"
        className="relative page-px section-y scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage: `radial-gradient(
              ellipse 45% 55% at 0% 20%,
              color-mix(in srgb, var(--color-primary) 10%, transparent),
              transparent 55%
            )`,
          }}
        />

        <div className="relative max-w-7xl mx-auto w-full min-w-0">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8 max-w-none"
            {...fadeUp(reduceMotion)}
          >
            <div className="max-w-xl">
              <p className="type-label text-primary mb-2 tracking-wide uppercase">
                Enquiry
              </p>
              <h2 className="type-section text-body text-balance">
                Share a few details
              </h2>
              <p className="text-secondary-text type-body mt-2">
                We open WhatsApp with your enquiry prefilled — send in one tap.
              </p>
            </div>
            {!isSubmitted && (
              <p className="type-caption font-medium text-secondary-text tabular-nums shrink-0 sm:pb-1">
                {progress}% complete
              </p>
            )}
          </motion.div>

          <motion.div {...fadeUp(reduceMotion, 0.06)}>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-card border border-header-stroke bg-2nd-bg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2
                    size={28}
                    strokeWidth={1.5}
                    className="text-primary shrink-0"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="type-subhead text-body">Enquiry ready</h3>
                    <p className="type-body text-secondary-text mt-1 max-w-xl">
                      WhatsApp should have opened with your message. If the
                      popup was blocked, open it below.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                    <Button
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto min-h-12"
                    >
                      <FaWhatsapp size={16} aria-hidden />
                      Open WhatsApp
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full sm:w-auto min-h-12"
                      onClick={startAnother}
                    >
                      Send another
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit(onSubmit, onInvalid)}
                  className="rounded-card border border-header-stroke bg-2nd-bg p-4 sm:p-6 lg:p-7 min-w-0"
                  noValidate
                >
                  <input type="hidden" {...register("listingSlug")} />
                  <input
                    type="hidden"
                    {...register("type", { required: "Please select a type" })}
                  />
                  <input
                    type="hidden"
                    {...register("purpose", {
                      required: "Please select a purpose",
                    })}
                  />

                  <div
                    className="w-full bg-header-stroke h-1 rounded-control mb-5 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Form completion"
                  >
                    <div
                      className="bg-primary h-1 rounded-control transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {listingSlug && (
                    <p className="type-caption text-body rounded-control border border-primary/35 bg-primary/10 px-4 py-2.5 mb-5">
                      Enquiring about listing{" "}
                      <span className="font-semibold text-primary">
                        {listingSlug}
                      </span>
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-5">
                    {/* Type */}
                    <fieldset className="xl:col-span-4 flex flex-col gap-2 min-w-0">
                      <legend className="type-label text-secondary-text mb-1">
                        Type *
                      </legend>
                      <div className="grid grid-cols-2 gap-2">
                        {(["Property", "Plot"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={chipClass(selectedType === type, true)}
                            aria-pressed={selectedType === type}
                            onClick={() => {
                              setValue("type", type, { shouldValidate: true });
                              setValue("purpose", "", {
                                shouldValidate: false,
                              });
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {errors.type && (
                        <p className="type-caption text-error">
                          {errors.type.message || "Please select a type"}
                        </p>
                      )}
                    </fieldset>

                    {/* Purpose */}
                    <fieldset className="xl:col-span-8 flex flex-col gap-2 min-w-0">
                      <legend className="type-label text-secondary-text mb-1">
                        Purpose *
                      </legend>
                      <div className="grid grid-cols-3 gap-2">
                        {(selectedType ? purposes : PROPERTY_PURPOSES).map(
                          (purpose) => (
                            <button
                              key={purpose}
                              type="button"
                              disabled={!selectedType}
                              className={`${chipClass(
                                selectedPurpose === purpose,
                                true
                              )} disabled:opacity-40 disabled:pointer-events-none`}
                              aria-pressed={selectedPurpose === purpose}
                              onClick={() =>
                                setValue("purpose", purpose, {
                                  shouldValidate: true,
                                })
                              }
                            >
                              {purpose}
                            </button>
                          )
                        )}
                      </div>
                      {errors.purpose && (
                        <p className="type-caption text-error">
                          {errors.purpose.message || "Please select a purpose"}
                        </p>
                      )}
                    </fieldset>

                    {/* Budget */}
                    <div className="xl:col-span-6 flex flex-col gap-2 min-w-0">
                      <Input
                        label="Budget *"
                        placeholder="e.g. ₹50L – ₹1Cr"
                        error={
                          errors.budget ? "Budget is required" : undefined
                        }
                        {...register("budget", { required: true })}
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {BUDGET_SUGGESTIONS.map((hint) => (
                          <button
                            key={hint}
                            type="button"
                            className={`${chipClass(selectedBudget === hint)} !min-h-9 px-3 type-caption`}
                            aria-pressed={selectedBudget === hint}
                            onClick={() =>
                              setValue("budget", hint, {
                                shouldValidate: true,
                              })
                            }
                          >
                            {hint}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="xl:col-span-6 min-w-0">
                      <Input
                        label="Preferred location *"
                        placeholder="e.g. Bailey Road, Patna"
                        error={
                          errors.location ? "Location is required" : undefined
                        }
                        {...register("location", { required: true })}
                      />
                    </div>

                    {/* Contact row */}
                    <div className="xl:col-span-4 min-w-0">
                      <Input
                        label="Name *"
                        autoComplete="name"
                        placeholder="Your full name"
                        error={errors.name ? "Name is required" : undefined}
                        {...nameRegister}
                        ref={(el) => {
                          nameRegisterRef(el);
                          nameInputRef.current = el;
                        }}
                      />
                    </div>
                    <div className="xl:col-span-4 min-w-0">
                      <Input
                        label="Phone *"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+91 …"
                        error={
                          errors.phone
                            ? "Enter a valid phone number"
                            : undefined
                        }
                        {...register("phone", {
                          required: true,
                          pattern: /^[\d\s+\-()]{8,}$/,
                        })}
                      />
                    </div>
                    <div className="xl:col-span-4 min-w-0">
                      <Input
                        label="Email (optional)"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        error={
                          errors.email
                            ? "Enter a valid email address"
                            : undefined
                        }
                        {...register("email", {
                          validate: (v) =>
                            !v.trim() ||
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
                            "Enter a valid email address",
                        })}
                      />
                    </div>

                    {/* Notes + submit */}
                    <div className="xl:col-span-8 min-w-0">
                      <Textarea
                        label="Anything else? (optional)"
                        placeholder="Timeline, must-haves, or questions…"
                        rows={2}
                        className="min-h-[72px]"
                        {...register("notes")}
                      />
                    </div>
                    <div className="xl:col-span-4 flex flex-col justify-end gap-2 min-w-0">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full min-h-12"
                      >
                        <FaWhatsapp size={16} aria-hidden />
                        Send via WhatsApp
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </Button>
                      <p className="type-caption text-secondary-text text-center xl:text-left">
                        Prefills WhatsApp — one tap to send.
                      </p>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
