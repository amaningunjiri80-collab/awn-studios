"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";
import Lightbox from "./Lightbox";

interface PortfolioItem {
  id: number;
  url: string;
  alt_text?: string;
  category?: string;
}

export default function InstagramFeed() {
  const [images, setImages] = useState<PortfolioItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setImages(data.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection className="mb-10 flex items-center justify-between">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A96A] block mb-4">
              Instagram
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white">
              @awn_studios
            </h2>
          </div>
          <Link
            href="https://instagram.com/awn_studios"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Follow
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightboxIndex(i)}
              className="aspect-square bg-[#111] overflow-hidden group relative cursor-pointer"
            >
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${img.url})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              {img.category && (
                <span className="absolute bottom-2 left-2 text-[10px] tracking-wider uppercase text-white/0 group-hover:text-white/70 transition-all duration-300">
                  {img.category}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="https://instagram.com/awn_studios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Follow @awn_studios
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images.map((i) => i.url)}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
