import { LatLngExpression } from "leaflet";

export interface Location {
  Id: number;
  Name: string;
  Address: string;
  Position: LatLngExpression;
  Image: string;
  Url: string;
}

export const Properties: Location[] = [
  {
    Id: 1,
    Name: "Sai Residency Apartment",
    Address: "Boring Road, Near Patliputra Colony, Patna, Bihar",
    Position: [25.6022, 85.1235],
    Image: "/images/seasidevilla.png",
    Url: "https://example.com/property-1",
  },
  {
    Id: 2,
    Name: "Green Valley Housing",
    Address: "Kankarbagh Main Road, Opp. Malahi Pakri, Patna, Bihar",
    Position: [25.5941, 85.1426],
    Image: "/images/seasidevilla.png",
    Url: "https://example.com/property-2",
  },
  {
    Id: 3,
    Name: "Ganga View Towers",
    Address: "Gulzarbagh, Near Ganga River, Patna, Bihar",
    Position: [25.6100, 85.1440],
    Image: "/images/seasidevilla.png",
    Url: "https://example.com/property-3",
  },
];

export const Plots: Location[] = [
  {
    Id: 101,
    Name: "Shivaji Enclave Plot",
    Address: "Near Bailey Road, Patna, Bihar",
    Position: [25.595, 85.12],
    Image: "/images/plainland.png",
    Url: "https://example.com/plot-1",
  },
  {
    Id: 102,
    Name: "Rajdhani Nagar Plot",
    Address: "Patliputra Industrial Area, Patna, Bihar",
    Position: [25.605, 85.135],
    Image: "/images/plainland.png",
    Url: "https://example.com/plot-2",
  },
];
