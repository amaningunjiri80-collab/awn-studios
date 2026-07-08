"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Lightbox from "./Lightbox";
import { getLivePortfolio } from "@/lib/data";
import fallbackData from "@/data/portfolio.json";
import { getCategoryColor } from "@/lib/utils";

export default function PortfolioGrid() {
  const [items, setItems] = useState(fallbackData);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getLivePortfolio().then((live) => {
      if (live) setItems(live);
    });
  }, []);

  const featured = items.filter((item) => item.featured);
  const categories = [
    ...new Set(items.map((item) => item.category)),
  ];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#111]">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Featured Work
          </h2>
        </AnimatedSection>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/portfolio/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-white/10 text-[#A0A0A0] hover:text-white hover:border-white/30 transition-all duration-300"
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group cursor-pointer relative overflow-hidden ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className="image-zoom aspect-[3/4] sm:aspect-auto sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.title}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span
                    className={`inline-block px-3 py-1 text-xs tracking-wider uppercase mb-2 ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-light text-white">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                    <span>{item.location}</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors group"
          >
            <span>View All Work</span>
            <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all duration-300" />
          </Link>
        </AnimatedSection>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={featured.map((item) => ({
              url: item.image,
              title: item.title,
              category: item.category,
              description: item.description,
            }))}
            currentIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setCurrentIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
