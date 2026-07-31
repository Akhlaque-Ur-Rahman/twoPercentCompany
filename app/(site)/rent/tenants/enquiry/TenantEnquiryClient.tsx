"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyItem } from "@/data/PropertyData";
import { toast } from "react-toastify";
import AppToast, { toastCopy } from "@/components/ui/AppToast";
import PageState from "@/components/ui/PageState";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  currentAddress: string;
  moveInDate: string;
  leaseDuration: string;
  numberOfTenants: number | "";
  monthlyBudget: number | "";
  occupation: string;
  references: string;
  message: string;
  idProof?: File | null;
  agreementType?: string;
}

type TenantEnquiryPageContentProps = {
  property?: PropertyItem;
};

const TenantEnquiryPageContent = ({
  property,
}: TenantEnquiryPageContentProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    currentAddress: "",
    moveInDate: "",
    leaseDuration: "",
    numberOfTenants: "",
    monthlyBudget: "",
    occupation: "",
    references: "",
    message: "",
    idProof: null,
    agreementType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "numberOfTenants" || name === "monthlyBudget") {
      setFormData({ ...formData, [name]: value ? Number(value) : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    const missingFields: string[] = [];

    if (step === 1) {
      if (!formData.fullName) missingFields.push("Full Name");
      if (!formData.phone) missingFields.push("Phone Number");
      if (!formData.email) missingFields.push("Email");
      if (!formData.currentAddress) missingFields.push("Current Address");
    } else if (step === 2) {
      if (!formData.moveInDate) missingFields.push("Preferred Move-in Date");
      if (!formData.leaseDuration) missingFields.push("Lease Duration");
      if (!formData.numberOfTenants) missingFields.push("Number of Tenants");
    } else if (step === 3) {
      if (!formData.monthlyBudget) missingFields.push("Monthly Budget");
    }

    if (missingFields.length > 0) {
      toast.error(
        `${toastCopy.requiredStep} (${missingFields.join(", ")})`
      );
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      toast.success(toastCopy.submitSuccess);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        currentAddress: "",
        moveInDate: "",
        leaseDuration: "",
        numberOfTenants: "",
        monthlyBudget: "",
        occupation: "",
        references: "",
        message: "",
        idProof: null,
        agreementType: "",
      });
      setStep(1);
    }
  };

  if (!property) {
    return (
      <PageState
        title="Property not found"
        description="That listing isn’t available for enquiry. Browse rentals and try again, or head home."
        primaryHref="/rent/tenants"
        primaryLabel="Browse Rentals"
        secondaryHref="/"
        secondaryLabel="Back to Home"
      />
    );
  }

  return (
    <>
      <div className="min-h-screen bg-main-bg text-body page-px section-y">
        <AppToast />
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Property Card */}
          <div className="w-full lg:w-1/2 bg-2nd-bg rounded-card p-6 flex flex-col gap-4">
            <div className="relative w-full h-[250px] lg:h-[300px] rounded-media overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover rounded-media"
              />
            </div>
            <h2 className="type-card-title text-body">{property.title}</h2>
            <div className="flex items-center type-caption gap-2 text-secondary-text">
              <MapPin className="w-5 h-5 text-secondary-text" />
              <span>{property.address}</span>
            </div>
            {property.description && (
              <p className="text-secondary-text type-body mt-2">{property.description}</p>
            )}
            <div className="flex justify-between items-center border-t border-header-stroke pt-3 mt-4">
              <p className="font-medium text-secondary-text type-caption">Price</p>
              <p className="text-body type-price">₹{property.price}</p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="w-full lg:w-1/2 bg-2nd-bg rounded-card p-6 border border-header-stroke">
            <h2 className="type-subhead text-body mb-2 text-center">
              Tenant Enquiry Form
            </h2>
            <div className="mb-4 type-body text-secondary-text font-medium text-center">
              Step {step} of 5
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {step === 1 && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-fullName" className="type-label text-secondary-text">Full name *</label>
                    <input
                      id="enq-fullName"
                      type="text"
                      name="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-phone" className="type-label text-secondary-text">Phone *</label>
                    <input
                      id="enq-phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-email" className="type-label text-secondary-text">Email *</label>
                    <input
                      id="enq-email"
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-address" className="type-label text-secondary-text">Current address *</label>
                    <input
                      id="enq-address"
                      type="text"
                      name="currentAddress"
                      placeholder="Current address"
                      value={formData.currentAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-moveIn" className="type-label text-secondary-text">Preferred move-in date *</label>
                    <input
                      id="enq-moveIn"
                      type="date"
                      name="moveInDate"
                      value={formData.moveInDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 relative w-full">
                    <label htmlFor="enq-lease" className="type-label text-secondary-text">Lease duration *</label>
                    <select
                      id="enq-lease"
                      name="leaseDuration"
                      value={formData.leaseDuration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary appearance-none pr-10"
                    >
                      <option value="">Select lease duration</option>
                      <option value="6 months">6 months</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                    </select>
                    <span className="absolute right-3 bottom-2.5 pointer-events-none text-primary" aria-hidden>▼</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-tenants" className="type-label text-secondary-text">Number of tenants *</label>
                    <input
                      id="enq-tenants"
                      type="number"
                      name="numberOfTenants"
                      placeholder="e.g. 2"
                      value={formData.numberOfTenants}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-budget" className="type-label text-secondary-text">Monthly budget *</label>
                    <input
                      id="enq-budget"
                      type="number"
                      name="monthlyBudget"
                      placeholder="Amount in ₹"
                      value={formData.monthlyBudget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-occupation" className="type-label text-secondary-text">Occupation / company</label>
                    <input
                      id="enq-occupation"
                      type="text"
                      name="occupation"
                      placeholder="Optional"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-references" className="type-label text-secondary-text">References / previous landlord</label>
                    <input
                      id="enq-references"
                      type="text"
                      name="references"
                      placeholder="Optional"
                      value={formData.references}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                </>
              )}
              {step === 4 && (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="enq-message" className="type-label text-secondary-text">Message / special requests</label>
                  <textarea
                    id="enq-message"
                    name="message"
                    placeholder="Anything we should know?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-control text-primary bg-main-bg border border-header-stroke placeholder:text-secondary-text focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary resize-none"
                    rows={4}
                  />
                </div>
              )}
              {step === 5 && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enq-idProof" className="type-label text-secondary-text">ID proof upload (optional)</label>
                    <input
                      id="enq-idProof"
                      type="file"
                      name="idProof"
                      onChange={handleChange}
                      className="w-full text-primary rounded-control border border-header-stroke px-4 py-2 focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <fieldset className="flex flex-col gap-2">
                    <legend className="type-label text-secondary-text">Agreement type preference (optional)</legend>
                    <div className="flex gap-4">
                      {["Furnished", "Unfurnished"].map((type) => (
                        <label
                          key={type}
                          className={`cursor-pointer px-4 py-2 rounded-control border min-h-11 inline-flex items-center justify-center ${
                            formData.agreementType === type
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-main-bg text-primary border-header-stroke"
                          } transition-colors duration-200`}
                        >
                          <input
                            type="radio"
                            name="agreementType"
                            value={type}
                            checked={formData.agreementType === type}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button type="button" onClick={handleBack} className="px-6 py-2 rounded-control bg-2nd-bg border-2 border-header-stroke text-primary hover:bg-main-bg transition">Back</button>
                )}
                {step < 5 && (
                  <button type="button" onClick={handleNext} className="px-6 py-2 rounded-control bg-primary text-on-primary hover:brightness-110 ml-auto">Next</button>
                )}
                {step === 5 && (
                  <button type="submit" className="px-6 py-2 rounded-control bg-primary text-on-primary hover:brightness-110 ml-auto">Submit</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TenantEnquiryClient({
  property,
}: TenantEnquiryPageContentProps) {
  return <TenantEnquiryPageContent property={property} />;
}
