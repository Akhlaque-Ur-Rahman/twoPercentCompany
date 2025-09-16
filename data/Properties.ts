import { LatLngExpression } from "leaflet";

export interface Property {
  id: number;
  name: string;
  address: string;
  position: LatLngExpression;
  image: string;  // ✅ image URL
  url: string;    // ✅ hyperlink
}

export const Properties: Property[] = [
  {
    id: 1,
    name: "Sai Residency Apartment",
    address: "Boring Road, Near Patliputra Colony, Patna, Bihar",
    position: [25.6022, 85.1235],
    image: "/images/seasidevilla.png",
    url: "https://example.com/property-1",
  },
  {
    id: 2,
    name: "Green Valley Housing",
    address: "Kankarbagh Main Road, Opp. Malahi Pakri, Patna, Bihar",
    position: [25.5941, 85.1426],
    image: "/images/seasidevilla.png",
    url: "https://example.com/property-2",
  },
  {
    id: 3,
    name: "Ganga View Towers",
    address: "Gulzarbagh, Near Ganga River, Patna, Bihar",
    position: [25.6100, 85.1440],
    image: "/images/seasidevilla.png",
    url: "https://example.com/property-3",
  },
];
