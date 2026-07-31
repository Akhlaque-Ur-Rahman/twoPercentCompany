"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { PropertyTag } from "@/data/PropertyData";
import { BedDouble, Bath, Building2, Trees, Car, Landmark, Sofa } from "lucide-react";
import { toast } from "react-toastify";
import AppToast, { toastCopy } from "@/components/ui/AppToast";
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
      toast.error(toastCopy.tagEmpty);
      return;
    }
    if (formData.tags.includes(newTag)) {
      toast.error(toastCopy.tagDuplicate);
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
      toast.error(toastCopy.requiredStep);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Form submission with animation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) {
      toast.error(toastCopy.requiredSubmit);
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate API
      setSubmitted(true);
      toast.success(toastCopy.submitSuccess);
    } catch {
      toast.error(toastCopy.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AppToast />

      <AnimatePresence>
        {!submitted && (
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto p-6 bg-2nd-bg rounded-card border border-header-stroke text-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress */}
            <div className="w-full bg-header-stroke h-2 rounded-full mb-4">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-right mb-4 type-caption font-medium text-secondary-text">
              {progress}% completed
            </p>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-title" className="type-label text-secondary-text">
                    Property title
                  </label>
                  <input
                    id="pf-title"
                    type="text"
                    placeholder="e.g. 3BHK apartment in Boring Road"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mb-2 p-3 rounded-control bg-main-bg border border-header-stroke w-full placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-desc" className="type-label text-secondary-text">
                    Short description
                  </label>
                  <textarea
                    id="pf-desc"
                    placeholder="Brief summary for listing cards"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mb-2 p-3 rounded-control bg-main-bg border border-header-stroke w-full placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-long" className="type-label text-secondary-text">
                    Long description
                  </label>
                  <textarea
                    id="pf-long"
                    placeholder="Full details for the property page"
                    value={formData.longDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, longDescription: e.target.value })
                    }
                    className="mb-2 p-3 rounded-control bg-main-bg border border-header-stroke w-full placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-address" className="type-label text-secondary-text">
                    Address
                  </label>
                  <input
                    id="pf-address"
                    type="text"
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="mb-2 p-3 rounded-control bg-main-bg border border-header-stroke w-full placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-price" className="type-label text-secondary-text">
                    Price
                  </label>
                  <input
                    id="pf-price"
                    type="text"
                    placeholder="e.g. 1,25,00,000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="mb-2 p-3 rounded-control bg-main-bg border border-header-stroke w-full placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <p className="type-label text-secondary-text mb-1">Select Tags</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag.label}
                        type="button"
                        onClick={() => toggleTag(tag.label)}
                        className={`px-3 py-1 rounded-full border transition ${
                          formData.tags.includes(tag.label)
                            ? "bg-primary text-on-primary"
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
                          {customTag} Ã—
                        </button>
                      ))}
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label htmlFor="pf-custom-tag" className="type-label text-secondary-text">
                        Custom tag
                      </label>
                      <input
                        id="pf-custom-tag"
                        type="text"
                        placeholder="e.g. Near metro"
                        value={formData.newTag || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, newTag: e.target.value })
                        }
                        className="p-2 w-full rounded-control bg-main-bg border border-header-stroke placeholder:text-secondary-text text-body focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCustomTag();
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 bg-primary text-on-primary rounded-control hover:brightness-110 min-h-11"
                      onClick={addCustomTag}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <p className="type-label text-secondary-text mb-1">Main Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "images")}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="type-label text-secondary-text mb-1">Gallery Images (Min 3)</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "gallery")}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="type-label text-secondary-text mb-1">Floor Plans</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "floorPlans")}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="type-label text-secondary-text mb-1">Video</p>
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
                  <p className="type-label text-secondary-text mb-2">Specifications</p>
                  {formData.specifications.map((spec, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Label"
                        value={spec.label}
                        onChange={(e) =>
                          updateSpecification(idx, "label", e.target.value)
                        }
                        className="p-2 border rounded-control flex-1 bg-main-bg text-body placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecification(idx, "value", e.target.value)
                        }
                        className="p-2 border rounded-control flex-1 bg-main-bg text-body placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(idx)}
                        className="bg-primary text-on-primary px-2 rounded-control"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="px-3 py-1 bg-primary text-on-primary rounded-control"
                  >
                    Add Specification
                  </button>
                </div>

                {type === "rent" && (
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="pf-landlord-name" className="type-label text-secondary-text">
                        Landlord name
                      </label>
                      <input
                        id="pf-landlord-name"
                        type="text"
                        placeholder="Full name"
                        value={formData.landlordName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            landlordName: e.target.value,
                          })
                        }
                        className="mb-2 p-3 rounded-control bg-main-bg border border-header-stroke w-full placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="pf-landlord-contact" className="type-label text-secondary-text">
                        Landlord contact
                      </label>
                      <input
                        id="pf-landlord-contact"
                        type="text"
                        placeholder="Phone or email"
                        value={formData.landlordContact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            landlordContact: e.target.value,
                          })
                        }
                        className="mb-2 p-3 rounded-control bg-main-bg border border-header-stroke w-full placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
                      />
                    </div>
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
                  className="px-4 py-2 bg-primary text-on-primary rounded-control hover:brightness-110 transition"
                >
                  Previous
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-primary text-on-primary rounded-control hover:brightness-110 transition"
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-control transition ${
                    submitting
                      ? "bg-2nd-bg text-secondary-text cursor-not-allowed border border-header-stroke"
                      : "bg-primary text-on-primary hover:brightness-110"
                  }`}
                  disabled={submitting}
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-on-primary"
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
            className="w-full max-w-md mx-auto mt-10 p-8 bg-primary rounded-card text-on-primary text-center flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-on-primary mb-4"
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
            <h2 className="type-subhead">Form Submitted!</h2>
            <p className="type-body">Thank you for submitting your property details.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyForm;
