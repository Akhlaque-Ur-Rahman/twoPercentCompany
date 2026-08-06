"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { PropertyTag } from "@/data/PropertyData";
import { BedDouble, Bath, Building2, Trees, Car, Landmark, Sofa } from "lucide-react";
import { toast } from "react-toastify";
import AppToast, { toastCopy } from "@/components/ui/AppToast";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@/lib/submitLead";
import { uploadLeadFiles } from "@/lib/uploadLeadFiles";

const inputClass =
  "mb-0 p-3 min-h-11 text-base rounded-control bg-main-bg border border-header-stroke w-full min-w-0 placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg";

const textareaClass = `${inputClass} resize-y min-h-[6.5rem]`;

const fileFieldClass =
  "block w-full max-w-full min-w-0 text-sm text-secondary-text file:mr-3 file:rounded-control file:border-0 file:bg-primary file:text-on-primary file:px-3 file:py-2 file:text-sm file:font-semibold file:cursor-pointer";

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

const GALLERY_MIN = 3;

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

  // Progress tracks required fields only (gallery counts only at min 3)
  useEffect(() => {
    let completed = 0;
    const required =
      5 + // step 1 text fields
      1 + // tags
      1 + // main image
      1 + // gallery (min 3)
      (type === "rent" ? 2 : 0);

    if (formData.title.trim()) completed++;
    if (formData.description.trim()) completed++;
    if (formData.longDescription.trim()) completed++;
    if (formData.address.trim()) completed++;
    if (formData.price.trim()) completed++;
    if (formData.tags.length > 0) completed++;
    if (formData.images.length > 0) completed++;
    if (formData.gallery.length >= GALLERY_MIN) completed++;
    if (type === "rent") {
      if (formData.landlordName.trim()) completed++;
      if (formData.landlordContact.trim()) completed++;
    }

    setProgress(Math.min(100, Math.round((completed / required) * 100)));
  }, [formData, type]);

  const mergeUniqueFiles = (existing: File[], incoming: File[]) => {
    const seen = new Set(existing.map((f) => `${f.name}-${f.size}-${f.lastModified}`));
    const next = [...existing];
    for (const file of incoming) {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      if (!seen.has(key)) {
        seen.add(key);
        next.push(file);
      }
    }
    return next;
  };

  // File handler — gallery/floor plans append so users can add in batches
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "images" | "gallery" | "floorPlans" | "video"
  ) => {
    const files = e.target.files;
    if (!files?.length) return;

    if (field === "video") {
      setFormData((prev) => ({ ...prev, video: files[0] }));
    } else if (field === "images") {
      setFormData((prev) => ({ ...prev, images: [files[0]] }));
    } else if (field === "gallery") {
      setFormData((prev) => ({
        ...prev,
        gallery: mergeUniqueFiles(prev.gallery, Array.from(files)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        floorPlans: mergeUniqueFiles(prev.floorPlans, Array.from(files)),
      }));
    }

    // Allow re-selecting the same file path after clear/append
    e.target.value = "";
  };

  const removeGalleryFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Specifications
  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { label: "", value: "" }],
    }));
  };
  const updateSpecification = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    setFormData((prev) => {
      const specs = [...prev.specifications];
      specs[index] = { ...specs[index], [key]: value };
      return { ...prev, specifications: specs };
    });
  };
  const removeSpecification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  // Tags
  const toggleTag = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(label)
        ? prev.tags.filter((t) => t !== label)
        : [...prev.tags, label],
    }));
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
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
      newTag: "",
    }));
  };

  const stepErrorMessage = (currentStep: number): string | null => {
    if (currentStep === 1) {
      if (
        !formData.title.trim() ||
        !formData.description.trim() ||
        !formData.longDescription.trim() ||
        !formData.address.trim() ||
        !formData.price.trim()
      ) {
        return toastCopy.requiredStep;
      }
      return null;
    }

    if (currentStep === 2) {
      if (formData.tags.length === 0) return toastCopy.tagsRequired;
      if (formData.images.length === 0) return toastCopy.mainImageRequired;
      if (formData.gallery.length < GALLERY_MIN) {
        return `${toastCopy.galleryMin} (${formData.gallery.length}/${GALLERY_MIN} selected)`;
      }
      return null;
    }

    if (currentStep === 3 && type === "rent") {
      if (!formData.landlordName.trim() || !formData.landlordContact.trim()) {
        return toastCopy.landlordRequired;
      }
    }

    return null;
  };

  const nextStep = () => {
    const error = stepErrorMessage(step);
    if (error) {
      toast.error(error);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Form submission with animation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = stepErrorMessage(step);
    if (error) {
      toast.error(error);
      return;
    }

    setSubmitting(true);

    try {
      const uploaded = await uploadLeadFiles({
        images: formData.images,
        gallery: formData.gallery,
        floorPlans: formData.floorPlans,
        video: formData.video,
      });

      const result = await submitLead({
        type: type === "rent" ? "rent_landlord" : "sell",
        name: formData.landlordName || formData.title,
        phone: formData.landlordContact || undefined,
        message: formData.description,
        title: formData.title,
        address: formData.address,
        price: formData.price,
        longDescription: formData.longDescription,
        tags: formData.tags,
        imageCount: formData.images.length,
        galleryCount: formData.gallery.length,
        floorPlanCount: formData.floorPlans.length,
        hasVideo: Boolean(formData.video),
        specifications: formData.specifications,
        mediaStorage: uploaded.storage,
        mediaDraftId: uploaded.draftId,
        attachments: uploaded.attachments,
      });
      if (!result.ok) {
        toast.error(result.error || toastCopy.submitError);
        return;
      }
      setSubmitted(true);
      const storageNote =
        uploaded.storage === "blob"
          ? " Photos uploaded to cloud storage."
          : " Photos saved in this browser (connect Vercel Blob for cloud).";
      toast.success(`${toastCopy.submitSuccess}${storageNote}`);
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
            className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 bg-2nd-bg rounded-card border border-header-stroke text-body min-w-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress + step hierarchy */}
            <div className="flex items-end justify-between gap-3 mb-3">
              <p className="type-label text-primary">
                Step {step} of 3
              </p>
              <p className="type-caption font-medium text-secondary-text tabular-nums">
                {progress}% completed
              </p>
            </div>
            <div className="w-full bg-header-stroke h-1.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

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
                    className={inputClass}
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
                    className={textareaClass}
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
                    className={textareaClass}
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
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="pf-price" className="type-label text-secondary-text">
                    {type === "rent" ? "Monthly rent" : "Price"}
                  </label>
                  <input
                    id="pf-price"
                    type="text"
                    inputMode="decimal"
                    placeholder={
                      type === "rent" ? "e.g. 25,000" : "e.g. 1,25,00,000"
                    }
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <p className="type-label text-secondary-text mb-2">Select Tags</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {allTags.map((tag) => (
                      <button
                        key={tag.label}
                        type="button"
                        onClick={() => toggleTag(tag.label)}
                        className={`min-h-10 px-3 py-2 rounded-control border border-header-stroke type-caption transition touch-manipulation ${
                          formData.tags.includes(tag.label)
                            ? "bg-primary text-on-primary border-transparent"
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
                          className="min-h-10 px-3 py-2 rounded-control border border-header-stroke bg-main-bg text-secondary-text type-caption transition touch-manipulation"
                        >
                          {customTag} ×
                        </button>
                      ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
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
                        className={inputClass}
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
                      className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-primary text-on-primary rounded-control hover:brightness-110 min-h-11 touch-manipulation"
                      onClick={addCustomTag}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="type-label text-secondary-text">Main Image</p>
                    {formData.images[0] && (
                      <p className="type-caption text-body truncate max-w-[60%]">
                        {formData.images[0].name}
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "images")}
                    className={fileFieldClass}
                  />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="type-label text-secondary-text">
                      Gallery Images{" "}
                      <span className="text-primary">(Min {GALLERY_MIN})</span>
                    </p>
                    <p
                      className={`type-caption tabular-nums shrink-0 ${
                        formData.gallery.length >= GALLERY_MIN
                          ? "text-primary"
                          : "text-secondary-text"
                      }`}
                    >
                      {formData.gallery.length}/{GALLERY_MIN}
                    </p>
                  </div>
                  <p className="type-caption text-secondary-text">
                    Select multiple files at once, or add more in batches.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "gallery")}
                    className={fileFieldClass}
                  />
                  {formData.gallery.length > 0 && (
                    <ul className="mt-2 space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                      {formData.gallery.map((file, index) => (
                        <li
                          key={`${file.name}-${file.size}-${file.lastModified}`}
                          className="flex items-center justify-between gap-2 rounded-control border border-header-stroke bg-main-bg px-3 py-2"
                        >
                          <span className="type-caption text-body truncate min-w-0">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeGalleryFile(index)}
                            className="type-caption text-secondary-text hover:text-primary shrink-0 touch-manipulation"
                            aria-label={`Remove ${file.name}`}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="type-label text-secondary-text">
                      Floor Plans <span className="text-secondary-text/70">(optional)</span>
                    </p>
                    {formData.floorPlans.length > 0 && (
                      <p className="type-caption text-secondary-text tabular-nums">
                        {formData.floorPlans.length} file
                        {formData.floorPlans.length === 1 ? "" : "s"}
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "floorPlans")}
                    className={fileFieldClass}
                  />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="type-label text-secondary-text">
                      Video <span className="text-secondary-text/70">(optional)</span>
                    </p>
                    {formData.video && (
                      <p className="type-caption text-body truncate max-w-[60%]">
                        {formData.video.name}
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, "video")}
                    className={fileFieldClass}
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
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row gap-2 mb-3 min-w-0"
                    >
                      <input
                        type="text"
                        placeholder="Label"
                        value={spec.label}
                        onChange={(e) =>
                          updateSpecification(idx, "label", e.target.value)
                        }
                        className={`${inputClass} sm:flex-1`}
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecification(idx, "value", e.target.value)
                        }
                        className={`${inputClass} sm:flex-1`}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(idx)}
                        className="w-full sm:w-auto min-h-11 bg-primary text-on-primary px-4 rounded-control touch-manipulation shrink-0"
                        aria-label={`Remove specification ${idx + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="w-full sm:w-auto min-h-11 px-4 py-2 bg-primary text-on-primary rounded-control touch-manipulation"
                  >
                    Add Specification
                  </button>
                </div>

                {type === "rent" && (
                  <div className="space-y-4">
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
                        className={inputClass}
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
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-6 pt-4 border-t border-header-stroke">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full sm:w-auto min-h-11 px-5 py-2.5 bg-main-bg text-body border border-header-stroke rounded-control hover:border-primary/45 transition touch-manipulation"
                >
                  Previous
                </button>
              ) : (
                <span className="hidden sm:block" aria-hidden />
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto min-h-11 px-5 py-2.5 bg-primary text-on-primary rounded-control hover:brightness-110 transition sm:ml-auto touch-manipulation"
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  className={`w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-control transition sm:ml-auto touch-manipulation ${
                    submitting
                      ? "bg-main-bg text-secondary-text cursor-not-allowed border border-header-stroke"
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
            className="w-full max-w-md mx-auto p-6 sm:p-8 bg-2nd-bg border border-header-stroke rounded-card text-body text-center flex flex-col items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <span className="inline-flex size-14 items-center justify-center rounded-control border border-primary/40 bg-primary/15 text-primary mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <h2 className="type-subhead text-body">Listing received</h2>
            <p className="type-body text-secondary-text">
              Thank you — our team will review your property details shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyForm;
