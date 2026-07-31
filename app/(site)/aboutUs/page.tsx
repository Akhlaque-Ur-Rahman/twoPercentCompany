"use client";

import React from "react";
import { motion } from "framer-motion";
import CTA from "@/components/CTA";
import { ShieldCheck, Lightbulb, Leaf } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const StatCard = ({ number, label }: { number: number; label: string }) => {
  const [count, setCount] = React.useState(0);
  const reduceMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) {
      setCount(number);
      return;
    }
    let start = 0;
    const end = number;
    if (start === end) return;

    const incrementTime = 2000 / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [number, reduceMotion]);

  return (
    <div className="text-center sm:text-left">
      <h3 className="type-stat text-body mb-1">{count}+</h3>
      <p className="text-secondary-text type-body">{label}</p>
    </div>
  );
};

const timeline = [
  { year: "2010", event: "Founded in Patna to guide local property buyers and sellers." },
  { year: "2015", event: "Expanded into verified plot and land advisory." },
  { year: "2020", event: "Grew rental and landlord support across the city." },
  { year: "2025", event: "Launched investor-focused opportunities with clearer guidance." },
];

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
    icon: Leaf,
  },
];

const About = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div>
      <section className="page-px section-y-lg text-center border-b border-header-stroke">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="type-label text-primary mb-3"
        >
          2% Company
        </motion.p>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.05 }}
          className="type-display mb-4 text-body"
        >
          About us
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.1 }}
          className="type-body text-secondary-text prose-measure-wide mx-auto"
        >
          A Patna real-estate partner for buying, selling, renting, and investing —
          with clear guidance at every step.
        </motion.p>
      </section>

      <section className="page-px section-y border-b border-header-stroke">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-header-stroke">
          <div className="sm:px-6 first:sm:pl-0 last:sm:pr-0">
            <StatCard number={120} label="Projects guided" />
          </div>
          <div className="sm:px-6">
            <StatCard number={75} label="Clients served" />
          </div>
          <div className="sm:px-6 last:sm:pr-0">
            <StatCard number={15} label="Years of experience" />
          </div>
        </div>
      </section>

      <section className="page-px section-y border-b border-header-stroke">
        <h2 className="type-section text-body mb-10">Our journey</h2>
        <ol className="space-y-8 max-w-3xl">
          {timeline.map((item) => (
            <li key={item.year} className="grid grid-cols-[4.5rem_1fr] gap-4 sm:gap-8">
              <p className="type-label text-primary pt-0.5">{item.year}</p>
              <p className="type-body text-secondary-text border-l border-header-stroke pl-4 sm:pl-6">
                {item.event}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="page-px section-y">
        <h2 className="type-section text-body mb-3">What we stand for</h2>
        <p className="type-body text-secondary-text prose-measure mb-10">
          Three principles that shape how we work with every client.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="flex flex-col gap-3">
                <Icon size={28} strokeWidth={1.5} className="text-primary" />
                <h3 className="type-card-title text-body">{value.title}</h3>
                <p className="text-secondary-text type-body">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default About;
