"use client";
import React, { useState } from "react";
import { Mail, CircleCheck, CircleCheckBig } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="relative mb-7 rounded-media flex flex-col justify-center items-center w-full">
      <div>
        <h2 className="type-card-title text-center text-primary">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-secondary-text type-body text-center mt-1 sm:mt-2">
          Stay updated with the latest properties, plots, and real estate news.
        </p>
      </div>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 w-full mt-4"
        >
          <div className="relative flex items-center gap-2 sm:gap-3 bg-main-bg border-2 border-header-stroke px-3 py-2 sm:py-3 rounded-control w-full sm:max-w-md">
            <Mail className="text-secondary-text size-5" strokeWidth={1.5} aria-hidden />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-body placeholder:text-secondary-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full type-body bg-transparent"
            />
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            Subscribe
            <AnimatePresence mode="wait">
              <motion.div
                key="circle-small"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CircleCheck className="size-4 sm:size-5 text-on-primary" strokeWidth={2} />
              </motion.div>
            </AnimatePresence>
          </Button>
        </form>
      ) : (
        <motion.div
          className="text-primary font-semibold text-center type-body mt-2 sm:mt-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CircleCheckBig className="size-6" strokeWidth={2} />
          Thanks for subscribing!
        </motion.div>
      )}
    </div>
  );
};

export default Newsletter;
