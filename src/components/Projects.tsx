"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import projectsData from "@/data/projects.json";
import { getCategoryColor } from "@/lib/utils";

export default function Projects() {
  const [projects, setProjects] = useState(projectsData.filter((p) => p.featured));

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.filter((p: { featured?: boolean }) => p.featured).map((p: Record<string, unknown>) => ({
            ...p, heroImage: (p.hero_image as string) || (p.heroImage as string) || "/images/placeholder.svg",
          })) as typeof projects);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection className="mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Recent Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Featured Projects
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.slug}
              delay={index * 0.1}
              variant="fadeIn"
            >
              <Link
                href={`/projects/${project.slug}/gallery`}
                className="group block"
              >
                <div className="image-zoom relative aspect-[16/10] bg-[#111] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.heroImage})` }}
                    role="img"
                    aria-label={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span
                      className={`inline-block px-3 py-1 text-xs tracking-wider uppercase mb-3 ${getCategoryColor(project.category)}`}
                    >
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light text-white">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-white/50">
                      <span>{project.client}</span>
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                      {project.project_date && <span>Shot on {new Date(project.project_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>}
                    </div>
                    <span className="inline-block mt-3 text-[10px] tracking-wider uppercase text-[#C8A96A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Gallery &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors group"
          >
            <span>All Projects</span>
            <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all duration-300" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
