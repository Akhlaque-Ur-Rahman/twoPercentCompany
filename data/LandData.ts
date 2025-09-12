// data/landData.ts
import { BedDouble } from "lucide-react"; // Example icon, replace with relevant ones

export interface LandItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  tags: {
    label: string;
    icon: any;
  }[];
}

export const landData: LandItem[] = [
  {
    id: 1,
    title: "Agricultural Land",
    description: "Spacious land ideal for farming and development.",
    image: "/images/land1.jpg",
    price: "45,00,000",
    tags: [
      { label: "2 Acres", icon: BedDouble },
      { label: "Water Source", icon: BedDouble },
    ],
  },
  {
    id: 2,
    title: "Residential Plot",
    description: "Perfect location for your dream home construction.",
    image: "/images/land2.jpg",
    price: "60,00,000",
    tags: [
      { label: "600 Sq. Yards", icon: BedDouble },
      { label: "Road Access", icon: BedDouble },
    ],
  },
  {
    id: 3,
    title: "Commercial Land",
    description: "Prime spot suitable for commercial establishments.",
    image: "/images/land3.jpg",
    price: "1,20,00,000",
    tags: [
      { label: "Highway Facing", icon: BedDouble },
      { label: "500 Sq. Yards", icon: BedDouble },
    ],
  },
  {
    id: 4,
    title: "Industrial Plot",
    description: "Spacious plot for factory or warehouse setup.",
    image: "/images/land4.jpg",
    price: "80,00,000",
    tags: [
      { label: "1000 Sq. Yards", icon: BedDouble },
      { label: "Electricity", icon: BedDouble },
    ],
  },
  {
    id: 5,
    title: "Farmhouse Land",
    description: "Peaceful location for your farmhouse getaway.",
    image: "/images/land5.jpg",
    price: "70,00,000",
    tags: [
      { label: "1 Acre", icon: BedDouble },
      { label: "Scenic View", icon: BedDouble },
    ],
  },
];
