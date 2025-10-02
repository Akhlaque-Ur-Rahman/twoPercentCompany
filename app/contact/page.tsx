"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Lottie from "lottie-react";
import contactAnimation from "@/public/animations/contact2.json"; // Your main Lottie
import successAnimation from "@/public/animations/success.json"; // Success Lottie
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  type: "Property" | "Plot" | "";
  purpose: string;
};

const ContactPage: React.FC = () => {
  const [typeDropdown, setTypeDropdown] = useState(false);
  const [purposeDropdown, setPurposeDropdown] = useState(false);
  const [selectedType, setSelectedType] = useState<FormData["type"]>("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const propertyPurposes = ["Buy", "Sell", "Rent"];
  const plotPurposes = ["Invest", "Develop", "Resell"];

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsSubmitted(true);
    reset(); // Clear form
    setSelectedType("");
    setSelectedPurpose("");

    setTimeout(() => setIsSubmitted(false), 3000); // hide success animation after 3s
  };

  const currentPurposes =
    selectedType === "Property"
      ? propertyPurposes
      : selectedType === "Plot"
      ? plotPurposes
      : [];

  return (
    <section className="bg-main-bg text-white min-h-screen relative">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-[40px] py-12 flex flex-col lg:flex-row gap-8">
        {/* Left: Lottie Animation */}
        <div className="w-full flex justify-center items-center">
          <Lottie
            animationData={contactAnimation}
            loop={true}
            className="w-1/2 h-full "
          />
        </div>

        {/* Right: Form */}
        <div className="lg:w-1/2 bg-2nd-bg p-8 rounded-[24px] border border-header-stroke">
          <h2 className="text-3xl font-semibold mb-6 text-primary">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="px-4 py-3 rounded-lg bg-main-bg text-white placeholder-secondary-text border border-header-stroke focus:outline-none focus:border-primary"
            />

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="px-4 py-3 rounded-lg bg-main-bg text-white placeholder-secondary-text border border-header-stroke focus:outline-none focus:border-primary"
            />

            <input
              type="tel"
              placeholder="Phone"
              {...register("phone", { required: true })}
              className="px-4 py-3 rounded-lg bg-main-bg text-white placeholder-secondary-text border border-header-stroke focus:outline-none focus:border-primary"
            />

            {/* Type Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setTypeDropdown(!typeDropdown)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-main-bg border border-header-stroke focus:outline-none"
              >
                {selectedType || "Select Type"}
                {typeDropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {typeDropdown && (
                <ul className="absolute z-10 mt-1 w-full bg-2nd-bg border border-header-stroke rounded-lg shadow-lg">
                  {["Property", "Plot"].map((type) => (
                    <li
                      key={type}
                      onClick={() => {
                        setSelectedType(type as FormData["type"]);
                        setTypeDropdown(false);
                        setSelectedPurpose("");
                      }}
                      className="px-4 py-3 cursor-pointer hover:bg-primary hover:text-black transition"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Purpose Dropdown */}
            {selectedType && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPurposeDropdown(!purposeDropdown)}
                  className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-main-bg border border-header-stroke focus:outline-none"
                >
                  {selectedPurpose || "Select Purpose"}
                  {purposeDropdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {purposeDropdown && (
                  <ul className="absolute z-10 mt-1 w-full bg-2nd-bg border border-header-stroke rounded-lg shadow-lg">
                    {currentPurposes.map((purpose) => (
                      <li
                        key={purpose}
                        onClick={() => {
                          setSelectedPurpose(purpose);
                          setPurposeDropdown(false);
                        }}
                        className="px-4 py-3 cursor-pointer hover:bg-primary hover:text-black transition"
                      >
                        {purpose}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-primary rounded-[16px] font-semibold text-black hover:bg-yellow-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />

      {/* Success Animation Overlay */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="w-64 h-64">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactPage;
