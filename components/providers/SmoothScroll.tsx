"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduceMotion) return;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduceMotion]);

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
