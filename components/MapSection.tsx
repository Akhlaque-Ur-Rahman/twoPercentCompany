"use client";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import { Properties } from "@/data/Properties";
import Link from "next/link";

// ✅ Fix default marker icons for Leaflet in Next.js
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const PatnaMap: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-[40px] py-6">
      <MapContainer
        center={[25.5941, 85.1376]} // Patna center
        zoom={13}
        className="h-[500px] w-full rounded-xl shadow-md"
        scrollWheelZoom
        attributionControl={false}
      >
        {/* ✅ OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ Dynamic property markers */}
        {Properties.map((prop) => (
          <Marker key={prop.id} position={prop.position}>
            <Popup className="custom-popup">
              <div className="text-center w-[200px]">
                <Image
  src={prop.image}
  alt={prop.name}
  width={180}
  height={110}
  className="w-[180px] h-[110px] object-cover rounded-md shadow-md mx-auto mb-2"
/>
                <h3 className="font-semibold text-sm text-gray-800">
                  {prop.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{prop.address}</p>
                <Link
                  href={prop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1   text-xs font-medium rounded-md shadow-sm transition"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PatnaMap;
