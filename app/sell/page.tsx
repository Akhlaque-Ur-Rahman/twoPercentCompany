"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const SellPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    type: "",
    title: "",
    address: "",
    price: "",
    area: "",
    furnished: "",
    description: "",
    images: [] as File[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [furnishedDropdownOpen, setFurnishedDropdownOpen] = useState(false);

  const propertyTypes = ["Property", "Plot", "Apartment", "Villa", "Independent House"];
  const furnishedOptions = ["Furnished", "Semi-Furnished", "Unfurnished"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle API submission logic
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen flex flex-col bg-main-bg text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="py-20 px-6 text-center max-w-7xl mx-auto">
        <h1 className="text-[clamp(28px,4vw,48px)] font-bold text-primary mb-4">
          Sell or List Your Property Effortlessly
        </h1>
        <p className="text-secondary-text mb-6">
          Connect with genuine buyers and get the best value for your property.
        </p>
        <button className="bg-primary text-black font-semibold py-3 px-8 rounded-xl hover:bg-yellow-600 transition">
          List My Property
        </button>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-6 max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
        <div className="bg-2nd-bg p-8 rounded-2xl border border-header-stroke">
          <h3 className="font-bold text-primary mb-2">Step 1</h3>
          <p>Submit Your Property Details</p>
        </div>
        <div className="bg-2nd-bg p-8 rounded-2xl border border-header-stroke">
          <h3 className="font-bold text-primary mb-2">Step 2</h3>
          <p>Verification & Photoshoot</p>
        </div>
        <div className="bg-2nd-bg p-8 rounded-2xl border border-header-stroke">
          <h3 className="font-bold text-primary mb-2">Step 3</h3>
          <p>List & Sell</p>
        </div>
      </div>

        <h2 className="text-[clamp(24px,3vw,36px)] font-bold text-primary text-center mb-12">
          Submit Your Property
        </h2>
      {/* Property Submission Form Section */}
      <div id="property-form" className="py-20 px-6  flex justify-center items-center">

        <div className="flex flex-col lg:flex-row gap-12 w-full">
          {/* Left Half: Illustration / Info */}
          <div className="lg:w-1/2 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-2nd-bg rounded-2xl flex flex-col justify-center items-center p-8">
              <h3 className="text-primary text-2xl font-bold mb-4">Why List With Us?</h3>
              <p className="text-secondary-text mb-6 text-center">
                Reach verified buyers, get professional photos, high visibility, and enjoy free or low-commission listings.
              </p>
              <img
                src="/images/sell-illustration.png"
                alt="Sell Illustration"
                className="w-3/4 mx-auto"
              />
            </div>
          </div>

          {/* Right Half: Form */}
          <div className="lg:w-1/2 relative z-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-primary text-black p-10 rounded-xl text-center font-semibold text-xl"
              >
                🎉 Your property has been submitted successfully!
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-2nd-bg p-8 rounded-2xl border border-header-stroke"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />

                {/* Property Type Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-main-bg border border-header-stroke rounded-lg text-white focus:outline-none"
                  >
                    {formData.type || "Select Property Type"}
                    {typeDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {typeDropdownOpen && (
                    <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-2nd-bg border border-header-stroke rounded-lg shadow-lg custom-scrollbar">
                      {propertyTypes.map((type) => (
                        <li
                          key={type}
                          onClick={() => {
                            setFormData({ ...formData, type });
                            setTypeDropdownOpen(false);
                          }}
                          className={`px-4 py-3 cursor-pointer hover:bg-primary hover:text-black transition ${
                            formData.type === type ? "bg-primary text-black" : ""
                          }`}
                        >
                          {type}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <input
                  type="text"
                  name="title"
                  placeholder="Property Title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />
                <input
                  type="text"
                  name="area"
                  placeholder="Area (sqft)"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />

                {/* Furnished Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFurnishedDropdownOpen(!furnishedDropdownOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-main-bg border border-header-stroke rounded-lg text-white focus:outline-none"
                  >
                    {formData.furnished || "Furnished Status"}
                    {furnishedDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {furnishedDropdownOpen && (
                    <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-2nd-bg border border-header-stroke rounded-lg shadow-lg custom-scrollbar">
                      {furnishedOptions.map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            setFormData({ ...formData, furnished: option });
                            setFurnishedDropdownOpen(false);
                          }}
                          className={`px-4 py-3 cursor-pointer hover:bg-primary hover:text-black transition ${
                            formData.furnished === option ? "bg-primary text-black" : ""
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <textarea
                  name="description"
                  placeholder="Description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text h-28"
                />
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-secondary-text"
                />
                <button
                  type="submit"
                  className="bg-primary text-black py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
                >
                  Submit Property
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default SellPage;
