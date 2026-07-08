"use client";

import { use, useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import projectsData from "@/data/projects.json";
import { getCategoryColor } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="pt-28 pb-24 px-6 text-center"><p className="text-sm text-[#555]">Loading...</p></div>}>
      <ProjectPageInner {...props} />
    </Suspense>
  );
}

function ProjectPageInner({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const [project, setProject] = useState(() => projectsData.find((p) => p.slug === slug));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const live = data.find((p: { slug: string }) => p.slug === slug);
        if (live && (isPreview || live.published !== false)) {
          setProject(live);
        }
      })
      .catch(() => {});
  }, [slug, isPreview]);

  if (!project) {
    return (
      <div className="pt-28 pb-24 px-6 text-center">
        <h1 className="text-2xl text-white">Project not found</h1>
        <Link
          href="/projects"
          className="text-[#A0A0A0] hover:text-white transition-colors mt-4 inline-block"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const galleryImages = project.gallery.map((url, i) => ({
    url,
    title: project.title,
    category: project.category,
    description: `Gallery image ${i + 1}`,
  }));

  return (
    <div className="pt-28 pb-24">
      <div className="px-6 md:px-12 mb-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A0A0A0] hover:text-white transition-colors mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-[1440px] mx-auto">
          <div
            className="w-full aspect-[21/9] bg-cover bg-center bg-[#111]"
            style={{ backgroundImage: `url(${project.heroImage})` }}
            role="img"
            aria-label={project.title}
          />
        </div>
      </div>

      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
              Project
            </span>
            <h1 className="text-3xl md:text-5xl font-light text-white mb-6">
              {project.title}
            </h1>
            <p className="text-base text-[#A0A0A0] leading-relaxed max-w-xl">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#555]">
                Category
              </span>
              <span
                className={`block mt-1 px-3 py-1 text-xs tracking-wider uppercase inline-block ${getCategoryColor(project.category)}`}
              >
                {project.category}
              </span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#555]">
                Client
              </span>
              <p className="text-white text-sm mt-1">{project.client}</p>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#555]">
                Location
              </span>
              <p className="text-white text-sm mt-1">{project.location}</p>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#555]">
                Year
              </span>
              <p className="text-white text-sm mt-1">{project.year}</p>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#555]">
                Tags
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs tracking-wider uppercase border border-white/10 text-[#A0A0A0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-xl font-light text-white mb-8 tracking-[0.1em] uppercase">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group cursor-pointer image-zoom aspect-[4/3] overflow-hidden"
                onClick={() => {
                  setCurrentIndex(index);
                  setLightboxOpen(true);
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${image})` }}
                  role="img"
                  aria-label={`${project.title} - Image ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={galleryImages}
            currentIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setCurrentIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
