import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { getFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ | 2% Company",
  description:
    "Answers about buying, selling, renting, and plots with 2% Company in Patna.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="bg-main-bg text-body border-b border-header-stroke">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-px section-y space-y-10 max-w-3xl mx-auto">
        <div className="space-y-3">
          <p className="type-label text-primary font-semibold tracking-[0.14em]">
            FAQ
          </p>
          <h1 className="type-display text-body">Common questions</h1>
          <p className="type-body text-secondary-text">
            Still unsure?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{" "}
            or{" "}
            <Link href="/sell" className="text-primary hover:underline">
              start a sell listing
            </Link>
            .
          </p>
        </div>
        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
}
