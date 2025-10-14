"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

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

const TenantEnquiryPageContent = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("property") ?? "";

  const property: PropertyItem | undefined = useMemo(
    () => PropertyData.find((p) => p.slug === slug),
    [slug]
  );

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
        `Please fill required fields: ${missingFields.join(", ")}`,
        { position: "top-right", autoClose: 4000 }
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
      console.log("Form Submitted:", formData, "Property:", property?.title);
      toast.success("Enquiry submitted successfully!", {
        position: "top-right",
        autoClose: 4000,
      });
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
      <div className="min-h-screen flex items-center justify-center text-white bg-main-bg">
        Property not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-main-bg text-white px-6 py-12 lg:px-24">
        <ToastContainer />
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Property Card */}
          <div className="w-full lg:w-1/2 bg-2nd-bg rounded-xl p-6 flex flex-col gap-4">
            <div className="relative w-full h-[250px] lg:h-[300px] rounded-lg overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold text-primary">{property.title}</h2>
            <div className="flex items-center text-sm gap-2 text-secondary-text">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{property.address}</span>
            </div>
            {property.description && (
              <p className="text-secondary-text text-md mt-2">{property.description}</p>
            )}
            <div className="flex justify-between items-center bg-2nd-bg rounded-lg shadow-sm border border-header-stroke px-4 py-3 mt-4">
              <p className="font-medium text-secondary-text text-xl">Price</p>
              <p className="text-primary font-bold text-xl">₹{property.price}</p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="w-full lg:w-1/2 bg-2nd-bg rounded-xl p-6">
            <h2 className="text-[30px] font-bold text-primary mb-2 text-center">
              Tenant Enquiry Form
            </h2>
            <div className="mb-4 text-[16px] text-secondary-text font-medium text-center">
              Step {step} of 5
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {step === 1 && (
                <>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none"
                  />
                  <input
                    type="text"
                    name="currentAddress"
                    placeholder="Current Address"
                    value={formData.currentAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <label className="text-secondary-text text-sm">Preferred Move-in Date</label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none"
                  />
                  <div className="relative w-full">
                    <select
                      name="leaseDuration"
                      value={formData.leaseDuration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none appearance-none pr-10"
                    >
                      <option value="">Select Lease Duration</option>
                      <option value="6 months">6 months</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                    </select>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary">▼</span>
                  </div>
                  <input
                    type="number"
                    name="numberOfTenants"
                    placeholder="Number of Tenants"
                    value={formData.numberOfTenants}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                </>
              )}
              {step === 3 && (
                <>
                  <input
                    type="number"
                    name="monthlyBudget"
                    placeholder="Monthly Budget"
                    value={formData.monthlyBudget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                  />
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation / Company Name (Optional)"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none"
                  />
                  <input
                    type="text"
                    name="references"
                    placeholder="References / Previous Landlord (Optional)"
                    value={formData.references}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none"
                  />
                </>
              )}
              {step === 4 && (
                <textarea
                  name="message"
                  placeholder="Message / Special Requests"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg text-primary bg-main-bg border border-header-stroke focus:outline-none resize-none"
                  rows={4}
                />
              )}
              {step === 5 && (
                <>
                  <label className="text-secondary-text text-sm mb-2">ID Proof Upload (Optional)</label>
                  <input
                    type="file"
                    name="idProof"
                    onChange={handleChange}
                    className="w-full text-primary outline-1 rounded-[8px] px-4 py-2"
                  />
                  <label className="text-secondary-text text-sm mt-2 mb-1">Agreement Type Preference (Optional)</label>
                  <div className="flex gap-4">
                    {["Furnished", "Unfurnished"].map((type) => (
                      <label
                        key={type}
                        className={`cursor-pointer px-4 py-2 rounded-lg border ${
                          formData.agreementType === type
                            ? "bg-primary text-white border-primary"
                            : "bg-main-bg text-primary border-header-stroke"
                        } transition-colors duration-200 flex items-center justify-center gap-2`}
                      >
                        <input
                          type="radio"
                          name="agreementType"
                          value={type}
                          checked={formData.agreementType === type}
                          onChange={handleChange}
                          className="hidden"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </>
              )}

              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button type="button" onClick={handleBack} className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-500">Back</button>
                )}
                {step < 5 && (
                  <button type="button" onClick={handleNext} className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 ml-auto">Next</button>
                )}
                {step === 5 && (
                  <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 ml-auto">Submit</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Wrap in Suspense to fix build error
export default function TenantEnquiryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white bg-main-bg">Loading...</div>}>
      <TenantEnquiryPageContent />
    </Suspense>
  );
}
