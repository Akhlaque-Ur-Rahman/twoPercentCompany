import { LatLngExpression } from "leaflet";

export type MarkerType = {
  id: number;
  title: string;
  slug: string; // added slug for routing
  position: LatLngExpression; // keeps Leaflet compatibility
  image?: string;
  address?: string;
  type?: "property" | "plot";
  url?: string; // optional URL
};
