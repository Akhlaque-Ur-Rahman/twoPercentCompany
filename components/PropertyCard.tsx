"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: number;
    slug: string;
    title: string;
    description: string;
    address: string;
    price: string;
    type: string;
    image: string;
    tags: { label: string; icon: React.ElementType }[];
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="card p-[24px] gap-[16px] flex flex-col justify-between rounded-[24px] border-2 border-header-stroke bg-2nd-bg transition-all duration-300 hover:border-primary/40"
    >
      {/* Image */}
      <div className="w-full flex justify-center items-center bg-cover">
        <Image
          src={property.image}
          height={240}
          width={394}
          alt={`${property.title} in ${property.address}`}
          className="rounded-[16px] w-full object-cover"
        />
      </div>

      {/* Title + Desc */}
      <div className="w-full">
        <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-primary">
          {property.title}
        </h2>
        <p className="text-secondary-text text-[clamp(14px,1.6vw,16px)] mt-1">
          {property.description}
        </p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-secondary-text text-[14px]">
        <MapPin width={16} height={16} className="text-primary" />
        <span>{property.address}</span>
      </div>

      {/* Tags */}
      <div className="card-category-tags w-full flex flex-wrap items-center gap-[12px]">
        {property.tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 px-4 py-2 rounded-full text-[clamp(13px,1.4vw,16px)] font-medium"
          >
            <tag.icon width={20} height={20} />
            <p className="font-semibold text-[clamp(13px,1.5vw,16px)]">
              {tag.label}
            </p>
          </div>
        ))}
      </div>

      {/* Price + Button */}
      <div className="price-btn-container py-[8px] flex sm:flex-row sm:items-center justify-between gap-3">
        <div className="price-box flex items-center sm:items-start flex-col gap-[6px]">
          <p className="text-secondary-text font-semibold text-[clamp(13px,1.5vw,15px)]">
            Price
          </p>
          <p className="font-semibold text-[clamp(18px,2vw,24px)] text-primary">
            ₹{property.price}
          </p>
        </div>
        <Link
          href={`/properties/${property.slug}`}
          className="w-full flex justify-center items-center sm:w-auto px-[clamp(16px,2vw,24px)] py-[clamp(10px,1.5vw,12px)] rounded-[16px] bg-primary font-semibold text-[clamp(14px,1.6vw,16px)] text-center"
        >
          View Property Details
        </Link>
      </div>
    </motion.article>
  );
};

export default PropertyCard;
