"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const reasons = [
  {
    title: "Fast Turnaround",
    description: "Premium results on your timeline. We deliver without compromise.",
    icon: "01",
  },
  {
    title: "Creative Direction",
    description: "Every project starts with a vision. We guide the creative process from concept to completion.",
    icon: "02",
  },
  {
    title: "Professional Editing",
    description: "Color grading, retouching, and post-production that elevates every frame.",
    icon: "03",
  },
  {
    title: "Storytelling",
    description: "We don't just take pictures. We craft narratives that resonate with your audience.",
    icon: "04",
  },
  {
    title: "Reliable Communication",
    description: "Clear, responsive, and professional. You'll always know where your project stands.",
    icon: "05",
  },
  {
    title: "Premium Experience",
    description: "From the first call to final delivery, expect white-glove service throughout.",
    icon: "06",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Why AWN Studios
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Built Different
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group p-6 md:p-8 bg-[#111] border border-white/5 hover:border-[#C8A96A]/30 transition-all duration-500 cursor-default"
            >
              <span className="text-3xl md:text-4xl font-light text-white/10 group-hover:text-[#C8A96A]/20 transition-colors duration-500 block mb-6">
                {reason.icon}
              </span>
              <h3 className="text-lg md:text-xl font-light text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
