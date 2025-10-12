"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyForm from "@/components/PropertyForm";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

const RentPage: React.FC = () => {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [nestedDrawer, setNestedDrawer] = useState(false);

  const handleOpenDrawer = () => setMobileDrawer(true);
  const handleCloseDrawer = () => {
    setMobileDrawer(false);
    setNestedDrawer(false);
  };
  const handleOpenNestedDrawer = () => setNestedDrawer(true);
  const handleCloseNestedDrawer = () => setNestedDrawer(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Rent a Property</h1>
        <p className="mb-6 text-center text-gray-600">
          Submit your property details to list it for rent or find tenants.
        </p>

        {/* Desktop dropdown */}
        <div className="hidden md:block mb-6">
          <PropertyForm type="rent" />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden mb-6 text-center">
          <button
            onClick={handleOpenDrawer}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Open Rent Form
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileDrawer && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-lg z-50 p-4 overflow-y-auto"
            >
              {!nestedDrawer && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Rent Options</h2>
                  <button
                    onClick={handleOpenNestedDrawer}
                    className="w-full text-left px-4 py-2 border-b"
                  >
                    Tenant / Landlord Form
                  </button>
                  <button
                    onClick={handleCloseDrawer}
                    className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              )}

              {/* Nested Drawer */}
              <AnimatePresence>
                {nestedDrawer && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 w-full h-full bg-white p-4"
                  >
                    <div className="flex items-center mb-4">
                      <button
                        onClick={handleCloseNestedDrawer}
                        className="mr-2 p-2 rounded hover:bg-gray-200"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <h2 className="text-xl font-semibold">Property Form</h2>
                    </div>
                    <PropertyForm type="rent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RentPage;
