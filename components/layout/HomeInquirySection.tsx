"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import SectionHeader from "@/components/ui/SectionHeader";
import { Input, Textarea } from "@/components/ui/Input";
import FilterSelect from "@/components/ui/FilterSelect";
import { submitLead } from "@/lib/submitLead";
import { toastCopy } from "@/components/ui/AppToast";

const INQUIRY_OPTIONS = [
  { value: "purchase", label: "Purchase" },
  { value: "rent", label: "Rent" },
  { value: "sell", label: "Sell" },
  { value: "valuation", label: "Valuation" },
];

const ROLE_OPTIONS = [
  { value: "buyer", label: "I'm a buyer / tenant" },
  { value: "owner", label: "I'm a property owner" },
  { value: "investor", label: "I'm an investor" },
];

export default function HomeInquirySection() {
  const [inquiryType, setInquiryType] = useState("purchase");
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !phone.trim() && !email.trim()) {
      toast.error(toastCopy.requiredSubmit);
      return;
    }
    setSubmitting(true);
    const intentLabel =
      INQUIRY_OPTIONS.find((o) => o.value === inquiryType)?.label ?? inquiryType;
    const roleLabel =
      ROLE_OPTIONS.find((o) => o.value === role)?.label ?? role;
    const result = await submitLead({
      type: "home_inquiry",
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      message:
        message.trim() ||
        `Homepage inquiry — ${intentLabel}. ${roleLabel}.`,
      inquiryType,
      role,
      source: "homepage",
    });
    setSubmitting(false);
    if (result.ok) {
      toast.success(toastCopy.submitSuccess);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } else {
      toast.error(result.error || toastCopy.submitError);
    }
  };

  return (
    <section className="page-px section-y border-b border-header-stroke bg-2nd-bg/30">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-2">
          <p className="type-label text-primary">Talk to us</p>
          <SectionHeader
            title="Real estate inquiry"
            description="Tell us what you need — purchase, rent, sell, or a quick valuation. We’ll follow up from Patna."
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          noValidate
        >
          <FilterSelect
            label="Inquiry type"
            value={inquiryType}
            onChange={setInquiryType}
            options={INQUIRY_OPTIONS}
          />
          <FilterSelect
            label="I am"
            value={role}
            onChange={setRole}
            options={ROLE_OPTIONS}
          />
          <Input
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="WhatsApp number"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="Optional"
            wrapperClassName="sm:col-span-2"
          />
          <Textarea
            label="Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Locality, budget, or timing — whatever helps."
            rows={3}
            wrapperClassName="sm:col-span-2"
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="min-h-12 px-6 inline-flex items-center justify-center rounded-control bg-primary text-on-primary type-body font-semibold hover:brightness-110 transition disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
