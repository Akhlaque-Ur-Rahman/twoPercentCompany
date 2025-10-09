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

export interface HeroSlide {
  heading: string;
  description: string;
  imageMain: string;
  imageOverlay: string;
  buttons: HeroButton[];
  cards: HeroCard[];
}

export const HeroSectionSlides: HeroSlide[] = [
  {
    heading: "Discover Your Dream Property with Estatein",
    description:
      "Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.",
    imageMain: "/images/ImageMainDesktop.png",
    imageOverlay: "/images/AbstractDesign1.png",
    buttons: [
      { id: 1, label: "Learn More", type: "secondary", link: "/learn-more" },
      { id: 2, label: "Browse Properties", type: "primary", link: "/properties" },
    ],
    cards: [
      { id: 1, value: "200+", label: "Happy Customers" },
      { id: 2, value: "10k+", label: "Properties For Clients" },
      { id: 3, value: "16+", label: "Years of Experience" },
    ],
  },
  {
    heading: "Luxury Apartments for Modern Living",
    description:
      "Step into a world of sophistication and comfort. Discover high-end apartments designed to match your lifestyle.",
    imageMain: "/images/apartment2.png",
    imageOverlay: "/images/AbstractDesign1.png",
    buttons: [
      { id: 1, label: "See Apartments", type: "primary", link: "/apartments" },
      { id: 2, label: "Contact Us", type: "secondary", link: "/contact" },
    ],
    cards: [
      { id: 1, value: "150+", label: "Luxury Projects" },
      { id: 2, value: "500+", label: "Modern Homes" },
      { id: 3, value: "20+", label: "Cities Covered" },
    ],
  },
  {
    heading: "Invest Smart with Premium Plots",
    description:
      "Secure your future with our handpicked investment plots located in fast-growing urban zones.",
    imageMain: "/images/apartment3.png",
    imageOverlay: "/images/AbstractDesign1.png",
    buttons: [
      { id: 1, label: "View Plots", type: "primary", link: "/plots" },
      { id: 2, label: "Consult Now", type: "secondary", link: "/consult" },
    ],
    cards: [
      { id: 1, value: "80+", label: "Available Plots" },
      { id: 2, value: "30%", label: "Avg ROI Growth" },
      { id: 3, value: "100+", label: "Trusted Investors" },
    ],
  },
];
