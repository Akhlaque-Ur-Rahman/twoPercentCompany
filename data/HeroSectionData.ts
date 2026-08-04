export interface HeroCard {
  id: number;
  value: string;
  label: string;
}

export interface HeroTrustSignal {
  id: number;
  label: string;
  icon: "verified" | "experts" | "support";
}

export interface HeroSlide {
  eyebrow: string;
  heading: string;
  description: string;
  imageMain: string;
  trustSignals: HeroTrustSignal[];
}

export const HeroSectionSlide: HeroSlide = {
  eyebrow: "BUY · SELL · RENT IN PATNA",
  heading: "Discover your dream property in Patna",
  description:
    "Explore verified homes and investments matched to how you want to live — and grow.",
  imageMain: "/images/luxury-house.png",
  trustSignals: [
    { id: 1, label: "Verified Listings", icon: "verified" },
    { id: 2, label: "Local Experts", icon: "experts" },
    { id: 3, label: "Trusted Support", icon: "support" },
  ],
};

export const HeroStats: HeroCard[] = [
  { id: 1, value: "200+", label: "Happy Clients" },
  { id: 2, value: "10K+", label: "Properties Listed" },
  { id: 3, value: "16+", label: "Years Experience" },
];

export type HeroIntent = "buy" | "rent" | "sell";

export const heroLocationOptions = [
  { label: "Patna", value: "patna" },
  { label: "Danapur", value: "danapur" },
  { label: "Bailey Road", value: "bailey-road" },
  { label: "Kankarbagh", value: "kankarbagh" },
  { label: "Boring Road", value: "boring-road" },
];

export const heroPropertyTypeOptions = [
  { label: "All Properties", value: "all" },
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Independent House", value: "independent-house" },
  { label: "1BHK", value: "1bhk" },
  { label: "2BHK", value: "2bhk" },
  { label: "3BHK", value: "3bhk" },
  { label: "Plot", value: "plot" },
];

export const heroBudgetOptions = [
  { label: "Any Price", value: "any" },
  { label: "Below ₹50L", value: "below-50l" },
  { label: "₹50L – ₹1Cr", value: "50l-1cr" },
  { label: "Above ₹1Cr", value: "above-1cr" },
];

export const heroRentOptions = [
  { label: "Any Rent", value: "any" },
  { label: "Below ₹20K", value: "below20" },
  { label: "₹20K – ₹40K", value: "20to40" },
  { label: "Above ₹40K", value: "above40" },
];
