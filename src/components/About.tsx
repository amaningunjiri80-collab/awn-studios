"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const defaultProfile = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85";

export default function About() {
  const [profileUrl, setProfileUrl] = useState(defaultProfile);

  useEffect(() => {
    fetch("/api/site-settings").then(async (res) => {
      if (!res.ok) return;
      const settings = await res.json();
      if (settings?.profile_photo) setProfileUrl(settings.profile_photo);
    });
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <AnimatedSection variant="slideRight" className="relative">
            <div className="aspect-[3/4] bg-[#111] overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${profileUrl})` }}
                role="img"
                aria-label="Portrait of Amani, founder of AWN Archive"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#C8A96A]/20" />
          </AnimatedSection>

          <AnimatedSection variant="slideLeft" delay={0.2}>
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A96A] block mb-6">
              About AWN Archive
            </span>
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-white mb-8">
              Born in Kenya.
              <br />
              Built in Massachusetts.
              <br />
              <span className="text-white/60">Creating Worldwide.</span>
            </h2>

            <div className="space-y-5 text-[#A0A0A0] text-base leading-relaxed max-w-xl">
              <p>
                AWN Archive was born from a simple belief: every moment carries
                a story worth preserving. Founder Amani discovered photography
                as a way to document the world around him, capturing the
                authenticity that often goes unnoticed.
              </p>
              <p>
                From the vibrant streets of Kenya to the historic landscapes of
                Massachusetts, each frame is shaped by a unique perspective that
                blends cultural richness with modern editorial precision.
              </p>
              <p>
                Today, AWN Archive works with athletes, musicians, brands, and
                events across the country, delivering premium visual content
                that feels as intentional as it is timeless.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 mt-10 text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors group"
            >
              <span>Meet Amani</span>
              <span className="w-8 h-[1px] bg-[#C8A96A]/50 group-hover:w-12 transition-all duration-300" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
