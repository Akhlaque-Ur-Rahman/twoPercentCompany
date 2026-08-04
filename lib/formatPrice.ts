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
