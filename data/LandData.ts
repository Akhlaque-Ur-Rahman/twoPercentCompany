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
  {
    id: 6,
    title: "Lakeside Plot",
    description: "Land near lake with tranquil surroundings and open space.",
    image: "/images/plainland.png",
    price: "90,00,000",
    tags: [
      { label: "3 Acres", icon: LandPlot },
      { label: "Water Access", icon: Waves },
      { label: "Scenic View", icon: Trees },
    ],
  },
  {
    id: 7,
    title: "Hilltop Residential Plot",
    description: "Elevated land ideal for villa or luxury homes.",
    image: "/images/plainland.png",
    price: "1,10,00,000",
    tags: [
      { label: "500 Sq. Yards", icon: LandPlot },
      { label: "Hilly Terrain", icon: Fullscreen },
    ],
  },
  {
    id: 8,
    title: "Industrial Estate Land",
    description: "Perfect for setting up a medium-scale industry or warehouse.",
    image: "/images/plainland.png",
    price: "1,50,00,000",
    tags: [
      { label: "2000 Sq. Yards", icon: LandPlot },
      { label: "Electricity", icon: Zap },
      { label: "Factory Zone", icon: Factory },
    ],
  },
  {
    id: 9,
    title: "Suburban Residential Plot",
    description: "Well-connected land for your family home with ample greenery.",
    image: "/images/plainland.png",
    price: "75,00,000",
    tags: [
      { label: "400 Sq. Yards", icon: LandPlot },
      { label: "Road Access", icon: Route },
      { label: "Open Space", icon: Trees },
    ],
  },
  {
    id: 10,
    title: "Luxury Estate Plot",
    description: "Prime land in a gated community with all amenities nearby.",
    image: "/images/plainland.png",
    price: "2,00,00,000",
    tags: [
      { label: "1 Acre", icon: LandPlot },
      { label: "Secure Property", icon: ShieldCheck },
      { label: "Landscaped Area", icon: Trees },
    ],
  },
  {
    id: 11,
    title: "Riverside Land",
    description: "Beautiful riverside property with fertile soil and open space.",
    image: "/images/plainland.png",
    price: "95,00,000",
    tags: [
      { label: "2 Acres", icon: LandPlot },
      { label: "Water Access", icon: Waves },
      { label: "Scenic View", icon: Trees },
    ],
  },
  {
    id: 12,
    title: "Urban Commercial Plot",
    description: "Centrally located land suitable for shops or offices.",
    image: "/images/plainland.png",
    price: "1,30,00,000",
    tags: [
      { label: "600 Sq. Yards", icon: LandPlot },
      { label: "Road Facing", icon: Route },
      { label: "Electricity", icon: Zap },
    ],
  },
];
