"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pricingData = [
  {
    heading: "Sports — Individual",
    items: [
      { title: "Photo Coverage", price: "$85", desc: "40 edited photos" },
      { title: "Video Mix", price: "$150", desc: "Highlight reel" },
      { title: "Photo + Video Combo", price: "$225", desc: "Stills and motion" },
    ],
  },
  {
    heading: "Sports — Team",
    items: [
      { title: "Team Game Coverage", price: "$175", desc: "Photos" },
      { title: "Team Highlight Video", price: "$275", desc: "Full game cut" },
      { title: "Team Combo", price: "$400", desc: "Photos + video" },
    ],
  },
  {
    heading: "Lifestyle",
    items: [
      { title: "Mini Session", price: "$65", desc: "Quick session" },
      { title: "Standard Session", price: "$115", desc: "Full session" },
      { title: "Extended Session", price: "$155", desc: "Extended coverage" },
      { title: "Couples (1 hr)", price: "$140", desc: "One-hour couples shoot" },
    ],
  },
  {
    heading: "Birthday & Studio Sessions",
    items: [
      { title: "Studio Session", price: "$95", desc: "In-studio shoot" },
      { title: "Party Coverage (3 hr)", price: "$250", desc: "Three-hour coverage" },
      { title: "Party Coverage (5 hr, incl. BTS)", price: "$340", desc: "Full event + behind the scenes" },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white">
            Rates & Packages
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-sm text-[#A0A0A0] mb-16 max-w-xl leading-relaxed"
        >
          Prices reflect starting rates — final quotes may vary based on scope,
          location, and turnaround time.
        </motion.p>

        {pricingData.map((section, sIdx) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIdx * 0.08 }}
            className="mb-16"
          >
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-6">
              {section.heading}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {section.items.map((item, iIdx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sIdx * 0.08 + iIdx * 0.04 }}
                  className="p-6 md:p-8 bg-[#111] border border-white/5 hover:border-white/15 transition-all duration-500"
                >
                  <h3 className="text-lg md:text-xl font-light text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-2xl md:text-3xl font-light text-[#C8A96A] mb-2">
                    {item.price}
                  </p>
                  <p className="text-xs text-[#A0A0A0] uppercase tracking-wider mb-5">
                    {item.desc}
                  </p>
                  <Link
                    href={`/booking?type=${encodeURIComponent(item.title)}`}
                    className="inline-flex text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors items-center gap-2 group"
                  >
                    Book Now
                    <span className="w-4 h-[1px] bg-white/20 group-hover:w-6 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 md:p-12 bg-[#111] border border-[#C8A96A]/30 rounded mb-20"
        >
          <h2 className="text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-4">
            Custom Projects
          </h2>
          <p className="text-3xl md:text-5xl font-light text-white mb-3">
            $500 – $10,000+
          </p>
          <p className="text-sm text-[#A0A0A0] max-w-xl leading-relaxed mb-8">
            For team seasons, brand partnerships, multi-day shoots, and
            large-scale events — contact us for a custom quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm tracking-[0.2em] uppercase bg-[#C8A96A] text-black hover:bg-[#C8A96A]/90 transition-all duration-300"
          >
            Request a Quote
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-16 border-t border-white/5"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Have a Specific Project in Mind?
          </h2>
          <p className="text-[#A0A0A0] mb-8 max-w-md mx-auto text-sm">
            Let&apos;s talk about what you need and build a package that fits.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
