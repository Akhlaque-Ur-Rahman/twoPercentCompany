"use client";

import React, { useState } from "react";
import { Mail, CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-5">
        <p className="type-label text-primary mb-2">Stay informed</p>
        <h2 className="type-section text-body">
          New listings, market notes, and Patna updates.
        </h2>
        <p className="text-secondary-text type-body mt-3 prose-measure">
          Subscribe for curated property alerts — no spam, just useful signals.
        </p>
      </div>

      <div className="lg:col-span-7">
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <div className="relative flex items-center gap-3 flex-1 bg-main-bg border border-header-stroke px-4 py-3 rounded-control focus-within:border-primary transition-colors">
              <Mail
                className="text-secondary-text size-5 shrink-0"
                strokeWidth={1.5}
                aria-hidden
              />
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-body placeholder:text-secondary-text focus:outline-none w-full type-body bg-transparent min-h-11"
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto shrink-0">
              Subscribe
            </Button>
          </form>
        ) : (
          <motion.div
            className="flex items-center gap-3 min-h-14 type-body text-body"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CircleCheckBig className="size-6 text-primary shrink-0" strokeWidth={2} />
            <span>You&apos;re on the list. We&apos;ll be in touch.</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
