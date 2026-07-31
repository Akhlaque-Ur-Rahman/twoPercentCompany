"use client";

import React from "react";
import Image from "next/image";
import { FileText, Camera, TrendingUp } from "lucide-react";
import PropertyForm from "@/components/PropertyForm";
import Button from "@/components/ui/Button";

const steps = [
  { step: 1, title: "Submit your property details", Icon: FileText },
  { step: 2, title: "Verification & photoshoot", Icon: Camera },
  { step: 3, title: "List and connect with buyers", Icon: TrendingUp },
];

const SellPage: React.FC = () => {
  return (
    <section className="flex flex-col bg-main-bg text-body">
      <div className="section-y-lg page-px text-center border-b border-header-stroke">
        <p className="type-label text-primary mb-3">Sell with 2% Company</p>
        <h1 className="type-display text-body mb-4">
          List your property with clarity
        </h1>
        <p className="text-secondary-text type-body mb-8 prose-measure mx-auto">
          Reach genuine buyers with professional support — from details to listing.
        </p>
        <Button href="#sell-property" size="lg">
          List my property
        </Button>
      </div>

      <div className="section-y page-px border-b border-header-stroke">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-header-stroke">
          {steps.map(({ step, title, Icon }) => (
            <div key={step} className="sm:px-8 first:sm:pl-0 last:sm:pr-0 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="type-caption text-primary font-semibold">
                  Step {step}
                </span>
                <Icon size={20} className="text-primary" aria-hidden />
              </div>
              <p className="type-body text-body">{title}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="sell-property" className="section-y page-px">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-7xl mx-auto w-full items-start">
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-body type-section">Why list with us?</h2>
            <p className="text-secondary-text type-body prose-measure">
              Reach verified buyers, get professional photos, higher visibility,
              and clear support with fair commission options.
            </p>
            <Image
              src="/images/sell-image.png"
              alt="Property listing support illustration"
              width={400}
              height={400}
              className="mt-2 max-w-sm w-full h-auto"
            />
          </div>

          <div className="lg:w-1/2 w-full">
            <PropertyForm type="sell" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellPage;
