import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/images/luxury-house.png";

export default function PropertiesHero() {
  return (
    <section className="relative w-full overflow-x-clip -mt-16 lg:-mt-[4.5rem] border-b border-header-stroke">
      <div className="relative h-[50svh] min-h-[320px] max-h-[520px] sm:h-[56svh] sm:max-h-[580px] lg:h-[62vh] lg:min-h-[420px] lg:max-h-[640px] w-full max-w-[100vw]">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] sm:object-center"
          />
        </div>

        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/70 to-black/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] opacity-80 glow-primary-tr"
          aria-hidden
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-end page-px pb-10 pt-24 sm:pb-12 sm:pt-28 lg:justify-center lg:pb-14">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center lg:items-start lg:text-left">
            <p className="type-label text-primary font-semibold tracking-[0.14em]">
              2% Company
            </p>
            <h1 className="type-display text-white leading-[1.08] mt-3 max-w-[16ch] sm:max-w-2xl text-balance">
              Homes for sale in Patna
            </h1>
            <p className="text-white/80 type-body mt-3 max-w-xl text-balance">
              Browse verified apartments, villas, and independent houses matched
              to how you want to live.
            </p>
            <Link
              href="#browse"
              className="mt-6 inline-flex items-center justify-center rounded-control bg-primary text-on-primary font-semibold type-body px-6 py-3 hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Browse homes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
