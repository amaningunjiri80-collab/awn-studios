"use client";

import { use, useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GalleryPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="pt-28 pb-24 px-6 text-center"><p className="text-sm text-[#555]">Loading...</p></div>}>
      <GalleryInner {...props} />
    </Suspense>
  );
}

function GalleryInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";
  const [project, setProject] = useState<{
    title: string; slug: string; category: string; gallery: string[]; published?: boolean;
  } | null>(null);
  const [images, setImages] = useState<string[]>([]);
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
          setImages((live.gallery || []).filter((u: string) => !u.includes("placeholder")));
        }
      })
      .catch(() => {});
  }, [slug, isPreview]);

  if (!project) {
    return (
      <div className="pt-28 pb-24 px-6 text-center">
        <h1 className="text-2xl text-white">Project not found</h1>
        <Link href="/projects" className="text-[#A0A0A0] hover:text-white transition-colors mt-4 inline-block">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="px-6 md:px-12 mb-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A0A0A0] hover:text-white transition-colors mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Project
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-2">{project.category}</span>
            <h1 className="text-3xl md:text-5xl font-light text-white">{project.title} Gallery</h1>
            <p className="text-sm text-[#A0A0A0] mt-2">{images.length} images</p>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {images.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group cursor-pointer break-inside-avoid overflow-hidden rounded-sm bg-[#111]"
                onClick={() => { setCurrentIndex(index); setLightboxOpen(true); }}
              >
                <div
                  className="w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${url})`, aspectRatio: "auto", minHeight: "200px" }}
                >
                  <img src={url} alt={`${project.title} - Image ${index + 1}`} className="w-full h-auto block" loading="lazy" />
                </div>
              </motion.div>
            ))}
          </div>
          {images.length === 0 && <p className="text-center text-sm text-[#555] mt-12">No images in this gallery yet.</p>}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95" onClick={() => setLightboxOpen(false)}>
            <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors text-2xl">&times;</button>

            {currentIndex > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(currentIndex - 1); }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white/40 hover:text-white transition-colors text-3xl">&#8249;</button>
            )}
            {currentIndex < images.length - 1 && (
              <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(currentIndex + 1); }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white/40 hover:text-white transition-colors text-3xl">&#8250;</button>
            )}

            <div className="w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={images[currentIndex]}
                alt={`${project.title} - Image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="absolute bottom-4 inset-x-0 text-center">
              <span className="text-xs text-white/40">{currentIndex + 1} / {images.length}</span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
