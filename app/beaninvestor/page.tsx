"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrendingUp, Building2, Wallet, Handshake, CheckCircle } from "lucide-react";

const BeAnInvestor: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    investmentRange: "",
    state: "",
    city: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        toast.error("Please fill all required personal details.");
        return;
      }
    } else if (step === 2) {
      if (!formData.company.trim() || formData.investmentRange === "") {
        toast.error("Please provide company and investment details.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Step 3 fields only on submit
    if (!formData.state.trim() || !formData.city.trim() || !formData.message.trim()) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Simulate a short submit animation
    setTimeout(() => {
      toast.success("Your investor form has been submitted successfully!");
      console.log("Investor Form Data:", formData);

      setStep(1);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        investmentRange: "",
        state: "",
        city: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const formSteps = [
    {
      id: 1,
      title: "Personal Information",
      fields: (
        <>
          <input
            name="fullName"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary placeholder-primary focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary placeholder-primary focus:outline-none"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone *"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary placeholder-primary focus:outline-none"
          />
        </>
      ),
    },
    {
      id: 2,
      title: "Investment Details",
      fields: (
        <>
          <input
            name="company"
            placeholder="Company / Organization *"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary placeholder-primary focus:outline-none"
          />
          <select
            name="investmentRange"
            value={formData.investmentRange}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary focus:outline-none"
          >
            <option value="">Select Investment Range *</option>
            <option value="Below ₹5 Lakh">Below ₹5 Lakh</option>
            <option value="₹5-20 Lakh">₹5–20 Lakh</option>
            <option value="₹20 Lakh - ₹1 Cr">₹20 Lakh – ₹1 Cr</option>
            <option value="Above ₹1 Cr">Above ₹1 Cr</option>
          </select>
        </>
      ),
    },
    {
      id: 3,
      title: "Location & Message",
      fields: (
        <>
          <input
            name="state"
            placeholder="State *"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary placeholder-primary focus:outline-none"
          />
          <input
            name="city"
            placeholder="City *"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary placeholder-primary focus:outline-none"
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Why do you want to invest with us? *"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-2nd-bg border border-header-stroke text-primary placeholder-primary focus:outline-none resize-none"
          />
        </>
      ),
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "High Return Potential",
      desc: "Invest in real estate and proptech projects with strong appreciation potential and consistent ROI.",
    },
    {
      icon: Building2,
      title: "Diverse Opportunities",
      desc: "Choose from commercial, residential, and tech-driven ventures that align with your investment goals.",
    },
    {
      icon: Wallet,
      title: "Secure & Transparent",
      desc: "We maintain full transparency, verified documentation, and regular performance updates.",
    },
    {
      icon: Handshake,
      title: "Long-Term Partnerships",
      desc: "Partner with trustworthy developers and entrepreneurs for sustainable and mutually beneficial growth.",
    },
  ];

  return (
    <section>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Video Banner */}
      <div className="w-full mb-8 aspect-video relative rounded-lg overflow-hidden border border-header-stroke">
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-90"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/beaninvestor.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-10 px-6 lg:px-[40px]">
        <h2 className="text-[48px] font-semibold text-primary mb-2">Be an Investor</h2>
        <p className="text-secondary-text">
          Join us in shaping the future. Fill in your details step by step to begin your investment journey.
        </p>
      </div>

      {/* Benefits Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-6 lg:px-[40px]">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-2nd-bg border border-header-stroke p-6 rounded-[20px] flex flex-col items-start gap-4"
            >
              <Icon size={36} className="text-primary" />
              <h3 className="text-[clamp(18px,2vw,22px)] font-semibold text-primary">{b.title}</h3>
              <p className="text-secondary-text text-[clamp(14px,1.4vw,16px)] leading-relaxed">{b.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Form Section */}
      <div className="bg-main-bg text-white px-6 sm:px-8 lg:px-[40px] py-8 rounded-[16px]">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex flex-col gap-6 bg-2nd-bg px-4 py-6 rounded-[16px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                Step {step} of {formSteps.length}: {formSteps[step - 1].title}
              </h3>
              {formSteps[step - 1].fields}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-6 py-3 bg-2nd-bg border border-header-stroke rounded-lg text-primary hover:bg-primary hover:text-black transition disabled:opacity-50"
              >
                Back
              </button>
            )}
            {step < formSteps.length ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="ml-auto px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className="ml-auto px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </motion.button>
            )}
          </div>
        </form>
      </div>

      {/* Note */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-secondary-text text-[clamp(13px,1.3vw,15px)] mb-4 px-6 lg:px-[40px]">
        <CheckCircle className="text-primary" size={20} />
        <p>Your information will remain confidential and used only for investment-related communication.</p>
      </div>

      <Footer />
    </section>
  );
};

export default BeAnInvestor;
