"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import servicesData from "@/data/services.json";

export default function ServicesSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#111]">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Services
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            What We Offer
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {servicesData.map((service, index) => (
            <AnimatedSection
              key={service.id}
              delay={index * 0.05}
              variant="fadeIn"
            >
              <div className="group p-6 md:p-8 bg-[#0A0A0A] border border-white/5 hover:border-white/15 transition-all duration-500 h-full flex flex-col">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#A0A0A0] mb-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl md:text-2xl font-light text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.included.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#C8A96A]" />
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
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
