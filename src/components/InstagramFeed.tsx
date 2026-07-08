"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";
import Script from "next/script";

export default function InstagramFeed() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <Script src="https://cdn.lightwidget.com/widgets/lightwidget.js" strategy="afterInteractive" />
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

        <div className="w-full overflow-hidden rounded">
          <iframe
            src="//lightwidget.com/widgets/41cf927b08e755dd963b0dddbd541f71.html"
            scrolling="no"
            allowTransparency
            className="lightwidget-widget"
            style={{ width: "100%", border: 0, overflow: "hidden" }}
            title="Instagram Feed"
          />
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
    </section>
  );
}
