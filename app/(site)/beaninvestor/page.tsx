"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import AppToast, { toastCopy } from "@/components/ui/AppToast";
import { submitLead } from "@/lib/submitLead";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  TrendingUp,
  Building2,
  Wallet,
  Handshake,
  FileText,
  Search,
  BadgeCheck,
  ArrowDown,
  CheckCircle,
} from "lucide-react";

const HERO_POSTER = "/images/luxury-house.png";
const HERO_VIDEO = "/videos/beaninvestor.webm";

const steps = [
  {
    step: "01",
    title: "Share your profile",
    description:
      "Tell us who you are, your investment range, and what you’re looking for.",
    Icon: FileText,
  },
  {
    step: "02",
    title: "We match opportunities",
    description:
      "We shortlist verified plots and properties that fit your goals and budget.",
    Icon: Search,
  },
  {
    step: "03",
    title: "Partner with clarity",
    description:
      "Review details, ask questions, and move forward with transparent next steps.",
    Icon: BadgeCheck,
  },
] as const;

const benefits = [
  {
    title: "High return potential",
    description:
      "Focus on projects with strong appreciation potential and clearer ROI paths.",
    Icon: TrendingUp,
  },
  {
    title: "Diverse opportunities",
    description:
      "Commercial, residential, and growth-oriented ventures aligned to your goals.",
    Icon: Building2,
  },
  {
    title: "Secure & transparent",
    description:
      "Verified documentation and regular updates — no opaque processes.",
    Icon: Wallet,
  },
  {
    title: "Long-term partnerships",
    description:
      "Work with a local team built for sustainable, mutually beneficial growth.",
    Icon: Handshake,
  },
] as const;

const STEP_TITLES = [
  "Personal information",
  "Investment details",
  "Location & message",
] as const;

