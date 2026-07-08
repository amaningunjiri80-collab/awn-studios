"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import testimonialsData from "@/data/testimonials.json";

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#111] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            What Clients Say
          </h2>
        </AnimatedSection>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="min-w-[350px] md:min-w-[500px] snap-start"
            >
              <div className="bg-[#0A0A0A] p-8 md:p-10 border border-white/5 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#222] overflow-hidden flex-shrink-0">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${testimonial.image})`,
                      }}
                      role="img"
                      aria-label={testimonial.name}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-[#A0A0A0]">
                      {testimonial.business}
                    </p>
                  </div>
                </div>
                <p className="text-base md:text-lg text-white/70 leading-relaxed font-light italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
