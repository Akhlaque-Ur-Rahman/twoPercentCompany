"use client";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import { Properties, Plots } from "@/data/Properties";
import Link from "next/link";
import { PropertyIcon, PlotIcon } from "@/utils/MapIcons";

const PatnaMap: React.FC = () => {
  return (
    <div className="relative px-6 sm:px-6 lg:px-[40px] py-6 space-y-[24px] rounded-[16px] border-b-2 border-header-stroke mb-6">
      {/* Top Icon */}
      <div>
        <Image
          src="/svg/Stars.svg"
          height={0}
          width={0}
          alt="Map Icon"
          className="size-[40px] sm:size-[48px] lg:size-[56px]"
        />
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-[20px] sm:text-[22px] lg:text-[40px] font-semibold">
          Explore Our Locations
        </h2>
        <p className="text-secondary-text text-[14px] sm:text-[15px] lg:text-[16px] mt-2">
          Find our properties and plots across the city on the map.
        </p>
      </div>

      {/* Map Section */}
      <div className="w-full rounded-[16px] overflow-hidden border-2 border-header-stroke shadow-md">
        <MapContainer
          center={[25.5941, 85.1376]}
          zoom={13}
          className="h-[400px] sm:h-[450px] lg:h-[500px] w-full"
          scrollWheelZoom
          attributionControl={false}
        >
          {/* Dark base map */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Properties Markers */}
          {Properties.map((property) => (
            <Marker
              key={property.Id}
              position={property.Position}
              icon={PropertyIcon}
            >
              <Popup>
                <div className="bg-main-bg text-gray-200 rounded-lg shadow-lg px-3 pt-6 pb-3 w-[220px] flex flex-col justify-between items-center">
                  <Image
                    src={property.Image}
                    alt={property.Name}
                    width={180}
                    height={110}
                    className="w-[180px] h-[110px] object-cover rounded-md mb-2"
                  />
                  <h3 className="font-semibold text-sm text-white">
                    {property.Name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {property.Address}
                  </p>
                  <Link
                    href={property.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block underline text-xs py-1"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Plots Markers */}
          {Plots.map((plot) => (
            <Marker
              key={plot.Id}
              position={plot.Position}
              icon={PlotIcon}
            >
              <Popup>
                <div className="bg-main-bg text-gray-200 rounded-lg shadow-lg px-3 pt-6 pb-3 w-[220px] flex flex-col justify-between items-center">
                  <Image
                    src={plot.Image}
                    alt={plot.Name}
                    width={180}
                    height={110}
                    className="w-[180px] h-[110px] object-cover rounded-md mb-2"
                  />
                  <h3 className="font-semibold text-sm text-white">
                    {plot.Name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {plot.Address}
                  </p>
                  <Link
                    href={plot.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block underline text-xs py-1"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PatnaMap;
