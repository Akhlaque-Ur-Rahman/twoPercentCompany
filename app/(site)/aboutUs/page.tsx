"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  MapPin,
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import CTA from "@/components/CTA";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const stats = [
  { number: 120, label: "Projects guided" },
  { number: 75, label: "Clients served" },
  { number: 15, label: "Years of experience" },
] as const;

const timeline = [
  {
    year: "2010",
    event: "Founded in Patna to guide local property buyers and sellers.",
  },
  {
    year: "2015",
    event: "Expanded into verified plot and land advisory.",
  },
  {
    year: "2020",
    event: "Grew rental and landlord support across the city.",
  },
  {
    year: "2025",
    event: "Launched investor-focused opportunities with clearer guidance.",
  },
] as const;

const values = [
  {
    title: "Integrity",
    desc: "Honest advice and transparent steps from enquiry to closing.",
    icon: ShieldCheck,
  },
  {
    title: "Clarity",
    desc: "We simplify decisions so you always know what comes next.",
    icon: Lightbulb,
  },
  {
    title: "Local care",
    desc: "Patna-first knowledge that keeps recommendations grounded.",
    icon: MapPin,
  },
] as const;

function StatCard({ number, label }: { number: number; label: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCount(number);
      return;
    }

    let frame = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease-out cubic — fewer perceived jumps near the end
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * number));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, number, reduceMotion]);

  return (
    <div ref={ref} className="text-center sm:text-left py-6 sm:py-0">
      <p className="type-stat text-primary tabular-nums leading-none mb-2">
        {count}+
      </p>
      <p className="text-secondary-text type-body">{label}</p>
    </div>
  );
}

const fadeUp = (reduceMotion: boolean, delay = 0) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.45, delay },
      };

const About = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col bg-main-bg text-body overflow-x-clip">
      {/* Hero — full-bleed visual + brand-first hierarchy */}
      <section className="relative min-h-[calc(100svh-4rem)] sm:min-h-[72svh] lg:min-h-[78svh] flex flex-col justify-end overflow-hidden border-b border-header-stroke">
        <Image
          src="/images/luxury-house.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_40%] sm:object-[center_35%] lg:object-center"
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
              About us
            </h1>
            <p className="text-secondary-text type-body mb-6 sm:mb-8 max-w-xl">
              A Patna real-estate partner for buying, selling, renting, and
              investing — with clear guidance at every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full">
              <Button
                href="/contact"
                size="lg"
                className="w-full sm:w-auto min-h-12 touch-manipulation"
              >
                Talk to us
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Button>
              <Button
                href="#our-journey"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-h-12 touch-manipulation bg-2nd-bg/70 backdrop-blur-sm"
              >
                Our journey
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-y-0.5"
                  aria-hidden
                />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats — accent numbers, mobile stacking with borders */}
      <section
        aria-label="Company highlights"
        className="page-px section-y border-b border-header-stroke"
      >
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:divide-x sm:divide-header-stroke">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="sm:px-8 first:sm:pl-0 last:sm:pr-0 border-b border-header-stroke last:border-b-0 sm:border-b-0"
                {...fadeUp(reduceMotion, index * 0.06)}
              >
                <StatCard number={stat.number} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey — continuous rail + clear year hierarchy */}
      <section
        id="our-journey"
        className="relative page-px section-y border-b border-header-stroke scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage: `radial-gradient(
              ellipse 50% 60% at 100% 0%,
              color-mix(in srgb, var(--color-primary) 10%, transparent),
              transparent 55%
            )`,
          }}
        />
        <div className="relative max-w-7xl mx-auto w-full min-w-0">
          <motion.div
            className="mb-8 sm:mb-10 max-w-xl"
            {...fadeUp(reduceMotion)}
          >
            <p className="type-label text-primary mb-2 tracking-wide uppercase">
              Since 2010
            </p>
            <h2 className="type-section text-body">Our journey</h2>
          </motion.div>

          <ol className="relative max-w-3xl">
            {/* Vertical rail */}
            <span
              className="pointer-events-none absolute left-[0.35rem] sm:left-[0.4rem] top-2 bottom-2 w-px bg-header-stroke"
              aria-hidden
            />
            {timeline.map((item, index) => (
              <motion.li
                key={item.year}
                className="relative grid grid-cols-[1.25rem_5.5rem_1fr] sm:grid-cols-[1.25rem_6.5rem_1fr] gap-3 sm:gap-5 pb-8 last:pb-0"
                {...fadeUp(reduceMotion, index * 0.07)}
              >
                <span
                  className="relative z-10 mt-1.5 size-3 rounded-full border-2 border-primary bg-main-bg shrink-0"
                  aria-hidden
                />
                <p className="type-label text-primary pt-0.5 tabular-nums">
                  {item.year}
                </p>
                <p className="type-body text-secondary-text pt-0.5">
                  {item.event}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values — one job: principles, icon treatment matching sell */}
      <section className="page-px section-y">
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <motion.div
            className="mb-8 sm:mb-10 max-w-xl"
            {...fadeUp(reduceMotion)}
          >
            <p className="type-label text-primary mb-2 tracking-wide uppercase">
              Principles
            </p>
            <h2 className="type-section text-body mb-3">What we stand for</h2>
            <p className="type-body text-secondary-text prose-measure">
              Three principles that shape how we work with every client.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-header-stroke">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="flex flex-col gap-3 md:px-8 first:md:pl-0 last:md:pr-0 border-b border-header-stroke py-6 first:pt-0 last:border-b-0 last:pb-0 md:border-b-0 md:py-0"
                  {...fadeUp(reduceMotion, index * 0.08)}
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-control border border-header-stroke text-primary bg-2nd-bg">
                    <Icon size={18} strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="type-card-title text-body">{value.title}</h3>
                  <p className="text-secondary-text type-body">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default About;
