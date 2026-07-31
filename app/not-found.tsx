"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import notFoundAnim from "@/public/animations/notfound.json";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function NotFound() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-main-bg text-center page-px py-16">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.5 }}
        className="w-[280px] sm:w-[360px] md:w-[440px] max-w-full"
      >
        <Lottie
          animationData={notFoundAnim}
          loop={!reduceMotion}
          autoplay={!reduceMotion}
        />
      </motion.div>

      <h1 className="type-section text-primary mt-2">Page not found</h1>
      <p className="type-body text-secondary-text mt-3 prose-measure">
        Oops! The page you’re looking for doesn’t exist or may have moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/properties" variant="secondary">
          Browse Properties
        </Button>
      </div>
    </div>
  );
}
