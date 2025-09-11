// data/propertySliderData.ts
import { LucideIcon, BedDouble, Bath, Home } from "lucide-react";

export interface PropertyTag {
  icon: LucideIcon;
  label: string;
}

export interface PropertyItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  tags: PropertyTag[];
}

export const propertySliderData: PropertyItem[] = [
  {
    id: 1,
    title: "Seaside Serenity Villa",
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    image: "/images/seasidevilla.png",
    price: "1,250,000",
    tags: [
      { icon: BedDouble, label: "4-Bedroom" },
      { icon: Bath, label: "3-Bathroom" },
      { icon: Home, label: "Villa" },
    ],
  },
  {
    id: 2,
    title: "Mountain Retreat Cabin",
    description:
      "A cozy 2-bedroom cabin with breathtaking mountain views and modern amenities.",
    image: "/images/seasidevilla.png",
    price: "850,000",
    tags: [
      { icon: BedDouble, label: "2-Bedroom" },
      { icon: Bath, label: "2-Bathroom" },
      { icon: Home, label: "Cabin" },
    ],
  },
  {
    id: 3,
    title: "Urban Luxury Apartment",
    description:
      "A modern 3-bedroom apartment located in the heart of the city with skyline views.",
    image: "/images/seasidevilla.png",
    price: "980,000",
    tags: [
      { icon: BedDouble, label: "3-Bedroom" },
      { icon: Bath, label: "2-Bathroom" },
      { icon: Home, label: "Apartment" },
    ],
  },
  {
    id: 4,
    title: "Urban Luxury Apartment",
    description:
      "A modern 3-bedroom apartment located in the heart of the city with skyline views.",
    image: "/images/seasidevilla.png",
    price: "980,000",
    tags: [
      { icon: BedDouble, label: "3-Bedroom" },
      { icon: Bath, label: "2-Bathroom" },
      { icon: Home, label: "Apartment" },
    ],
  },
  {
    id: 5,
    title: "Urban Luxury Apartment",
    description:
      "A modern 3-bedroom apartment located in the heart of the city with skyline views.",
    image: "/images/seasidevilla.png",
    price: "980,000",
    tags: [
      { icon: BedDouble, label: "3-Bedroom" },
      { icon: Bath, label: "2-Bathroom" },
      { icon: Home, label: "Apartment" },
    ],
  },
  
];
