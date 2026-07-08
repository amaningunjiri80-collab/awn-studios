"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import servicesData from "@/data/services.json";

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Services
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white">
            What We Do
          </h1>
          <p className="mt-6 text-base text-[#A0A0A0] max-w-xl leading-relaxed">
            From concept to final delivery, we provide premium creative services
            for brands, athletes, artists, and events.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 md:p-8 bg-[#111] border border-white/5 hover:border-white/15 transition-all duration-500"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#A0A0A0] mb-3 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl md:text-2xl font-light text-white mb-4">
                {service.title}
              </h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="space-y-2 mb-6">
                {service.included.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#C8A96A] flex-shrink-0" />
                    <span className="text-xs text-white/50">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]">
                  Turnaround: {service.turnaround}
                </span>
              </div>
              <Link
                href="/contact"
                className="mt-4 text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors inline-flex items-center gap-2 group"
              >
                {service.cta}
                <span className="w-4 h-[1px] bg-white/20 group-hover:w-6 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-16 border-t border-white/5"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-[#A0A0A0] mb-8 max-w-md mx-auto">
            Book a free consultation and we&apos;ll help you figure out the best
            approach for your project.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3.5 text-sm tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
          >
            Book a Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
