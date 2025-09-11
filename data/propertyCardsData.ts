// /data/propertyCardsData.ts
export interface PropertyCard {
  id: number;
  title: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  type: string;
  price: number; // store numeric price and format in component
  image: string; // path under /public
}

export const propertyCardsData: PropertyCard[] = [
  {
    id: 1,
    title: "Seaside Serenity Villa",
    description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    bedrooms: "4-Bedroom",
    bathrooms: "3-Bathroom",
    type: "Villa",
    price: 1250000,
    image: "/images/property1.jpg",
  },
  {
    id: 2,
    title: "Seaside Serenity Villa",
    description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    bedrooms: "4-Bedroom",
    bathrooms: "3-Bathroom",
    type: "Villa",
    price: 1250000,
    image: "/images/property2.jpg",
  },
  {
    id: 3,
    title: "Seaside Serenity Villa",
    description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    bedrooms: "4-Bedroom",
    bathrooms: "3-Bathroom",
    type: "Villa",
    price: 1250000,
    image: "/images/property3.jpg",
  },
  {
    id: 4,
    title: "Seaside Serenity Villa",
    description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    bedrooms: "4-Bedroom",
    bathrooms: "3-Bathroom",
    type: "Villa",
    price: 1250000,
    image: "/images/property4.jpg",
  },
  {
    id: 5,
    title: "Seaside Serenity Villa",
    description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    bedrooms: "4-Bedroom",
    bathrooms: "3-Bathroom",
    type: "Villa",
    price: 1250000,
    image: "/images/property5.jpg",
  },
  {
    id: 6,
    title: "Seaside Serenity Villa",
    description: "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood.",
    bedrooms: "4-Bedroom",
    bathrooms: "3-Bathroom",
    type: "Villa",
    price: 1250000,
    image: "/images/property6.jpg",
  },
];
