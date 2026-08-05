/**
 * Formats listing price strings for display.
 * Accepts CMS/static values like "1,25,00,000" or already-labeled strings.
 */
export function formatPrice(price: string): string {
  const raw = price.trim();
  if (!raw) return "Price on request";

  // Already has a currency / unit label — normalize spacing only
  if (/[₹Rs]|lakh|lac|cr|crore/i.test(raw)) {
    return raw.startsWith("₹") ? raw : raw.replace(/^(Rs\.?\s*)/i, "₹");
  }

  const digits = raw.replace(/,/g, "").replace(/\D/g, "");
  if (!digits) return raw;

  const n = Number(digits);
  if (!Number.isFinite(n) || n <= 0) return `₹${raw}`;

  if (n >= 1_00_00_000) {
    const cr = n / 1_00_00_000;
    const rounded = cr >= 10 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, "");
    return `₹${rounded} Cr`;
  }

  if (n >= 1_00_000) {
    const lac = n / 1_00_000;
    const rounded =
      lac >= 10 ? lac.toFixed(0) : lac.toFixed(2).replace(/\.?0+$/, "");
    return `₹${rounded} L`;
  }

  return `₹${n.toLocaleString("en-IN")}`;
}

/** Full Indian grouping for tooltips / detail pages. */
export function formatPriceExact(price: string): string {
  const raw = price.trim();
  if (!raw) return "Price on request";
  if (/[₹Rs]|lakh|lac|cr|crore/i.test(raw)) {
    return raw.startsWith("₹") ? raw : `₹${raw.replace(/^(Rs\.?\s*)/i, "")}`;
  }
  const digits = raw.replace(/,/g, "").replace(/\D/g, "");
  if (!digits) return `₹${raw}`;
  return `₹${Number(digits).toLocaleString("en-IN")}`;
}

/** Parse numeric price from display string. */
export function parsePriceDigits(price: string): number {
  return Number.parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
}

/** Extract sqft from specs or tag-like strings ("900 sqft", "1200 Sq Ft"). */
export function parseAreaSqFt(
  specifications?: { label: string; value: string }[] | null,
  fallbackText?: string
): number | null {
  const candidates: string[] = [];
  for (const spec of specifications ?? []) {
    if (/area|size|sq\.?\s*ft|sqft/i.test(spec.label)) {
      candidates.push(spec.value);
    }
    candidates.push(spec.value);
  }
  if (fallbackText) candidates.push(fallbackText);

  for (const text of candidates) {
    const m = text.match(/([\d,]+)\s*(?:sq\.?\s*ft|sqft|sq\s*feet)/i);
    if (m) {
      const n = Number.parseInt(m[1].replace(/,/g, ""), 10);
      if (n > 0) return n;
    }
  }
  return null;
}

/** ₹/sqft when both price and area are known. */
export function formatPricePerSqFt(
  price: string,
  specifications?: { label: string; value: string }[] | null
): string | null {
  const existing = specifications?.find((s) =>
    /price\s*per\s*sq/i.test(s.label)
  );
  if (existing?.value) {
    const v = existing.value.trim();
    return v.startsWith("₹") ? v : `₹${v.replace(/^Rs\.?\s*/i, "")}`;
  }

  const area = parseAreaSqFt(specifications);
  const total = parsePriceDigits(price);
  if (!area || !total) return null;
  const per = Math.round(total / area);
  return `₹${per.toLocaleString("en-IN")}/sq ft`;
}
