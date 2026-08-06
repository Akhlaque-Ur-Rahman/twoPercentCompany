import L from "leaflet";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createPinIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 7.5 12.5 28.5 12.5 28.5S25 20 25 12.5C25 5.6 19.4 0 12.5 0z" fill="${color}" stroke="black"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white" stroke="black"/>
    </svg>
  `;

  return new L.DivIcon({
    html: `<div class="marker-icon group">
             <div class="transition-transform duration-200 group-hover:scale-100 group-[.active]:scale-100">
               <img src="data:image/svg+xml;base64,${btoa(svg)}" alt="" />
             </div>
           </div>`,
    className: "",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

/** Compact price chip pin for map discovery — width scales with label length */
export function createPriceIcon(
  priceLabel: string,
  color = "#8f7330"
): L.DivIcon {
  const label = escapeHtml(priceLabel);
  // ~7px per char + horizontal padding; clamp for hit area
  const width = Math.min(140, Math.max(56, Math.ceil(priceLabel.length * 7.2) + 20));
  const height = 28;
  return new L.DivIcon({
    html: `<div class="tpc-price-pin" style="
      display:inline-flex;align-items:center;justify-content:center;
      min-width:${width}px;height:${height}px;padding:4px 10px;box-sizing:border-box;
      border-radius:999px;background:${color};
      color:#111;font:600 11px/1 Urbanist,system-ui,sans-serif;
      white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.45);
      border:1px solid rgba(0,0,0,.35);transform:translateY(-4px);
    ">${label}</div>`,
    className: "tpc-price-pin-wrap",
    iconSize: [width, height],
    iconAnchor: [Math.round(width / 2), height],
    popupAnchor: [0, -height],
  });
}

export const PropertyIcon = createPinIcon("#8f7330");
export const PlotIcon = createPinIcon("green");
