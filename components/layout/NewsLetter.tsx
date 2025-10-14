"use client";
import React, { useState } from "react";
import { Mail, Send, CircleCheck, CircleCheckBig } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // 📌 Future: connect this to your DB / API
    console.log("New subscription:", email);

    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="relative mb-7 rounded-[16px]  flex flex-col justify-center items-center w-full">
      {/* Heading */}
      <div>
        <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] text-center font-semibold text-primary">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-secondary-text text-[14px] sm:text-[16px] text-center mt-1 sm:mt-2">
          Stay updated with the latest properties, plots, and real estate news.
        </p>
      </div>

      {/* Form */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 w-full mt-4"
        >
          {/* Input with Email Icon */}
          <div className="relative flex items-center gap-2 sm:gap-3 bg-main-bg border-2 border-header-stroke px-3 py-2 sm:py-3 rounded-[12px] ">
            <Mail className="text-secondary-text size-5 sm:size-5" strokeWidth={1.5} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-primary placeholder-primary focus:outline-none focus:border-primary w-full text-[14px] sm:text-[16px]"
            />
            <Send className="size-4 sm:size-5 text-secondary-text" strokeWidth={2} />
          </div>

          {/* Button with Animated Icon */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 rounded-[12px] bg-primary text-black font-semibold hover:opacity-90 transition w-full sm:w-auto cursor-pointer active:scale-105"
          >
            Subscribe
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="circle-small"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CircleCheck className="size-4 sm:size-5 text-black" strokeWidth={2} />
                </motion.div>
              ) : (
                <motion.div
                  key="circle-big"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                >
                  <CircleCheckBig className="size-6 sm:size-7" strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </form>
      ) : (
        <motion.div
          className="text-primary font-semibold text-center text-[16px] sm:text-[18px] mt-2 sm:mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Thanks for subscribing!
        </motion.div>
      )}
    </div>
  );
};

export default Newsletter;
