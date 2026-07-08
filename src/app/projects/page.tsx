"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import { getCategoryColor } from "@/lib/utils";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map((p: { hero_image?: string; heroImage?: string }) => ({
            ...p,
            heroImage: p.hero_image || p.heroImage || "/images/placeholder.svg",
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
            Projects
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white">
            Our Projects
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/projects/${project.slug}`}
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
                    </div>
                    <span className="inline-block mt-3 text-[10px] tracking-wider uppercase text-[#C8A96A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Gallery &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
