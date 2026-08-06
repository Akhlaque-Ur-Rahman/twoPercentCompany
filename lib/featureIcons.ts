import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Camera,
  Car,
  Check,
  Droplets,
  Fence,
  Flame,
  KeyRound,
  Leaf,
  Shield,
  Trees,
  Waves,
  Wifi,
  Zap,
} from "lucide-react";

const FEATURE_ICON_MAP: Record<string, LucideIcon> = {
  security: Shield,
  "24/7 security": Shield,
  cctv: Camera,
  parking: Car,
  "covered parking": Car,
  lift: Building2,
  elevator: Building2,
  "power backup": Zap,
  backup: Zap,
  "water supply": Droplets,
  water: Droplets,
  park: Trees,
  garden: Trees,
  clubhouse: Building2,
  gym: Flame,
  pool: Waves,
  wifi: Wifi,
  "clear title support": KeyRound,
  "road access": Car,
  "electricity nearby": Zap,
  "gated / boundary ready": Fence,
  "gated area": Fence,
  "corner option": Leaf,
  "investment fit": Leaf,
};

export function iconForFeatureLabel(label: string): LucideIcon {
  const key = label.trim().toLowerCase();
  if (FEATURE_ICON_MAP[key]) return FEATURE_ICON_MAP[key];

  if (/secur|cctv|guard/.test(key)) return Shield;
  if (/park|car|garage/.test(key)) return Car;
  if (/power|electr|backup|zap/.test(key)) return Zap;
  if (/water|plumb/.test(key)) return Droplets;
  if (/garden|park|tree|green/.test(key)) return Trees;
  if (/pool|swim/.test(key)) return Waves;
  if (/wifi|internet/.test(key)) return Wifi;
  if (/gate|fence|boundary/.test(key)) return Fence;
  if (/title|key|docs/.test(key)) return KeyRound;
  if (/gym|club|lift|elev/.test(key)) return Building2;

  return Check;
}
