import {
  LucideIcon,
  BedDouble,
  Bath,
  Building2,
  Trees,
  Car,
  Landmark,
  Sofa,
} from "lucide-react";

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

export const PropertyData: PropertyItem[] = [
  {
    id: 1,
    title: "Seaside Serenity Villa",
    description: "A premium 4BHK villa in a peaceful suburban neighborhood.",
    image: "/images/seasidevilla.png",
    price: "1,25,00,000",
    tags: [
      { icon: BedDouble, label: "4BHK" },
      { icon: Bath, label: "3 Bathrooms" },
      { icon: Building2, label: "Villa" },
    ],
  },
  {
    id: 2,
    title: "Mountain Retreat Home",
    description:
      "A cozy 2BHK independent house with scenic views and modern amenities.",
    image: "/images/seasidevilla.png",
    price: "85,00,000",
    tags: [
      { icon: BedDouble, label: "2BHK" },
      { icon: Building2, label: "Independent House" },
      { icon: Trees, label: "Open Space" },
    ],
  },
  {
    id: 3,
    title: "Urban Luxury Apartment",
    description:
      "A modern 3BHK apartment located in the heart of the city with skyline views.",
    image: "/images/seasidevilla.png",
    price: "98,00,000",
    tags: [
      { icon: BedDouble, label: "3BHK" },
      { icon: Sofa, label: "Furnished" },
      { icon: Landmark, label: "City Center" },
    ],
  },
  {
    id: 4,
    title: "Countryside Family Home",
    description:
      "A spacious 5BHK countryside home with ample land and private parking.",
    image: "/images/seasidevilla.png",
    price: "1,50,00,000",
    tags: [
      { icon: BedDouble, label: "5BHK" },
      { icon: Car, label: "Parking" },
      { icon: Trees, label: "Backyard" },
    ],
  },
  {
    id: 5,
    title: "Compact 1BHK Studio",
    description:
      "A budget-friendly 1BHK studio apartment, ideal for singles or couples.",
    image: "/images/seasidevilla.png",
    price: "32,00,000",
    tags: [
      { icon: BedDouble, label: "1BHK" },
      { icon: Bath, label: "1 Bathroom" },
      { icon: Building2, label: "Studio" },
    ],
  },
];
