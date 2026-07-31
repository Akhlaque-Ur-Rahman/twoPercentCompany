"use client";

import React from "react";
import { motion } from "framer-motion";
import CTA from "@/components/CTA";
import { ShieldCheck, Lightbulb, Leaf } from "lucide-react";

const StatCard = ({ number, label }: { number: number; label: string }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
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
  }, [number]);

  return (
    <div className="bg-2nd-bg p-6 rounded-card shadow-md text-center">
      <h3 className="type-stat text-primary mb-2">{count}+</h3>
      <p className="text-secondary-text type-body">{label}</p>
    </div>
  );
};

const timeline = [
  { year: "2010", event: "Company Founded" },
  { year: "2015", event: "Reached 50 Clients" },
  { year: "2020", event: "Expanded Globally" },
  { year: "2025", event: "Launched AI Solutions" },
];

const values = [
  {
    title: "Integrity",
    desc: "We operate with honesty and transparency in every step.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    desc: "We embrace creativity to solve real-world challenges.",
    icon: Lightbulb,
  },
  {
    title: "Sustainability",
    desc: "We design solutions that last and positively impact society.",
    icon: Leaf,
  },
];

const About = () => {
  return (
    <div>
      <section className="page-px section-y-lg text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="type-display mb-4 text-primary"
        >
          About 2% Company
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="type-body text-secondary-text prose-measure-wide mx-auto"
        >
          Transforming industries with innovative solutions and measurable
          impact. At 2% Company, we make every step count.
        </motion.p>
      </section>

      <section className="page-px section-y">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          <StatCard number={120} label="Projects Completed" />
          <StatCard number={75} label="Clients Served" />
          <StatCard number={15} label="Years of Experience" />
        </motion.div>
      </section>

      <section className="page-px section-y relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="type-section text-center mb-12 text-primary"
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 top-0 w-1 h-full bg-primary opacity-40 rounded-full" />

          {timeline.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="mb-20 flex flex-col md:flex-row items-center relative w-full"
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-lg" />
              <div
                className={`md:w-1/2 p-6 bg-2nd-bg shadow-md rounded-card relative z-10 ${
                  idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <h3 className="type-card-title mb-1 text-primary">{item.year}</h3>
                <p className="text-secondary-text type-body">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="page-px section-y">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="type-section text-center mb-12 text-primary"
        >
          Our Core Values
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                whileHover={{ scale: 1.05 }}
                className="bg-2nd-bg rounded-card p-6 shadow-md flex flex-col items-center text-center transition-transform"
              >
                <Icon size={48} strokeWidth={1.5} className="mb-4 text-primary" />
                <h3 className="type-card-title mb-2 text-primary">{value.title}</h3>
                <p className="text-secondary-text type-body">{value.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default About;
