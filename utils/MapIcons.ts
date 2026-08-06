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

export const PROPERTY_PIN_COLOR = "#8f7330";
export const PLOT_PIN_COLOR = "#2f6b3c";

/** Compact price chip pin for map discovery — width scales with label length */
export function createPriceIcon(
  priceLabel: string,
  color = PROPERTY_PIN_COLOR
): L.DivIcon {
  const label = escapeHtml(priceLabel);
  const width = Math.min(148, Math.max(58, Math.ceil(priceLabel.length * 7.4) + 22));
  const chipH = 30;
  const tipH = 8;
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
