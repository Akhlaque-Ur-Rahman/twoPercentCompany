// data/landData.ts
import {
  LucideIcon,
  Waves,
  Route,
  Zap,
  Fullscreen,
  Factory,
  Building2,
  ShieldCheck,
  Trees,
  LandPlot,
} from "lucide-react";

export interface LandItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  tags: {
    label: string;
    icon: LucideIcon;
  }[];
}

export const LandData: LandItem[] = [
  {
    id: 1,
    title: "Agricultural Land",
    description: "Spacious land ideal for farming and development.",
    image: "/images/plainland.png",
    price: "45,00,000",
    tags: [
      { label: "2 Acres", icon: LandPlot },
      { label: "Water Source", icon: Waves },
    ],
  },
  {
    id: 2,
    title: "Residential Plot",
    description: "Perfect location for your dream home construction.",
    image: "/images/plainland.png",
    price: "60,00,000",
    tags: [
      { label: "600 Sq. Yards", icon: LandPlot },
      { label: "Road Access", icon: Route },
    ],
  },
  {
    id: 3,
    title: "Commercial Land",
    description: "Prime spot suitable for commercial establishments.",
    image: "/images/plainland.png",
    price: "1,20,00,000",
    tags: [
      { label: "Highway Facing", icon: Route },
      { label: "500 Sq. Yards", icon: LandPlot },
    ],
  },
  {
    id: 4,
    title: "Industrial Plot",
    description: "Spacious plot for factory or warehouse setup.",
    image: "/images/plainland.png",
    price: "80,00,000",
    tags: [
      { label: "1000 Sq. Yards", icon: LandPlot },
      { label: "Electricity", icon: Zap },
      { label: "Factory Zone", icon: Factory },
    ],
  },
  {
    id: 5,
    title: "Farmhouse Land",
    description: "Peaceful location for your farmhouse getaway.",
    image: "/images/plainland.png",
    price: "70,00,000",
    tags: [
      { label: "1 Acre", icon: LandPlot },
      { label: "Scenic View", icon: Trees },
      { label: "Secure Property", icon: ShieldCheck },
    ],
  },
];
