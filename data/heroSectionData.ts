// /data/heroSectionData.ts
export interface HeroCard {
  id: number;
  value: string;
  label: string;
}

export interface HeroButton {
  id: number;
  label: string;
  type: "primary" | "secondary";
  link: string;
}

export interface HeroSectionData {
  heading: string;
  description: string;
  imageMain: string;
  imageOverlay: string;
  buttons: HeroButton[];
  cards: HeroCard[];
}

export const HeroSectionData: HeroSectionData = {
  heading: "Discover Your Dream Property with Estatein",
  description:
    "Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.",
  imageMain: "/images/ImageMainDesktop.png",
  imageOverlay: "/images/AbstractDesign1.png",
  buttons: [
    {
      id: 1,
      label: "Learn More",
      type: "secondary",
      link: "/learn-more",
    },
    {
      id: 2,
      label: "Browse Properties",
      type: "primary",
      link: "/browse",
    },
  ],
  cards: [
    {
      id: 1,
      value: "200+",
      label: "Happy Customers",
    },
    {
      id: 2,
      value: "10k+",
      label: "Properties For Clients",
    },
    {
      id: 3,
      value: "16+",
      label: "Years of Experience",
    },
  ],
};
