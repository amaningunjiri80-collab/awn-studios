"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import { getLivePortfolio } from "@/lib/data";
import fallbackData from "@/data/portfolio.json";
import { getCategoryColor } from "@/lib/utils";

export default function PortfolioPage() {
  const [items, setItems] = useState(fallbackData);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getLivePortfolio().then((live) => {
      if (live) setItems(live);
    });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const lightboxImages = filtered.map((item) => ({
    url: item.image,
    title: item.title,
    category: item.category,
    description: item.description,
  }));

  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white">
            My Work
          </h1>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-300 ${
                activeCategory === category
                  ? "border-white text-white bg-white/5"
                  : "border-white/10 text-[#A0A0A0] hover:text-white hover:border-white/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="group cursor-pointer relative overflow-hidden"
              onClick={() => {
                const globalIndex = filtered.indexOf(item);
                setCurrentIndex(globalIndex);
                setLightboxOpen(true);
              }}
            >
              <div className="image-zoom aspect-[4/5]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.title}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span
                    className={`inline-block px-3 py-1 text-xs tracking-wider uppercase mb-2 ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-base font-light text-white">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-white/50">
                    <span>{item.location}</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            currentIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setCurrentIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
