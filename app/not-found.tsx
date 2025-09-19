"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Lottie from "lottie-react";
import notFoundAnim from "@/public/animations/notfound.json"; // adjust path if needed

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-2nd-bg text-center px-6">
      {/* Lottie animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-[300px] sm:w-[400px] md:w-[500px] max-w-full"
      >
        <Lottie animationData={notFoundAnim} loop={true} />
      </motion.div>

      

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-lg sm:text-xl text-secondary-text mt-4 max-w-[500px]"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-black font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
