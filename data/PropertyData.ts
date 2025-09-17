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

  // Added 10 more cards
  {
    id: 6,
    title: "Lakeside Modern Villa",
    description: "A 4BHK villa with lake views and contemporary interiors.",
    image: "/images/seasidevilla.png",
    price: "1,35,00,000",
    tags: [
      { icon: BedDouble, label: "4BHK" },
      { icon: Bath, label: "4 Bathrooms" },
      { icon: Building2, label: "Villa" },
    ],
  },
  {
    id: 7,
    title: "City Edge Apartment",
    description: "2BHK apartment close to business district and public transport.",
    image: "/images/seasidevilla.png",
    price: "78,00,000",
    tags: [
      { icon: BedDouble, label: "2BHK" },
      { icon: Sofa, label: "Furnished" },
      { icon: Landmark, label: "City Center" },
    ],
  },
  {
    id: 8,
    title: "Suburban Family Home",
    description: "3BHK house with garden and spacious living areas.",
    image: "/images/seasidevilla.png",
    price: "90,00,000",
    tags: [
      { icon: BedDouble, label: "3BHK" },
      { icon: Car, label: "Parking" },
      { icon: Trees, label: "Backyard" },
    ],
  },
  {
    id: 9,
    title: "Penthouse Skyline Apartment",
    description: "Luxury 3BHK penthouse with panoramic city skyline views.",
    image: "/images/seasidevilla.png",
    price: "2,10,00,000",
    tags: [
      { icon: BedDouble, label: "3BHK" },
      { icon: Sofa, label: "Furnished" },
      { icon: Landmark, label: "City Center" },
    ],
  },
  {
    id: 10,
    title: "Rustic Countryside Cottage",
    description: "Charming 2BHK cottage surrounded by nature and greenery.",
    image: "/images/seasidevilla.png",
    price: "65,00,000",
    tags: [
      { icon: BedDouble, label: "2BHK" },
      { icon: Trees, label: "Open Space" },
      { icon: Bath, label: "2 Bathrooms" },
    ],
  },
];
