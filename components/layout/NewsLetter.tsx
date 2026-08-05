"use client";

import React, { useState } from "react";
import { Mail, CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { submitLead } from "@/lib/submitLead";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    const result = await submitLead({ type: "newsletter", email });
    setLoading(false);
    if (!result.ok) {
      setError(result.error || "Could not subscribe");
      return;
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="relative overflow-hidden rounded-card border border-header-stroke bg-main-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 p-5 sm:p-6 lg:p-8 items-center">
        <div className="lg:col-span-5">
          <p className="type-label text-primary mb-2 tracking-wide uppercase">
            Stay informed
          </p>
          <h2 className="type-subhead text-body">
            New listings, market notes, and Patna updates.
          </h2>
          <p className="text-secondary-text type-body mt-2 prose-measure">
            Subscribe for curated property alerts — no spam, just useful
            signals.
          </p>
        </div>

        <div className="lg:col-span-7">
          {!submitted ? (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <div className="relative flex items-center gap-3 flex-1 bg-2nd-bg border border-header-stroke px-4 py-3 rounded-control focus-within:border-primary transition-colors min-h-12">
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
                    autoComplete="email"
                    className="text-body placeholder:text-secondary-text focus:outline-none w-full type-body bg-transparent min-h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 min-h-12"
                  disabled={loading}
                >
                  {loading ? "Saving…" : "Subscribe"}
                </Button>
              </form>
              {error && (
                <p className="type-caption text-red-400 mt-2" role="alert">
                  {error}
                </p>
              )}
            </>
          ) : (
            <motion.div
              className="flex items-center gap-3 min-h-12 type-body text-body"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <CircleCheckBig
                className="size-6 text-primary shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              <span>You&apos;re on the list. We&apos;ll be in touch.</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