const BeAnInvestor: React.FC = () => {
  const reduceMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    investmentRange: "",
    state: "",
    city: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lazy-load + play video only when hero is in view; skip when reduced motion
  useEffect(() => {
    if (reduceMotion) return;
    const root = heroRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = HERO_VIDEO;
          }
          void video.play().catch(() => {
            /* autoplay may be blocked — poster stays visible */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.2, rootMargin: "80px" }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.fullName.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim()
      ) {
        toast.error(toastCopy.requiredStep);
        return;
      }
    } else if (step === 2) {
      if (!formData.company.trim() || formData.investmentRange === "") {
        toast.error(toastCopy.requiredStep);
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.state.trim() ||
      !formData.city.trim() ||
      !formData.message.trim()
    ) {
      toast.error(toastCopy.requiredSubmit);
      return;
    }

    setIsSubmitting(true);

    const result = await submitLead({
      type: "investor",
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      company: formData.company,
      investmentRange: formData.investmentRange,
      state: formData.state,
      city: formData.city,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.error || toastCopy.submitError);
      return;
    }

    toast.success(toastCopy.submitSuccess);
    setStep(1);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      investmentRange: "",
      state: "",
      city: "",
      message: "",
    });
  };

  const requiredFilled = [
    formData.fullName.trim(),
    formData.email.trim(),
    formData.phone.trim(),
    formData.company.trim(),
    formData.investmentRange,
    formData.state.trim(),
    formData.city.trim(),
    formData.message.trim(),
  ].filter(Boolean).length;
  const progress = Math.round((requiredFilled / 8) * 100);

  return (
    <section className="flex flex-col bg-main-bg text-body overflow-x-clip">
      <AppToast hideProgressBar />

      {/* Hero — full-bleed video / poster + brand-first hierarchy */}
      <div
        ref={heroRef}
        className="relative min-h-[calc(100svh-4rem)] sm:min-h-[78svh] lg:min-h-[85svh] flex flex-col justify-end overflow-hidden border-b border-header-stroke"
      >
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover object-[58%_40%] sm:object-[center_35%] lg:object-center transition-opacity duration-700 ${
            videoReady && !reduceMotion ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden
        />

        {!reduceMotion && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="none"
            poster={HERO_POSTER}
            onLoadedData={() => setVideoReady(true)}
            aria-hidden
          />
        )}

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
              Be an investor
            </h1>
            <p className="text-secondary-text type-body mb-6 sm:mb-8 max-w-xl">
              Join curated real-estate opportunities with clear guidance — from
              first conversation to partnership.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full">
              <Button
                href="#investor-form"
                size="lg"
                className="w-full sm:w-auto min-h-12 touch-manipulation"
              >
                Start your enquiry
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Button>
              <p className="type-caption text-secondary-text text-center sm:text-left sm:pl-1">
                Confidential · No obligation
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
            {steps.map(({ step: n, title, description, Icon }, index) => (
              <motion.li
                key={n}
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
                    {n}
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

      {/* Form + benefits */}
      <div
        id="investor-form"
        className="section-y page-px scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-14 xl:gap-20 max-w-7xl mx-auto w-full min-w-0 items-start">
          <motion.aside
            className="lg:w-[42%] w-full min-w-0 order-2 lg:order-1 flex flex-col gap-6 sm:gap-8"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <p className="type-label text-primary mb-2">Why invest with us</p>
              <h2 className="type-section text-body mb-3 text-balance">
                Built for serious partners
              </h2>
              <p className="text-secondary-text type-body max-w-xl">
                Clear opportunities, verified documentation, and a local team
                that stays with you through every stage.
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
                    <p className="type-body text-secondary-text">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative hidden lg:block aspect-[4/3] w-full overflow-hidden rounded-media border border-header-stroke">
              <Image
                src="/images/property2.webp"
                alt="Investment-ready property exterior"
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
            className="lg:w-[58%] w-full min-w-0 order-1 lg:order-2 lg:sticky lg:top-28 self-start"
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
              <h2 className="type-subhead text-body">Investor enquiry form</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full p-4 sm:p-6 lg:p-8 bg-2nd-bg rounded-card border border-header-stroke text-body min-w-0 overflow-hidden flex flex-col gap-4"
              noValidate
            >
              <div className="flex items-end justify-between gap-3">
                <p className="type-label text-primary">
                  Step {step} of {STEP_TITLES.length}
                </p>
                <p className="type-caption font-medium text-secondary-text tabular-nums">
                  {progress}% completed
                </p>
              </div>
              <div
                className="w-full bg-header-stroke h-1.5 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Form progress"
              >
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="type-card-title text-body">
                    {STEP_TITLES[step - 1]}
                  </h3>

                  {step === 1 && (
                    <>
                      <Input
                        id="inv-fullName"
                        name="fullName"
                        label="Full name *"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      <Input
                        id="inv-email"
                        name="email"
                        type="email"
                        label="Email *"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                      <Input
                        id="inv-phone"
                        name="phone"
                        type="tel"
                        label="Phone *"
                        placeholder="+91 …"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Input
                        id="inv-company"
                        name="company"
                        label="Company / organization *"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                      <Select
                        id="inv-range"
                        name="investmentRange"
                        label="Investment range *"
                        value={formData.investmentRange}
                        onChange={handleChange}
                      >
                        <option value="">Select investment range</option>
                        <option value="Below ₹5 Lakh">Below ₹5 Lakh</option>
                        <option value="₹5-20 Lakh">₹5–20 Lakh</option>
                        <option value="₹20 Lakh - ₹1 Cr">
                          ₹20 Lakh – ₹1 Cr
                        </option>
                        <option value="Above ₹1 Cr">Above ₹1 Cr</option>
                      </Select>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          id="inv-state"
                          name="state"
                          label="State *"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleChange}
                          autoComplete="address-level1"
                        />
                        <Input
                          id="inv-city"
                          name="city"
                          label="City *"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          autoComplete="address-level2"
                        />
                      </div>
                      <Textarea
                        id="inv-message"
                        name="message"
                        label="Message *"
                        rows={4}
                        placeholder="Why do you want to invest with us?"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-2">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-h-12 touch-manipulation"
                  >
                    Back
                  </Button>
                ) : (
                  <span className="hidden sm:block" aria-hidden />
                )}
                {step < STEP_TITLES.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto sm:ml-auto min-h-12 touch-manipulation"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto sm:ml-auto min-h-12 touch-manipulation"
                  >
                    {isSubmitting ? "Submitting…" : "Submit enquiry"}
                  </Button>
                )}
              </div>

              <p className="flex items-start gap-2 type-caption text-secondary-text mt-1">
                <CheckCircle
                  className="text-primary shrink-0 mt-0.5"
                  size={16}
                  aria-hidden
                />
                <span>
                  Your information stays confidential and is used only for
                  investment-related communication.
                </span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeAnInvestor;
