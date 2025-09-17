import L from "leaflet";

// 🔹 Custom SVG Marker Generator with Hover/Active Support
const createMarkerIcon = (color: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 7.5 12.5 28.5 12.5 28.5S25 20 25 12.5C25 5.6 19.4 0 12.5 0z" fill="${color}" stroke="black"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white" stroke="black"/>
    </svg>
  `;

  return new L.DivIcon({
    html: `<div class="marker-icon group">
             <div class="transition-transform duration-200 group-hover:scale-100 group-[.active]:scale-100">
               <img src="data:image/svg+xml;base64,${btoa(svg)}" />
             </div>
           </div>`,
    className: "", // remove default Leaflet styles
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
};

// ✅ Property Icon (brand primary color)
export const PropertyIcon = createMarkerIcon("#8f7330");

// ✅ Plot Icon (green)
export const PlotIcon = createMarkerIcon("green");
