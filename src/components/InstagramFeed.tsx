"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

interface Project {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
}

export default function InstagramFeed() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data.slice(0, 8));
      })
      .catch(() => {});
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <AnimatedSection className="mb-10 flex items-center justify-between">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A96A] block mb-4">
              Projects
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            View All
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="aspect-square bg-[#111] overflow-hidden group relative"
            >
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${project.heroImage})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                <div className="text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-2 py-0.5 text-[10px] tracking-wider uppercase text-[#C8A96A] mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-sm font-light text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
