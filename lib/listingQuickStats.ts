import type { LucideIcon } from "lucide-react";
import {
  Bath,
  BedDouble,
  Building2,
  Calendar,
  Car,
  Maximize,
  Ruler,
  Trees,
} from "lucide-react";
import type { PropertyItem } from "@/data/PropertyData";

export type QuickStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

function findSpec(
  specs: PropertyItem["specifications"],
  ...labels: string[]
): string | undefined {
  if (!specs?.length) return undefined;
  const wanted = labels.map((l) => l.toLowerCase());
  return specs.find((s) => wanted.includes(s.label.toLowerCase()))?.value;
}

function findTag(item: PropertyItem, test: (label: string) => boolean): string | undefined {
  return item.tags.find((t) => test(t.label.toLowerCase()))?.label;
}

/** Build Houzez-style quick facts under the title strip. */
export function getQuickStats(item: PropertyItem): QuickStat[] {
  const stats: QuickStat[] = [];

  const typeLabel =
    findTag(item, (l) =>
      /apartment|villa|independent|studio|house|bungalow|flat/.test(l)
    ) ||
    findSpec(item.specifications, "Property Type", "Type") ||
    (item.type === "plot" ? "Plot" : "Property");

  stats.push({
    label: "Type",
    value: typeLabel,
    icon: item.type === "plot" ? Trees : Building2,
  });

  if (item.type === "property") {
    const beds =
      findTag(item, (l) => /\bbhk\b|\bbed/.test(l)) ||
      findSpec(item.specifications, "Bedroom", "Bedrooms", "Beds");
    if (beds) {
      stats.push({ label: "Beds", value: beds.replace(/bedroom(s)?/i, "").trim() || beds, icon: BedDouble });
    }

    const baths =
      findTag(item, (l) => /bath/.test(l)) ||
      findSpec(item.specifications, "Bathroom", "Bathrooms", "Baths");
    if (baths) {
      stats.push({
        label: "Baths",
        value: baths.replace(/bathroom(s)?/i, "").trim() || baths,
        icon: Bath,
      });
    }

    const parking =
      findTag(item, (l) => /park|garage|car/.test(l)) ||
      findSpec(item.specifications, "Parking", "Garage");
    if (parking) {
      stats.push({ label: "Parking", value: parking, icon: Car });
    }
  }

  const area = findSpec(
    item.specifications,
    "Carpet Area",
    "Built-up Area",
    "Super Area",
    "Plot Area",
    "Area"
  );
  if (area) {
    stats.push({
      label: item.type === "plot" ? "Plot size" : "Area",
      value: area,
      icon: item.type === "plot" ? Ruler : Maximize,
    });
  }

  const year =
    findSpec(item.specifications, "Year Built", "Age of Construction") ||
    findTag(item, (l) => /year|age/.test(l));
  if (year) {
    stats.push({ label: "Built / age", value: year, icon: Calendar });
  }

  return stats.slice(0, 6);
}
