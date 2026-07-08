"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getLivePortfolio } from "@/lib/data";
import fallbackData from "@/data/portfolio.json";
import { getCategoryColor } from "@/lib/utils";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const [items, setItems] = useState(() =>
    fallbackData.filter(
      (item) => item.category.toLowerCase().replace(/\s+/g, "-") === category
    )
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getLivePortfolio().then((live) => {
      if (live) {
        setItems(
          live.filter(
            (item: { category: string }) =>
              item.category.toLowerCase().replace(/\s+/g, "-") === category
          )
        );
      }
    });
  }, [category]);

  const categoryName = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const aspectClasses = [
    "aspect-[4/5]",
    "aspect-[3/4]",
    "aspect-[1/1]",
    "aspect-[4/3]",
    "aspect-[3/2]",
    "aspect-[5/4]",
  ];

  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A0A0A0] hover:text-white transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            {items.length} Projects
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white capitalize">
            {categoryName}
          </h1>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer relative overflow-hidden break-inside-avoid"
              onClick={() => {
                setCurrentIndex(index);
                setLightboxOpen(true);
              }}
            >
              <div className={`image-zoom ${aspectClasses[index % aspectClasses.length]}`}>
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
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <>
            <div
              className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-sm"
              onClick={() => setLightboxOpen(false)}
            />
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Close gallery"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  aria-label="Previous image"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}

              {currentIndex < items.length - 1 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  aria-label="Next image"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}

              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-6xl max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="w-full flex-1 min-h-0 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${items[currentIndex].image})`,
                    height: "70vh",
                  }}
                  role="img"
                  aria-label={items[currentIndex].title}
                />

                <div className="flex items-center justify-between px-4 py-4 bg-black/60 backdrop-blur-sm">
                  <div>
                    <h3 className="text-sm font-light text-white">
                      {items[currentIndex].title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                      <span>{items[currentIndex].location}</span>
                      {items[currentIndex].year && (
                        <>
                          <span className="text-white/20">/</span>
                          <span>{items[currentIndex].year}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-white/40 whitespace-nowrap">
                    {currentIndex + 1} / {items.length}
                  </span>
                </div>

                <div className="flex gap-2 px-4 py-3 bg-black/40 overflow-x-auto">
                  {items.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                        idx === currentIndex
                          ? "border-[#C8A96A] opacity-100"
                          : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
