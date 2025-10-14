"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { PropertyTag } from "@/data/PropertyData";
import { BedDouble, Bath, Building2, Trees, Car, Landmark, Sofa } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyFormProps {
  type: "sell" | "rent";
}

const allTags: PropertyTag[] = [
  { icon: BedDouble, label: "1BHK" },
  { icon: BedDouble, label: "2BHK" },
  { icon: BedDouble, label: "3BHK" },
  { icon: BedDouble, label: "4BHK" },
  { icon: Bath, label: "Bathroom" },
  { icon: Building2, label: "Apartment" },
  { icon: Trees, label: "Open Space" },
  { icon: Car, label: "Parking" },
  { icon: Landmark, label: "Landmark" },
  { icon: Sofa, label: "Furnished" },
];

const PropertyForm: React.FC<PropertyFormProps> = ({ type }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    address: "",
    price: "",
    tags: [] as string[],
    newTag: "",
    images: [] as File[],
    gallery: [] as File[],
    floorPlans: [] as File[],
    video: null as File | null,
    landlordName: "",
    landlordContact: "",
    specifications: [] as { label: string; value: string }[],
  });

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate progress
  useEffect(() => {
    let completed = 0;

    if (formData.title) completed++;
    if (formData.description) completed++;
    if (formData.longDescription) completed++;
    if (formData.address) completed++;
    if (formData.price) completed++;
    if (formData.tags.length) completed++;
    if (formData.images.length) completed++;
    if (formData.gallery.length) completed++;
    if (formData.floorPlans.length) completed++;
    if (formData.video) completed++;
    if (type === "rent") {
      if (formData.landlordName) completed++;
      if (formData.landlordContact) completed++;
    }
    if (formData.specifications.length) completed++;

    const totalFields =
      5 + 1 + 1 + 1 + 1 + (type === "rent" ? 2 : 0) + 1; // same calculation as before

    setProgress(Math.round((completed / totalFields) * 100));
  }, [formData, type]);

  // File handler
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "images" | "gallery" | "floorPlans" | "video"
  ) => {
    const files = e.target.files;
    if (!files) return;
    if (field === "video") {
      setFormData({ ...formData, video: files[0] });
    } else {
      setFormData({ ...formData, [field]: Array.from(files) });
    }
  };

  // Specifications
  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { label: "", value: "" }],
    });
  };
  const updateSpecification = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    const specs = [...formData.specifications];
    specs[index][key] = value;
    setFormData({ ...formData, specifications: specs });
  };
  const removeSpecification = (index: number) => {
    const specs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: specs });
  };

  // Tags
  const toggleTag = (label: string) => {
    if (formData.tags.includes(label)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t !== label),
      });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, label] });
    }
  };

  const addCustomTag = () => {
    const newTag = formData.newTag.trim();
    if (!newTag) {
      toast.error("Tag cannot be empty");
      return;
    }
    if (formData.tags.includes(newTag)) {
      toast.error("Tag already added");
      return;
    }
    setFormData({
      ...formData,
      tags: [...formData.tags, newTag],
      newTag: "",
    });
  };

  // Validation
  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      return (
        formData.title.trim() &&
        formData.description.trim() &&
        formData.longDescription.trim() &&
        formData.address.trim() &&
        formData.price.trim()
      );
    } else if (currentStep === 2) {
      return (
        formData.tags.length > 0 &&
        formData.images.length > 0 &&
        formData.gallery.length >= 3
      );
    } else if (currentStep === 3) {
      if (type === "rent") {
        return formData.landlordName.trim() && formData.landlordContact.trim();
      }
      return true;
    }
    return false;
  };

  const nextStep = () => {
    if (!validateStep(step)) {
      toast.error("Please fill all required fields in this step.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Form submission with animation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) {
      toast.error("Please complete all required fields before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate API
      console.log("Form Submitted:", formData);
      setSubmitted(true);
      toast.success("Form submitted successfully!");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <AnimatePresence>
        {!submitted && (
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto p-6 bg-2nd-bg rounded-2xl border border-header-stroke text-white"
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
                  className="mb-2 p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                />
                <textarea
                  placeholder="Short Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mb-2 p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary resize-none"
                />
                <textarea
                  placeholder="Long Description"
                  value={formData.longDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, longDescription: e.target.value })
                  }
                  className="mb-2 p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary resize-none"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="mb-2 p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="mb-2 p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <p className="mb-1 font-medium">Select Tags</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag.label}
                        type="button"
                        onClick={() => toggleTag(tag.label)}
                        className={`px-3 py-1 rounded-full border transition ${
                          formData.tags.includes(tag.label)
                            ? "bg-primary text-black"
                            : "bg-main-bg text-secondary-text"
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                    {formData.tags
                      .filter(
                        (t) => !allTags.map((tag) => tag.label).includes(t)
                      )
                      .map((customTag) => (
                        <button
                          key={customTag}
                          type="button"
                          onClick={() => toggleTag(customTag)}
                          className="px-3 py-1 rounded-full border bg-main-bg text-secondary-text transition"
                        >
                          {customTag} ×
                        </button>
                      ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add custom tag"
                      value={formData.newTag || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, newTag: e.target.value })
                      }
                      className="p-2 flex-1 rounded-xl bg-main-bg border border-header-stroke placeholder:text-primary text-white focus:outline-none focus:border-primary"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-3 py-1 bg-primary text-black rounded-xl"
                      onClick={addCustomTag}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <p className="mb-1 font-medium">Main Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "images")}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="mb-1 font-medium">Gallery Images (Min 3)</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "gallery")}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="mb-1 font-medium">Floor Plans</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "floorPlans")}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="mb-1 font-medium">Video</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, "video")}
                    className="text-primary"
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
                          updateSpecification(idx, "label", e.target.value)
                        }
                        className="p-2 border rounded flex-1 bg-main-bg text-white placeholder:text-primary focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecification(idx, "value", e.target.value)
                        }
                        className="p-2 border rounded flex-1 bg-main-bg text-white placeholder:text-primary focus:outline-none focus:border-primary"
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

                {type === "rent" && (
                  <div>
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
                      className="mb-2 p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
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
                      className="mb-2 p-3 rounded-xl bg-main-bg border border-header-stroke w-full placeholder:text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                )}
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
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="w-full max-w-md mx-auto mt-10 p-8 bg-primary rounded-2xl text-black text-center flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-black mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold">Form Submitted!</h2>
            <p>Thank you for submitting your property details.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyForm;
