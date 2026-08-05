export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export const FaqData: FaqItem[] = [
  {
    id: "1",
    question: "How does 2% Company help buyers in Patna?",
    answer:
      "We shortlist verified homes and plots, arrange visits, clarify pricing and paperwork, and stay with you through negotiation and handover.",
    category: "buying",
    order: 1,
  },
  {
    id: "2",
    question: "What do I need to sell my property with you?",
    answer:
      "Share basic property details, photos if you have them, expected price, and ownership documents. We guide you on listing, pricing, and buyer conversations.",
    category: "selling",
    order: 2,
  },
  {
    id: "3",
    question: "Do you help with rentals for tenants and landlords?",
    answer:
      "Yes. Tenants can browse rentals and enquire. Landlords can list with us for tenant reach and listing support.",
    category: "renting",
    order: 3,
  },
  {
    id: "4",
    question: "Are plot titles verified?",
    answer:
      "We prioritise clear-title listings and help you understand what to check before you commit. Always complete independent legal diligence before purchase.",
    category: "plots",
    order: 4,
  },
  {
    id: "5",
    question: "How do I get in touch quickly?",
    answer:
      "Call or WhatsApp +91 99559 96464, or use the Contact form. We typically respond the same day during business hours.",
    category: "general",
    order: 5,
  },
];
