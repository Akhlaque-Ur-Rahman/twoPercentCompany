"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LandlordFormData {
  title: string;
  description: string;
  address: string;
  price: string;
  tags: string[];
  newTag: string;
  images: File[];
  gallery: File[];
  floorPlans: File[];
  video: File | null;
  landlordName: string;
  landlordContact: string;
  specifications: { label: string; value: string }[];
  agreementType: string;
}

const defaultTags = [
  "1BHK",
  "2BHK",
  "3BHK",
  "4BHK",
  "Bathroom",
  "Apartment",
  "Parking",
  "Open Space",
  "Furnished",
];

const LandlordPage = () => {
  const [formData, setFormData] = useState<LandlordFormData>({
    title: "",
    description: "",
    address: "",
    price: "",
    tags: [],
    newTag: "",
    images: [],
    gallery: [],
    floorPlans: [],
    video: null,
    landlordName: "",
    landlordContact: "",
    specifications: [],
    agreementType: "",
  });

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Progress calculation
  useEffect(() => {
    let completed = 0;
    if (formData.title) completed++;
    if (formData.description) completed++;
    if (formData.address) completed++;
    if (formData.price) completed++;
    if (formData.tags.length) completed++;
    if (formData.images.length) completed++;
    if (formData.gallery.length >= 3) completed++;
    if (formData.landlordName) completed++;
    if (formData.landlordContact) completed++;
    const total = 9;
    setProgress(Math.round((completed / total) * 100));
  }, [formData]);

  // File change handler
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "images" | "gallery" | "floorPlans" | "video"
  ) => {
    const files = e.target.files;
    if (!files) return;
    if (field === "video") setFormData({ ...formData, video: files[0] });
    else setFormData({ ...formData, [field]: Array.from(files) });
  };

  // Tags
  const toggleTag = (tag: string) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t !== tag),
      });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };
  const addCustomTag = () => {
    const tag = formData.newTag.trim();
    if (!tag) return toast.error("Tag cannot be empty");
    if (formData.tags.includes(tag)) return toast.error("Tag already added");
    setFormData({ ...formData, tags: [...formData.tags, tag], newTag: "" });
  };

  // Specifications
  const addSpecification = () =>
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { label: "", value: "" }],
    });
  const updateSpecification = (
    i: number,
    key: "label" | "value",
    value: string
  ) => {
    const specs = [...formData.specifications];
    specs[i][key] = value;
    setFormData({ ...formData, specifications: specs });
  };
  const removeSpecification = (i: number) =>
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, idx) => idx !== i),
    });

  // Step validation
  const validateStep = (currentStep: number) => {
    if (currentStep === 1)
      return (
        formData.title &&
        formData.description &&
        formData.address &&
        formData.price
      );
    if (currentStep === 2)
      return (
        formData.tags.length > 0 &&
        formData.images.length > 0 &&
        formData.gallery.length >= 3
      );
    if (currentStep === 3)
      return formData.landlordName && formData.landlordContact;
    return true;
  };

  const nextStep = () => {
    if (!validateStep(step))
      return toast.error("Please fill all required fields in this step.");
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step))
      return toast.error(
        "Please complete all required fields before submitting."
      );
    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      console.log("Landlord Property Submitted:", formData);
      setSubmitted(true);
      toast.success("Property listed successfully!");
    } catch {
      toast.error("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-main-bg text-white flex flex-col">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex-1 flex items-start justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Illustration - only on large screens */}
          <div className="hidden lg:flex justify-center">
            
            <Image
              src="/images/sell-image.png"
              width={400}
              height={400}
              alt="Landlord Illustration"
              className="max-w-full h-auto"
            />
          </div>

          {/* Form */}
          <div className="bg-2nd-bg rounded-3xl shadow-2xl p-8 border border-header-stroke">
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">
              List Your Rental Property
            </h1>
            <p className="text-center text-secondary-text mb-6">
              Step {step} of 3
            </p>

            <AnimatePresence>
              {!submitted && (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Progress */}
                  <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-right mb-4 font-medium text-secondary-text">
                    {progress}% completed
                  </p>

                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Property Title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                      />
                      <textarea
                        placeholder="Short Description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary resize-none"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        placeholder="Monthly Rent (₹)"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="mb-1 font-medium">Select Tags</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {defaultTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full border transition ${
                              formData.tags.includes(tag)
                                ? "bg-primary text-black"
                                : "bg-main-bg text-secondary-text"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                        {formData.tags
                          .filter((t) => !defaultTags.includes(t))
                          .map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className="px-3 py-1 rounded-full border bg-main-bg text-secondary-text transition"
                            >
                              {tag} ×
                            </button>
                          ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add custom tag"
                          value={formData.newTag}
                          onChange={(e) =>
                            setFormData({ ...formData, newTag: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addCustomTag();
                            }
                          }}
                          className="p-2 flex-1 rounded-xl bg-main-bg border border-header-stroke placeholder:text-primary focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addCustomTag}
                          className="px-3 py-1 bg-primary text-black rounded-xl"
                        >
                          Add
                        </button>
                      </div>

                      <div>
                        <p className="mb-1 font-medium">Main Image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "images")}
                          className="text-primary outline-1 rounded-[8px] px-4 py-2"
                        />
                      </div>
                      <div>
                        <p className="mb-1 font-medium">
                          Gallery Images (Min 3)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileChange(e, "gallery")}
                          className="text-primary outline-1 rounded-[8px] px-4 py-2"
                        />
                      </div>
                      <div>
                        <p className="mb-1 font-medium">Floor Plans</p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileChange(e, "floorPlans")}
                          className="text-primary outline-1 rounded-[8px] px-4 py-2"
                        />
                      </div>
                      <div>
                        <p className="mb-1 font-medium">Video</p>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, "video")}
                          className="text-primary outline-1 rounded-[8px] px-4 py-2"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 font-medium">Specifications</p>
                        {formData.specifications.map((spec, idx) => (
                          <div key={idx} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              placeholder="Label"
                              value={spec.label}
                              onChange={(e) =>
                                updateSpecification(
                                  idx,
                                  "label",
                                  e.target.value
                                )
                              }
                              className="p-2 border rounded flex-1 bg-main-bg placeholder:text-primary focus:outline-none focus:border-primary"
                            />
                            <input
                              type="text"
                              placeholder="Value"
                              value={spec.value}
                              onChange={(e) =>
                                updateSpecification(
                                  idx,
                                  "value",
                                  e.target.value
                                )
                              }
                              className="p-2 border rounded flex-1 bg-main-bg placeholder:text-primary focus:outline-none focus:border-primary"
                            />
                            <button
                              type="button"
                              onClick={() => removeSpecification(idx)}
                              className="bg-primary text-black px-2 rounded"
                            >
                              X
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSpecification}
                          className="px-3 py-1 bg-primary text-black rounded"
                        >
                          Add Specification
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Landlord Name"
                        value={formData.landlordName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            landlordName: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        placeholder="Landlord Contact"
                        value={formData.landlordContact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            landlordContact: e.target.value,
                          })
                        }
                        className="p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-4">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 bg-primary text-black rounded-xl hover:bg-primary/80 transition"
                      >
                        Previous
                      </button>
                    )}
                    {step < 3 && (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-4 py-2 bg-primary text-black rounded-xl hover:bg-primary/80 transition"
                      >
                        Next
                      </button>
                    )}
                    {step === 3 && (
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded-xl transition ${
                          submitting
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-primary text-black hover:bg-primary/80"
                        }`}
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="w-full max-w-md mx-auto mt-10 p-8 bg-primary rounded-2xl text-black text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <h2 className="text-2xl font-bold mb-2">Property Listed!</h2>
                  <p>
                    Thank you! Your rental property has been successfully
                    submitted.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandlordPage;
