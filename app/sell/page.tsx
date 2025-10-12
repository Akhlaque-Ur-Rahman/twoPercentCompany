"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { FileText, Camera, TrendingUp } from "lucide-react";
import PropertyForm from "@/components/PropertyForm";

const SellPage: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col bg-main-bg text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="py-20 px-6 text-center max-w-7xl mx-auto">
        <h1 className="text-[clamp(28px,4vw,48px)] font-bold text-primary mb-4">
          List Your Property Effortlessly
        </h1>
        <p className="text-secondary-text mb-6">
          Connect with genuine buyers and get the best value for your property.
        </p>
        <a
          href="#sell-property"
          className="bg-primary text-black font-semibold py-3 px-8 rounded-xl hover:bg-yellow-600 transition"
        >
          List My Property
        </a>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-6 max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
        {[
          { step: 1, title: "Submit Your Property Details", Icon: FileText },
          { step: 2, title: "Verification & Photoshoot", Icon: Camera },
          { step: 3, title: "List & Sell", Icon: TrendingUp },
        ].map(({ step, title, Icon }) => (
          <div
            key={step}
            className="relative group bg-2nd-bg p-8 rounded-2xl border border-header-stroke 
              hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.25)] transition-all duration-300"
          >
            <div
              className="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4
                text-primary text-2xl bg-gradient-to-tr from-yellow-500 to-yellow-400
                group-hover:shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <Icon size={28} />
            </div>
            <h3 className="font-bold text-xl text-primary mb-2">{`Step ${step}`}</h3>
            <p className="text-secondary-text">{title}</p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div id="sell-property" className="py-4 px-6 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl w-full">
          {/* Left */}
          <div className="lg:w-2/3 flex flex-col items-center p-8 gap-6">
            <h3 className="text-primary text-[48px] font-bold text-center">Why List With Us?</h3>
            <p className="text-secondary-text text-center">
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

      <Footer />
    </section>
  );
};

export default SellPage;
