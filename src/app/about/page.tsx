"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const defaultProfile = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85";

export default function AboutPage() {
  const [profileUrl, setProfileUrl] = useState(defaultProfile);

  useEffect(() => {
    fetch("/api/site-settings").then(async (res) => {
      if (!res.ok) return;
      const settings = await res.json();
      if (settings?.profile_photo) setProfileUrl(settings.profile_photo);
    });
  }, []);
  return (
    <div className="pt-28 pb-24">
      <div className="px-6 md:px-12 mb-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
              About
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Welcome to
              <br />
              <span className="text-white/70">AWN Archive.</span>
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <AnimatedSection variant="slideRight">
              <div className="aspect-[3/4] bg-[#111] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${profileUrl})`,
                  }}
                  role="img"
                  aria-label="Amani, founder of AWN Archive"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideLeft" delay={0.2}>
              <div className="space-y-6 text-[#A0A0A0] text-base leading-relaxed">
                <p>
                  Every moment has a story. Every story deserves to be remembered.
                </p>
                <p>
                  AWN Archive is the home of the work created by AWN Studios—a curated collection of photographs, films, and creative projects that preserve moments long after they&apos;ve passed. More than a portfolio, it&apos;s a living archive built on storytelling, creativity, and the belief that every memory has lasting value.
                </p>
                <p>
                  Whether it&apos;s the intensity of a championship game, the excitement of a graduation, the energy of a live event, the identity of a growing brand, or the confidence captured in a portrait, every project becomes part of a larger story. The goal isn&apos;t simply to document what happened—it&apos;s to preserve how it felt.
                </p>
                <p>
                  The name Archive represents more than a gallery of images. It represents legacy. Every photograph, every frame, and every project becomes part of a collection that can be revisited for years to come.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { number: "100+", label: "Projects Delivered" },
                  { number: "50+", label: "Happy Clients" },
                  { number: "5+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="text-2xl md:text-3xl font-light text-white">
                      {stat.number}
                    </span>
                    <p className="text-xs text-[#A0A0A0] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 mt-10 text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors group"
              >
                <span>Work With Me</span>
                <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all duration-300" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-12 py-20 bg-[#111]">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
              The Story
            </span>
            <h2 className="text-2xl md:text-4xl font-light text-white max-w-3xl mx-auto leading-tight">
              The Story Behind
              <br />
              <span className="text-white/60">AWN Studios.</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#C8A96A] mx-auto mt-8" />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto mt-12 space-y-6 text-[#A0A0A0] leading-relaxed text-center">
            <AnimatedSection delay={0.1}>
              <p>I&apos;m Amani, the founder and creative director of AWN Studios.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p>My journey with photography began with a simple desire to capture moments I never wanted to forget. Over time, that passion evolved into a purpose: creating visuals that tell meaningful stories and leave a lasting impact.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p>Today, photography and filmmaking are more than creative outlets—they&apos;re how I connect with people. Every client has a unique vision, personality, and story, and I believe those deserve to be captured with authenticity and intention.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.25}>
              <p>As both a creative and a marketing student, I approach every project with an understanding that great visuals should do more than look good. They should communicate, inspire, and create emotion. Whether I&apos;m working with athletes, businesses, artists, churches, graduates, or families, my focus remains the same: creating work that feels genuine and stands the test of time.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p>I founded AWN Studios with a vision of building more than a media company. I wanted to create a brand recognized for professionalism, creativity, and storytelling—a brand that clients can trust to bring their vision to life.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.35}>
              <p>That vision naturally grew into AWN Archive: a place where every completed project has a home, where memories are preserved, and where stories continue long after the camera stops recording.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20">
        <div className="max-w-[1440px] mx-auto text-center">
          <AnimatedSection>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
              Approach
            </span>
            <h2 className="text-2xl md:text-4xl font-light text-white max-w-3xl mx-auto leading-tight">
              Every project starts with
              <br />
              <span className="text-white/60">one question.</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#C8A96A] mx-auto mt-8" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-xl md:text-2xl text-[#C8A96A] font-light italic mt-10 mb-8">
              &ldquo;What story are we telling?&rdquo;
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Authenticity",
                desc: "I believe the best images aren't forced. They're honest. The moments between the poses, the celebrations after the win, the laughter no one planned for.",
              },
              {
                title: "Craft",
                desc: "The answer shapes everything from the way I frame a shot to the way a final film is edited. Every detail serves the story we're telling.",
              },
              {
                title: "Connection",
                desc: "My goal is to create visuals that people don't just see—they experience. Work that feels genuine and stands the test of time.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <h3 className="text-lg font-light text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">
                  {item.desc}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-[#111]">
        <div className="max-w-[1440px] mx-auto text-center">
          <AnimatedSection>
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A96A] block mb-4">
              Looking Ahead
            </span>
            <h2 className="text-2xl md:text-4xl font-light text-white max-w-3xl mx-auto leading-tight">
              Looking Ahead
            </h2>
            <div className="w-12 h-[1px] bg-[#C8A96A] mx-auto mt-8" />
          </AnimatedSection>

          <div className="max-w-2xl mx-auto mt-12 space-y-6 text-[#A0A0A0] leading-relaxed text-center">
            <AnimatedSection delay={0.1}>
              <p>AWN Studios is constantly growing, evolving, and finding new ways to tell stories through photography and film. Every collaboration, every client, and every opportunity adds another chapter to this journey.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p>Thank you for visiting AWN Archive and taking the time to learn about the vision behind the work. Whether you&apos;re here to explore the portfolio, book a session, or simply discover what we create, I&apos;m grateful you&apos;re here.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p>I look forward to creating something meaningful with you.</p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.25}>
            <div className="mt-12 pt-8 border-t border-white/5 max-w-md mx-auto">
              <p className="text-lg text-white font-light">— Amani</p>
              <p className="text-sm text-[#A0A0A0] mt-1">Founder &amp; Creative Director</p>
              <p className="text-sm text-[#A0A0A0]">AWN Studios</p>
              <p className="text-xs text-[#C8A96A] mt-4 italic tracking-widest">&ldquo;Where moments live.&rdquo;</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors group"
              >
                <span>Work With Me</span>
                <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all duration-300" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
