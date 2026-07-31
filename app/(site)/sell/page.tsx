"use client";

import React from "react";
import Image from "next/image";
import { FileText, Camera, TrendingUp } from "lucide-react";
import PropertyForm from "@/components/PropertyForm";
import Button from "@/components/ui/Button";

const SellPage: React.FC = () => {
  return (
    <section className="flex flex-col bg-main-bg text-white">

      {/* Hero Section */}
      <div className="section-y-lg page-px text-center max-w-7xl mx-auto">
        <h1 className="type-display text-primary mb-4">
          List Your Property Effortlessly
        </h1>
        <p className="text-secondary-text type-body mb-6 prose-measure mx-auto">
          Connect with genuine buyers and get the best value for your property.
        </p>
        <Button href="#sell-property" size="lg">
          List My Property
        </Button>
      </div>

      {/* How It Works Section */}
      <div className="section-y page-px max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
        {[
          { step: 1, title: "Submit Your Property Details", Icon: FileText },
          { step: 2, title: "Verification & Photoshoot", Icon: Camera },
          { step: 3, title: "List & Sell", Icon: TrendingUp },
        ].map(({ step, title, Icon }) => (
          <div
            key={step}
            className="relative group bg-2nd-bg p-8 rounded-card border border-header-stroke 
              hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.25)] transition-all duration-300"
          >
            <div
              className="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4
                text-primary bg-gradient-to-tr from-primary to-primary-hover
                group-hover:shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <Icon size={28} />
            </div>
            <h3 className="type-card-title text-primary mb-2">{`Step ${step}`}</h3>
            <p className="text-secondary-text type-body">{title}</p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div id="sell-property" className="section-y-sm page-px flex justify-center">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl w-full">
          {/* Left */}
          <div className="lg:w-2/3 flex flex-col items-center p-8 gap-6">
            <h3 className="text-primary type-section text-center">Why List With Us?</h3>
            <p className="text-secondary-text type-body text-center prose-measure">
              Reach verified buyers, get professional photos, high visibility, and enjoy free or
              low-commission listings.
            </p>
            <Image
              src="/images/sell-image.png"
              alt="Sell Illustration"
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>

          {/* Right */}
          <div className="lg:w-1/2">
            <PropertyForm type="sell" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default SellPage;
