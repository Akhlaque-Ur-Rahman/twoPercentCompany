import {
  Bath,
  BedDouble,
  Building2,
  Car,
  Landmark,
  LucideIcon,
  Sofa,
  Trees,
} from "lucide-react";

const LABEL_ICON_MAP: Record<string, LucideIcon> = {
  "1bhk": BedDouble,
  "2bhk": BedDouble,
  "3bhk": BedDouble,
  "4bhk": BedDouble,
  "5bhk": BedDouble,
  bathroom: Bath,
  bathrooms: Bath,
  apartment: Building2,
  studio: Building2,
  "independent house": Building2,
  "open space": Trees,
  backyard: Trees,
  "residential plot": Trees,
  "spacious area": Trees,
  "luxury housing": Trees,
  parking: Car,
  "easy access": Car,
  "accessible road": Car,
  "wide roads": Car,
  furnished: Sofa,
  "river view": Landmark,
  "city center": Landmark,
  "prime location": Landmark,
  "commercial use": Landmark,
};

export function iconForTagLabel(label: string): LucideIcon {
  const key = label.trim().toLowerCase();
  if (LABEL_ICON_MAP[key]) return LABEL_ICON_MAP[key];

  if (/\bbhk\b/.test(key)) return BedDouble;
  if (/bath/.test(key)) return Bath;
  if (/park|road|access/.test(key)) return Car;
  if (/plot|garden|green|tree|land|space/.test(key)) return Trees;
  if (/furnish|sofa/.test(key)) return Sofa;
  if (/view|location|center|commercial|landmark/.test(key)) return Landmark;

  return Building2;
}
