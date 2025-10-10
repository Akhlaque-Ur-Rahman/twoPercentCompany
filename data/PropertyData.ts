import { LatLngExpression } from "leaflet";
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

// Tag type (icon + label)
export interface PropertyTag {
  icon: LucideIcon;
  label: string;
}

// Main property/plot item type
export interface PropertyItem {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  address: string;
  position: LatLngExpression;
  image: string;
  gallery?: string[];
  video?: string; // ✅ Added optional video field
  price: string;
  tags: PropertyTag[];
  slug: string;
  type: "property" | "plot";
  url?: string;
}

// All data (Properties + Plots)
export const PropertyData: PropertyItem[] = [
  // 🏢 PROPERTIES
  {
    id: 1,
    title: "Sai Residency Apartment",
    description: "Premium 3BHK apartment with modern interiors in Patna.",
    longDescription:
      "Sai Residency Apartment offers a luxurious living experience in the heart of Patna. The 3BHK units come with spacious bedrooms, modern kitchens, and elegant living spaces. Residents enjoy amenities such as a gym, clubhouse, and 24/7 security. The apartment is strategically located near shopping centers, schools, and hospitals, making it ideal for families seeking comfort and convenience.",
    address: "Boring Road, Near Patliputra Colony, Patna, Bihar",
    position: [25.6022, 85.1235],
    image: "/images/seasidevilla.png",
    gallery: [
      "/images/seasidevilla.png",
      "/images/property2.webp",
      "/images/property3.webp",
      "/images/property4.webp",
      "/images/property5.webp",
      "/images/property6.webp",
    ],
    video: "/videos/property-sale.webm", // ✅ Added
    price: "1,25,00,000",
    tags: [
      { icon: BedDouble, label: "3BHK" },
      { icon: Bath, label: "2 Bathrooms" },
      { icon: Building2, label: "Apartment" },
    ],
    slug: "sai-residency-apartment",
    type: "property",
    url: "https://example.com/property-1",
  },
  {
    id: 2,
    title: "Green Valley Housing",
    description: "Cozy 2BHK independent house with scenic views in Patna.",
    longDescription:
      "Green Valley Housing is a serene 2BHK independent house perfect for small families. Surrounded by greenery and open spaces, it offers a peaceful retreat from the city bustle. The house includes modern fittings, ample parking space, and a small garden. It is located in a well-connected area of Patna with easy access to schools, markets, and main roads.",
    address: "Kankarbagh Main Road, Opp. Malahi Pakri, Patna, Bihar",
    position: [25.5941, 85.1426],
    image: "/images/seasidevilla.png",
    gallery: [
      "/images/seasidevilla.png",
      "/images/property2.webp",
      "/images/property3.webp",
      "/images/property4.webp",
      "/images/property5.webp",
      "/images/property6.webp",
    ],
    video: "/videos/property-sale.webm", // ✅ Added
    price: "85,00,000",
    tags: [
      { icon: BedDouble, label: "2BHK" },
      { icon: Trees, label: "Open Space" },
      { icon: Building2, label: "Independent House" },
    ],
    slug: "green-valley-housing",
    type: "property",
    url: "https://example.com/property-2",
  },
  {
    id: 3,
    title: "Ganga View Towers",
    description: "Luxury 4BHK apartment overlooking the Ganga river.",
    longDescription:
      "Ganga View Towers features premium 4BHK apartments with stunning views of the Ganga river. The apartments are fully furnished with modern interiors and high-quality materials. Amenities include a rooftop terrace, swimming pool, and secure parking. This property is perfect for those who want luxurious living with a scenic riverside environment and easy access to Patna’s main hubs.",
    address: "Gulzarbagh, Near Ganga River, Patna, Bihar",
    position: [25.61, 85.144],
    image: "/images/seasidevilla.png",
    gallery: [
      "/images/seasidevilla.png",
      "/images/property2.webp",
      "/images/property3.webp",
      "/images/property4.webp",
      "/images/property5.webp",
      "/images/property6.webp",
    ],
    video: "/videos/property-sale.webm", // ✅ Added
    price: "1,50,00,000",
    tags: [
      { icon: BedDouble, label: "4BHK" },
      { icon: Landmark, label: "River View" },
      { icon: Sofa, label: "Furnished" },
    ],
    slug: "ganga-view-towers",
    type: "property",
    url: "https://example.com/property-3",
  },
  {
    id: 4,
    title: "Urban Luxury Apartment",
    description: "Modern 3BHK apartment in the city center with skyline views.",
    address: "Fraser Road, Patna, Bihar",
    position: [25.609, 85.141],
    image: "/images/seasidevilla.png",
    gallery: ["/images/seasidevilla.png", "/images/seasidevilla5.png"],
    video: "/videos/property-sale.webm", // ✅ Added
    price: "98,00,000",
    tags: [
      { icon: BedDouble, label: "3BHK" },
      { icon: Sofa, label: "Furnished" },
      { icon: Landmark, label: "City Center" },
    ],
    slug: "urban-luxury-apartment",
    type: "property",
    url: "https://example.com/property-4",
  },
  {
    id: 5,
    title: "Countryside Family Home",
    description: "Spacious 5BHK countryside home with parking & garden.",
    address: "Danapur Road, Patna, Bihar",
    position: [25.585, 85.12],
    image: "/images/seasidevilla.png",
    gallery: ["/images/seasidevilla.png", "/images/seasidevilla6.png"],
    video: "/videos/property-sale.webm", // ✅ Added
    price: "1,50,00,000",
    tags: [
      { icon: BedDouble, label: "5BHK" },
      { icon: Car, label: "Parking" },
      { icon: Trees, label: "Backyard" },
    ],
    slug: "countryside-family-home",
    type: "property",
    url: "https://example.com/property-5",
  },
  {
    id: 6,
    title: "Compact 1BHK Studio",
    description: "Budget-friendly 1BHK studio apartment, ideal for singles.",
    address: "Rajendra Nagar, Patna, Bihar",
    position: [25.61, 85.13],
    image: "/images/seasidevilla.png",
    gallery: ["/images/seasidevilla.png", "/images/seasidevilla7.png"],
    video: "/videos/property-sale.webm", // ✅ Added
    price: "32,00,000",
    tags: [
      { icon: BedDouble, label: "1BHK" },
      { icon: Bath, label: "1 Bathroom" },
      { icon: Building2, label: "Studio" },
    ],
    slug: "compact-1bhk-studio",
    type: "property",
    url: "https://example.com/property-6",
  },

  // 🌳 PLOTS
  {
    id: 101,
    title: "Shivaji Enclave Plot",
    description: "Spacious residential plot in Shivaji Enclave, Patna.",
    longDescription:
      "Shivaji Enclave Plot offers a spacious residential area ideal for building your dream home. Strategically located near Bailey Road, it has excellent connectivity and access to amenities such as schools, markets, and hospitals.",
    address: "Near Bailey Road, Patna, Bihar",
    position: [25.595, 85.12],
    image: "/images/plainland.png",
    gallery: [
      "/images/plot2.webp",
      "/images/plot3.webp",
      "/images/plot4.webp",
      "/images/plot5.webp",
      "/images/plot6.webp",
    ],
    video: "/videos/property-sale2.webm", // ✅ Added
    price: "45,00,000",
    tags: [
      { icon: Trees, label: "Residential Plot" },
      { icon: Car, label: "Easy Access" },
    ],
    slug: "shivaji-enclave-plot",
    type: "plot",
    url: "https://example.com/plot-1",
  },
  {
    id: 102,
    title: "Rajdhani Nagar Plot",
    description: "Well-connected plot in Patliputra Industrial Area, Patna.",
    longDescription:
      "Rajdhani Nagar Plot is perfect for residential or small-scale commercial purposes. Located in Patliputra Industrial Area, it offers easy connectivity, ample space, and a prime location for investment.",
    address: "Patliputra Industrial Area, Patna, Bihar",
    position: [25.605, 85.135],
    image: "/images/plainland.png",
    gallery: [
      "/images/plot2.webp",
      "/images/plot3.webp",
      "/images/plot4.webp",
      "/images/plot5.webp",
      "/images/plot6.webp",
    ],
    video: "/videos/property-sale2.webm", // ✅ Added
    price: "55,00,000",
    tags: [
      { icon: Trees, label: "Residential Plot" },
      { icon: Landmark, label: "Prime Location" },
    ],
    slug: "rajdhani-nagar-plot",
    type: "plot",
    url: "https://example.com/plot-2",
  },
  {
    id: 103,
    title: "Gola Road Plot",
    description: "Affordable plot located near Gola Road, Patna.",
    longDescription:
      "Gola Road Plot provides an affordable option for building a home in a well-connected area of Patna. Close to main roads and local markets, it offers both convenience and value for money.",
    address: "Gola Road, Patna, Bihar",
    position: [25.61, 85.115],
    image: "/images/plainland.png",
    gallery: [
      "/images/plot2.webp",
      "/images/plot3.webp",
      "/images/plot4.webp",
      "/images/plot5.webp",
      "/images/plot6.webp",
    ],
    video: "/videos/property-sale2.webm", // ✅ Added
    price: "40,00,000",
    tags: [
      { icon: Trees, label: "Residential Plot" },
      { icon: Car, label: "Accessible Road" },
    ],
    slug: "gola-road-plot",
    type: "plot",
    url: "https://example.com/plot-3",
  },
  {
    id: 104,
    title: "Bailey Road Commercial Plot",
    description: "Prime commercial plot on Bailey Road, ideal for offices.",
    longDescription:
      "Bailey Road Commercial Plot is perfect for setting up offices or commercial establishments. Its prime location and ample space make it ideal for businesses looking to establish a presence in Patna.",
    address: "Bailey Road, Patna, Bihar",
    position: [25.597, 85.124],
    image: "/images/plainland.png",
    gallery: [
      "/images/plot2.webp",
      "/images/plot3.webp",
      "/images/plot4.webp",
      "/images/plot5.webp",
      "/images/plot6.webp",
    ],
    video: "/videos/property-sale2.webm", // ✅ Added
    price: "1,20,00,000",
    tags: [
      { icon: Landmark, label: "Commercial Use" },
      { icon: Trees, label: "Spacious Area" },
    ],
    slug: "bailey-road-commercial-plot",
    type: "plot",
    url: "https://example.com/plot-4",
  },
  {
    id: 105,
    title: "Patliputra Colony Plot",
    description: "Premium plot in Patliputra Colony for luxury housing.",
    longDescription:
      "Patliputra Colony Plot offers a premium location for building luxury homes. With wide roads, green surroundings, and a safe neighborhood, it provides an ideal environment for residential development.",
    address: "Patliputra Colony, Patna, Bihar",
    position: [25.604, 85.132],
    image: "/images/plainland.png",
    gallery: [
      "/images/plot2.webp",
      "/images/plot3.webp",
      "/images/plot4.webp",
      "/images/plot5.webp",
      "/images/plot6.webp",
    ],
    video: "/videos/property-sale2.webm", // ✅ Added
    price: "95,00,000",
    tags: [
      { icon: Trees, label: "Luxury Housing" },
      { icon: Car, label: "Wide Roads" },
    ],
    slug: "patliputra-colony-plot",
    type: "plot",
    url: "https://example.com/plot-5",
  },
];
