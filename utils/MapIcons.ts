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
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36" fill="none">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 9.5 14 22 14 22s14-12.5 14-22C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="5.5" fill="#0a0a0a" fill-opacity="0.22"/>
      <circle cx="14" cy="14" r="3.25" fill="#fff"/>
    </svg>
  `;

  return new L.DivIcon({
    html: `<div class="marker-icon group">
             <div class="transition-transform duration-200 group-hover:scale-110 group-[.active]:scale-110">
               <img src="data:image/svg+xml;base64,${btoa(svg)}" alt="" />
             </div>
           </div>`,
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -32],
  });
}

/** Brand gold — keep in sync with --color-map-property / --color-primary */
export const PROPERTY_PIN_COLOR = "#8f7330";
/** Plot accent — keep in sync with --color-map-plot / --color-success */
export const PLOT_PIN_COLOR = "#1f9d6a";

/** Compact price chip pin for map discovery — width scales with label length */
export function createPriceIcon(
  priceLabel: string,
  color = PROPERTY_PIN_COLOR
): L.DivIcon {
  const label = escapeHtml(priceLabel);
  const width = Math.min(156, Math.max(64, Math.ceil(priceLabel.length * 7.6) + 28));
  const chipH = 32;
  const tipH = 7;
  const totalH = chipH + tipH;

  return new L.DivIcon({
    html: `<div class="tpc-price-pin" style="--pin-color:${color};width:${width}px">
      <span class="tpc-price-pin__chip">${label}</span>
      <span class="tpc-price-pin__tip" aria-hidden="true"></span>
    </div>`,
    className: "tpc-price-pin-wrap",
    iconSize: [width, totalH],
    iconAnchor: [Math.round(width / 2), totalH],
    popupAnchor: [0, -(totalH - 2)],
  });
}

export const PropertyIcon = createPinIcon(PROPERTY_PIN_COLOR);
export const PlotIcon = createPinIcon(PLOT_PIN_COLOR);
