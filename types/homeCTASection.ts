// types/homeCTASection.ts
import { LucideIcon } from "lucide-react";

export interface HomeCTASectionItem {
  id: number;
  title: string;
  icon: string; // path to SVG
  arrow: LucideIcon;
}
