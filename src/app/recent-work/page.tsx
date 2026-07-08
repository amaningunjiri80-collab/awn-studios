"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import { getLivePortfolio } from "@/lib/data";
import fallbackData from "@/data/portfolio.json";
import { getCategoryColor } from "@/lib/utils";

export default function RecentWorkPage() {
  const [items, setItems] = useState(fallbackData);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    getLivePortfolio().then((live) => {
      if (live) setItems(live);
    });
  }, []);

  const lightboxImages = items.map((item) => ({
    url: item.image,
    title: item.title,
    category: item.category,
    description: item.description,
  }));

  return (
    <div className="pt-28 pb-24 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Gallery
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white">
            Most Recent Work
          </h1>
          <p className="text-sm text-[#A0A0A0] mt-4 max-w-md mx-auto">
            The latest captures from AWN Archive
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="group cursor-pointer relative overflow-hidden bg-[#111] aspect-square"
              onClick={() => {
                setCurrentIndex(index);
                setLightboxOpen(true);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${item.image})`,
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                }}
                role="img"
                aria-label={item.title}
              />
              <div
                className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center p-4">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] tracking-wider uppercase mb-2 ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-sm font-light text-white leading-tight">
                    {item.title || "Untitled"}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-1 text-[10px] text-white/50">
                    {item.location && <span>{item.location}</span>}
                    {item.year && <span>{item.year}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-sm text-[#555] mt-12">
            No work uploaded yet.
          </p>
        )}

        <div className="text-center mt-16">
          <Link
            href="/portfolio"
            className="inline-block px-8 py-3 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white/5 transition-all"
          >
            View Full Portfolio
          </Link>
        </div>
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
