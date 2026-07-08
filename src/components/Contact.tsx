"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const projectTypes = [
  "Sports",
  "Music",
  "Fashion",
  "Events",
  "Branding",
  "Commercial",
  "Portraits",
  "Content Creation",
  "Videography",
  "Other",
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:hello@awnarchive.com?subject=Booking Inquiry from ${formState.name}&body=${encodeURIComponent(
      `Name: ${formState.name}\nBusiness: ${formState.business}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nProject Type: ${formState.projectType}\nBudget: ${formState.budget}\n\nMessage:\n${formState.message}`
    )}`;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#111]" id="contact">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <AnimatedSection variant="slideRight">
            <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
              Let&apos;s Create
              <br />
              Something Together.
            </h2>
            <p className="text-[#A0A0A0] text-base leading-relaxed max-w-md mb-8">
              Tell us about your project. We&apos;ll respond within 24 hours
              with a custom proposal.
            </p>

            <div className="space-y-6">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-[#A0A0A0]">
                  Email
                </span>
                <a
                  href="mailto:hello@awnarchive.com"
                  className="block text-white hover:text-[#C8A96A] transition-colors mt-1"
                >
                  hello@awnarchive.com
                </a>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-[#A0A0A0]">
                  Location
                </span>
                <p className="text-white mt-1">
                  Massachusetts
                  <br />
                  Available Worldwide
                </p>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-[#A0A0A0]">
                  Instagram
                </span>
                <a
                  href="https://instagram.com/awn_studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-[#C8A96A] transition-colors mt-1"
                >
@awn_studios
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="slideLeft" delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name *"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="business" className="sr-only">
                    Business
                  </label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    placeholder="Business"
                    value={formState.business}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email *"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="sr-only">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formState.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="">Select Project Type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="sr-only">
                  Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors appearance-none"
                >
                  <option value="">Select Budget Range</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-3000">$1,000 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000-plus">$10,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-[#555] focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 text-sm tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300"
              >
                Send Inquiry
              </motion.button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
