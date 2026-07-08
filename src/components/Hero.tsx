"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const defaultSlides = [
  { url: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=1920&q=85", alt: "Cinematic sports photography" },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=85", alt: "Music event photography" },
  { url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85", alt: "Fashion editorial photography" },
  { url: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1920&q=85", alt: "Brand campaign photography" },
];

export default function Hero() {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("/api/site-settings").then(async (res) => {
      if (!res.ok) return;
      const settings = await res.json();
      if (settings?.hero_images?.length > 0) {
        setSlides(settings.hero_images.map((url: string) => ({ url, alt: "Hero image" })));
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.url})` }}
            role="img"
            aria-label={slide.alt}
          />
        </div>
      ))}

      <div className="absolute inset-0 hero-gradient" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 mb-6 block">
            AWN Archive
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none text-white max-w-5xl"
        >
          Every Frame
          <br />
          <span className="text-white/80">Has A Story.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 text-base md:text-lg text-white/60 max-w-2xl leading-relaxed font-light"
        >
          Photography built around emotion, movement, and moments that deserve
          to be remembered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/portfolio"
            className="px-8 py-3.5 text-sm tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 text-sm tracking-[0.2em] uppercase border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Book a Shoot
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </motion.div>

      <div className="absolute bottom-10 right-10 hidden md:flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-[2px] transition-all duration-500 ${
              index === currentSlide ? "bg-white" : "bg-white/20"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
