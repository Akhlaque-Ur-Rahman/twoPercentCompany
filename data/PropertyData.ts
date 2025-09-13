// data/propertySliderData.ts
import {
  LucideIcon,
  BedDouble,
  Bath,
  Building2,
  Trees,
  Car,
  Mountain,
  Landmark,
  Sofa,
  Warehouse,
  FlameKindling,
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
    description:
      "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    image: "/images/seasidevilla.png",
    price: "1,250,000",
    tags: [
      { icon: BedDouble, label: "4-Bedroom" },
      { icon: Bath, label: "3-Bathroom" },
      { icon: Trees, label: "Garden" },
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
      { icon: Mountain, label: "Mountain View" },
      { icon: FlameKindling, label: "Fireplace" },
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
      { icon: Sofa, label: "Furnished" },
      { icon: Landmark, label: "City Center" },
    ],
  },
  {
    id: 4,
    title: "Countryside Family Home",
    description:
      "A spacious 5-bedroom countryside home with ample land and private garage.",
    image: "/images/seasidevilla.png",
    price: "1,500,000",
    tags: [
      { icon: BedDouble, label: "5-Bedroom" },
      { icon: Car, label: "Garage" },
      { icon: Trees, label: "Backyard" },
    ],
  },
  {
    id: 5,
    title: "Modern Loft Studio",
    description:
      "A stylish studio apartment with open layout, ideal for singles or young couples.",
    image: "/images/seasidevilla.png",
    price: "620,000",
    tags: [
      { icon: Sofa, label: "Open Layout" },
      { icon: Bath, label: "1-Bathroom" },
      { icon: Warehouse, label: "Loft Style" },
    ],
  },
];
