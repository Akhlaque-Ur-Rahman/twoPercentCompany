"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const DEFAULT_YOUTUBE_ID = "Ht6YuFAxICs";
const DEFAULT_POSTER = "/images/luxury-house.png";

type YoutubeFacadeProps = {
  title?: string;
  className?: string;
  poster?: string;
  youtubeId?: string;
};

export default function YoutubeFacade({
  title = "Property showcase video",
  className = "",
  poster = DEFAULT_POSTER,
  youtubeId = DEFAULT_YOUTUBE_ID,
}: YoutubeFacadeProps) {
  const [playing, setPlaying] = useState(false);

  // Mobile: 16:9 so it doesn't eat the whole screen.
  // Desktop: full-width player capped below the sticky navbar.
  return (
    <div
      className={`relative w-full overflow-hidden rounded-media border border-header-stroke bg-black aspect-video lg:aspect-auto lg:h-[calc(100svh-4.5rem)] ${className}`}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&cc_load_policy=0`}
          title={title}
          allow="autoplay; encrypted-media"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          aria-label={`Play ${title}`}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover brightness-90 contrast-90 transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
            aria-hidden
          />
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
