"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import AppToast, { toastCopy } from "@/components/ui/AppToast";
import { TrendingUp, Building2, Wallet, Handshake, CheckCircle } from "lucide-react";

const inputClass =
  "w-full p-3 rounded-control bg-2nd-bg border border-header-stroke text-primary placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

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
        toast.error(toastCopy.requiredStep);
        return;
      }
    } else if (step === 2) {
      if (!formData.company.trim() || formData.investmentRange === "") {
        toast.error(toastCopy.requiredStep);
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
      toast.error(toastCopy.requiredSubmit);
      return;
    }

    setIsSubmitting(true);

    // Simulate a short submit animation
    setTimeout(() => {
      toast.success(toastCopy.submitSuccess);

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
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-fullName" className="type-label text-secondary-text">Full name *</label>
            <input
              id="inv-fullName"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-email" className="type-label text-secondary-text">Email *</label>
            <input
              id="inv-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-phone" className="type-label text-secondary-text">Phone *</label>
            <input
              id="inv-phone"
              name="phone"
              type="tel"
              placeholder="+91 …"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </>
      ),
    },
    {
      id: 2,
      title: "Investment Details",
      fields: (
        <>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-company" className="type-label text-secondary-text">Company / organization *</label>
            <input
              id="inv-company"
              name="company"
              placeholder="Company name"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-range" className="type-label text-secondary-text">Investment range *</label>
            <select
              id="inv-range"
              name="investmentRange"
              value={formData.investmentRange}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select investment range</option>
              <option value="Below ₹5 Lakh">Below ₹5 Lakh</option>
              <option value="₹5-20 Lakh">₹5–20 Lakh</option>
              <option value="₹20 Lakh - ₹1 Cr">₹20 Lakh – ₹1 Cr</option>
              <option value="Above ₹1 Cr">Above ₹1 Cr</option>
            </select>
          </div>
        </>
      ),
    },
    {
      id: 3,
      title: "Location & Message",
      fields: (
        <>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-state" className="type-label text-secondary-text">State *</label>
            <input
              id="inv-state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-city" className="type-label text-secondary-text">City *</label>
            <input
              id="inv-city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="inv-message" className="type-label text-secondary-text">Message *</label>
            <textarea
              id="inv-message"
              name="message"
              rows={4}
              placeholder="Why do you want to invest with us?"
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>
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
      <AppToast hideProgressBar />

      {/* Video Banner */}
      <div className="w-full mb-8 aspect-video relative rounded-media overflow-hidden border border-header-stroke">
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
      <div className="max-w-2xl mx-auto text-center mb-10 page-px">
        <h2 className="type-display text-primary mb-2">Be an Investor</h2>
        <p className="text-secondary-text type-body">
          Join us in shaping the future. Fill in your details step by step to begin your investment journey.
        </p>
      </div>

      {/* Benefits Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 page-px">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-2nd-bg border border-header-stroke p-6 rounded-card flex flex-col items-start gap-4"
            >
              <Icon size={36} className="text-primary" />
              <h3 className="type-card-title text-primary">{b.title}</h3>
              <p className="text-secondary-text type-body leading-relaxed">{b.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Form Section */}
      <div className="bg-main-bg text-white page-px section-y-sm rounded-media">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex flex-col gap-6 bg-2nd-bg px-4 py-6 rounded-card"
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
              <h3 className="type-card-title text-primary mb-2 text-center">
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
                className="px-6 py-3 bg-2nd-bg border border-header-stroke rounded-control text-primary hover:bg-primary hover:text-on-primary transition disabled:opacity-50"
              >
                Back
              </button>
            )}
            {step < formSteps.length ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="ml-auto px-6 py-3 bg-primary text-on-primary font-semibold rounded-control hover:brightness-110 transition disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className="ml-auto px-6 py-3 bg-primary text-on-primary font-semibold rounded-control hover:brightness-110 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </motion.button>
            )}
          </div>
        </form>
      </div>

      {/* Note */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-secondary-text type-caption mb-4 page-px">
        <CheckCircle className="text-primary" size={20} />
        <p>Your information will remain confidential and used only for investment-related communication.</p>
      </div>

    </section>
  );
};

export default BeAnInvestor;
