"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type ListingVideoFacadeProps = {
  src: string;
  title?: string;
  poster?: string;
};

export default function ListingVideoFacade({
  src,
  title = "Property walkthrough",
  poster,
}: ListingVideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-media border border-header-stroke bg-black aspect-video">
      {playing ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          controls
          playsInline
          poster={poster}
        >
          <source src={src} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          aria-label={`Play ${title}`}
        >
          {poster ? (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover brightness-90 contrast-90 transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              aria-hidden
            />
          ) : (
            <span className="absolute inset-0 bg-2nd-bg" aria-hidden />
          )}
          <span
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
            aria-hidden
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-14 sm:size-16 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary">
              <Play className="size-6 sm:size-7 fill-current" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
