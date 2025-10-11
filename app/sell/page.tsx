"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

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
    setSubmitted(true);
  };

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
        <a href="#sell-property" className="bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-yellow-600 transition">
          List My Property
        </a>
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

      <h2 className="text-[clamp(32px,3vw,48px)] hidden lg:block font-bold text-primary text-center mb-12">
        Submit Your Property
      </h2>

      {/* Property Submission Form Section */}
      <div id="sell-property" className="py-4 px-6 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl w-full">
          {/* Left Half: Illustration / Info */}
          <div className="lg:w-2/3 flex flex-col items-center p-8 gap-6">
            <h3 className="text-primary text-[48px] font-bold text-center">Why List With Us?</h3>
            <p className="text-secondary-text text-center">
              Reach verified buyers, get professional photos, high visibility, and enjoy free or low-commission listings.
            </p>
            <Image
              src="/images/sell-image.png"
              alt="Sell Illustration"
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>

          {/* Right Half: Form */}
          <div className="lg:w-1/2">
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
                {/* Row 1: Name + Contact */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className=" px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary"
                  />
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    className=" px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary"
                  />
                </div>

                {/* Row 2: Email + Property Type */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className=" px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary"
                  />
                  <div className=" relative">
                    <button
                      type="button"
                      onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                      className="w-full h-full flex justify-between items-center px-4 py-3 bg-main-bg border border-header-stroke rounded-lg text-primary focus:outline-none"
                    >
                      {formData.type || "Property Type"}
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
                </div>

                {/* Row 3: Title + Address */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Property Title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className=" px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className=" px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary"
                  />
                </div>

                {/* Row 4: Price + Area */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className=" px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary"
                  />
                  <input
                    type="text"
                    name="area"
                    placeholder="Area (sqft)"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className=" px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary"
                  />
                </div>

                {/* Row 5: Furnished Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFurnishedDropdownOpen(!furnishedDropdownOpen)}
                    className="w-full h-full flex justify-between items-center px-4 py-3 bg-main-bg border border-header-stroke rounded-lg text-primary focus:outline-none"
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

                {/* Row 6: Description */}
                <textarea
                  name="description"
                  placeholder="Description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary placeholder:text-primary h-28 resize-none"
                />

                {/* Row 7: File Upload */}
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="px-4 py-3 rounded-xl bg-main-bg border border-header-stroke focus:outline-none focus:border-primary text-primary placeholder:text-primary"
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
