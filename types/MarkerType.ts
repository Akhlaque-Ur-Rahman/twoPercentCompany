import type { LatLngExpression } from "leaflet";

export type MarkerType = {
  id: number;
  title: string;
  slug: string;
  position: LatLngExpression;
  image?: string;
  address?: string;
  type?: "property" | "plot";
  /** Absolute or site-relative detail URL */
  url?: string;
  price?: string;
};
