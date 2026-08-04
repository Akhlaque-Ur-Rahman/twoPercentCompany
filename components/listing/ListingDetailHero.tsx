import Image from "next/image";
import Link from "next/link";

type ListingDetailHeroProps = {
  title: string;
  address: string;
  image: string;
  brandLabel?: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function ListingDetailHero({
  title,
  address,
  image,
  brandLabel = "2% Company",
  ctaLabel,
  ctaHref,
}: ListingDetailHeroProps) {
  return (
    <section className="relative w-full overflow-x-clip -mt-16 lg:-mt-[4.5rem] border-b border-header-stroke">
      <div className="relative h-[58svh] min-h-[360px] max-h-[560px] sm:h-[62svh] sm:max-h-[620px] lg:h-[68vh] lg:min-h-[460px] lg:max-h-[720px] w-full max-w-[100vw]">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] sm:object-center"
          />
        </div>

        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/65 to-black/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] opacity-80 bg-[radial-gradient(ellipse_at_top_right,rgba(143,115,48,0.22),transparent_55%)]"
          aria-hidden
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-end page-px pb-10 pt-24 sm:pb-12 sm:pt-28 lg:justify-center lg:pb-14">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center lg:items-start lg:text-left">
            <p className="type-label text-primary font-semibold tracking-[0.14em]">
              {brandLabel}
            </p>
            <h1 className="type-display text-white leading-[1.08] mt-3 max-w-[18ch] sm:max-w-2xl text-balance">
              {title}
            </h1>
            <p className="text-white/80 type-body mt-3 max-w-xl text-balance">
              {address}
            </p>
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center justify-center rounded-control bg-primary text-on-primary font-semibold type-body px-6 py-3 hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
