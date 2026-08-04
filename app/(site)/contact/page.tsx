"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import contactAnimation from "@/public/animations/contact2.json";
import successAnimation from "@/public/animations/success.json";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type FormData = {
  name: string;
  email: string;
  phone: string;
  type: "Property" | "Plot" | "";
  purpose: string;
  budget: string;
  location: string;
  listingSlug: string;
};

const fieldFocus =
  "focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

const ContactPage: React.FC = () => {
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [purposeDropdown, setPurposeDropdown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listingSlug, setListingSlug] = useState<string | null>(null);

  const propertyPurposes = ["Buy", "Sell", "Rent"];
  const plotPurposes = ["Invest", "Develop", "Resell"];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      type: "",
      purpose: "",
      budget: "",
      location: "",
      listingSlug: "",
    },
  });

  const selectedType = watch("type");
  const selectedPurpose = watch("purpose");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propertySlug = params.get("property")?.trim();
    const plotSlug = params.get("plot")?.trim();
    const slug = propertySlug || plotSlug;
    if (!slug) return;

    setListingSlug(slug);
    setValue("listingSlug", slug);
    if (plotSlug) {
      setValue("type", "Plot", { shouldValidate: true });
      setValue("purpose", "Invest", { shouldValidate: true });
    } else {
      setValue("type", "Property", { shouldValidate: true });
      setValue("purpose", "Buy", { shouldValidate: true });
    }
  }, [setValue]);

  const onSubmit = () => {
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const currentPurposes =
    selectedType === "Property"
      ? propertyPurposes
      : selectedType === "Plot"
        ? plotPurposes
        : [];

  return (
    <section className="bg-main-bg text-body relative">
      <div className="max-w-7xl mx-auto page-px section-y flex flex-col lg:flex-row gap-8">
        <div className="w-full flex justify-center items-center">
          <Lottie
            animationData={contactAnimation}
            loop
            className="w-1/2 h-full"
            aria-hidden
          />
        </div>

        <div className="lg:w-1/2 bg-2nd-bg p-8 rounded-card border border-header-stroke">
          <h1 className="type-subhead text-body mb-6">Contact Us</h1>
          <p className="text-secondary-text type-caption mb-6">
            Share your details and we&apos;ll get back to you. Fields marked with *
            are required.
          </p>

          {listingSlug && (
            <p className="type-caption text-body mb-4 rounded-control border border-header-stroke bg-main-bg px-4 py-3">
              Enquiring about listing{" "}
              <span className="font-semibold text-primary">{listingSlug}</span>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <input type="hidden" {...register("listingSlug")} />
            <Input
              label="Name *"
              placeholder="Your full name"
              error={errors.name ? "Name is required" : undefined}
              {...register("name", { required: true })}
            />

            <Input
              label="Email *"
              type="email"
              placeholder="you@example.com"
              error={errors.email ? "Valid email is required" : undefined}
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />

            <Input
              label="Phone *"
              type="tel"
              placeholder="+91 …"
              error={errors.phone ? "Phone is required" : undefined}
              {...register("phone", { required: true })}
            />

            <Input
              label="Budget *"
              placeholder="e.g. ₹50L – ₹1Cr"
              error={errors.budget ? "Budget is required" : undefined}
              {...register("budget", { required: true })}
            />

            <Input
              label="Preferred location *"
              placeholder="e.g. Patna"
              error={errors.location ? "Location is required" : undefined}
              {...register("location", { required: true })}
            />

            <div className="flex flex-col gap-1.5 relative">
              <span className="type-label text-secondary-text" id="type-label">
                Type *
              </span>
              <button
                type="button"
                aria-labelledby="type-label"
                aria-expanded={typeDropdown}
                aria-haspopup="listbox"
                onClick={() => {
                  setTypeDropdown(!typeDropdown);
                  setPurposeDropdown(false);
                }}
                className={`w-full flex justify-between items-center px-4 py-3 rounded-control bg-main-bg border-2 border-header-stroke ${fieldFocus} ${
                  errors.type ? "border-red-500" : ""
                }`}
              >
                {selectedType || "Select type"}
                {typeDropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <input
                type="hidden"
                {...register("type", { required: true })}
              />
              {errors.type && (
                <p className="type-caption text-red-500">Please select a type</p>
              )}
              {typeDropdown && (
                <ul
                  role="listbox"
                  aria-labelledby="type-label"
                  className="absolute z-10 top-full mt-1 w-full bg-2nd-bg border border-header-stroke rounded-control shadow-lg"
                >
                  {(["Property", "Plot"] as const).map((type) => (
                    <li key={type} role="option" aria-selected={selectedType === type}>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-primary hover:text-on-primary transition"
                        onClick={() => {
                          setValue("type", type, { shouldValidate: true });
                          setValue("purpose", "", { shouldValidate: false });
                          setTypeDropdown(false);
                        }}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {selectedType && (
              <div className="flex flex-col gap-1.5 relative">
                <span className="type-label text-secondary-text" id="purpose-label">
                  Purpose *
                </span>
                <button
                  type="button"
                  aria-labelledby="purpose-label"
                  aria-expanded={purposeDropdown}
                  aria-haspopup="listbox"
                  onClick={() => setPurposeDropdown(!purposeDropdown)}
                  className={`w-full flex justify-between items-center px-4 py-3 rounded-control bg-main-bg border-2 border-header-stroke ${fieldFocus} ${
                    errors.purpose ? "border-red-500" : ""
                  }`}
                >
                  {selectedPurpose || "Select purpose"}
                  {purposeDropdown ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <input type="hidden" {...register("purpose", { required: true })} />
                {errors.purpose && (
                  <p className="type-caption text-red-500">Please select a purpose</p>
                )}
                {purposeDropdown && (
                  <ul
                    role="listbox"
                    aria-labelledby="purpose-label"
                    className="absolute z-10 top-full mt-1 w-full bg-2nd-bg border border-header-stroke rounded-control shadow-lg"
                  >
                    {currentPurposes.map((purpose) => (
                      <li key={purpose} role="option" aria-selected={selectedPurpose === purpose}>
                        <button
                          type="button"
                          className="w-full text-left px-4 py-3 hover:bg-primary hover:text-on-primary transition"
                          onClick={() => {
                            setValue("purpose", purpose, { shouldValidate: true });
                            setPurposeDropdown(false);
                          }}
                        >
                          {purpose}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </div>
      </div>

      {isSubmitted && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          role="status"
          aria-live="polite"
        >
          <div className="w-64 h-64">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactPage;
