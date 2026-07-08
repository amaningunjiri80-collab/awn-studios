import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageMeta, ALL_SEO_PAGES } from "@/lib/seo";
import { CATEGORY_IMAGES } from "@/lib/images";
import BookingForm from "@/components/BookingForm";

export function generateStaticParams() {
  return ALL_SEO_PAGES.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPageMeta(slug);
  if (!meta) return { title: "Not Found" };

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://awnarchive.com/seo/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://awnarchive.com/seo/${slug}`,
      siteName: "AWN Archive",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function SEOPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPageMeta(slug);
  if (!meta) notFound();

  const categoryMap: Record<string, string> = {
    "sports-photography-worcester": "Sports",
    "event-photography-worcester": "Events",
    "portrait-photography-worcester": "Portraits",
    "graduation-photography-massachusetts": "Graduation",
    "branding-photography-massachusetts": "Branding",
    "music-photography-concerts": "Music",
    "fashion-photography": "Fashion",
    "church-photography": "Church",
    "behind-the-scenes-photography": "Behind The Scenes",
    "business-photography-massachusetts": "Business",
  };

  const category = categoryMap[slug] || "Portraits";

  const images = [
    CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Portraits,
    CATEGORY_IMAGES[category === "Behind The Scenes" ? "Music" : category === "Music" ? "Events" : category === "Events" ? "Fashion" : "Portraits"] || CATEGORY_IMAGES.Portraits,
    CATEGORY_IMAGES[category === "Business" ? "Portraits" : "Events"] || CATEGORY_IMAGES.Portraits,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AWN Archive",
    description: meta.description,
    url: `https://awnarchive.com/seo/${slug}`,
    image: images[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Worcester",
      addressRegion: "MA",
      addressCountry: "US",
    },
    priceRange: "$$",
    sameAs: ["https://instagram.com/awn_studios"],
    serviceType: [category],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-28 pb-24">
        <div className="px-6 md:px-12 mb-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] block mb-4">
                  {category} Photography
                </span>
                <h1 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight">
                  {meta.h1}
                </h1>
                <p className="text-base text-[#A0A0A0] leading-relaxed mb-6">
                  {meta.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {meta.keywords.slice(0, 4).map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 text-[10px] tracking-wider uppercase border border-white/10 text-[#666]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/portfolio"
                    className="inline-flex px-6 py-3 text-xs tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all"
                  >
                    View Portfolio
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex px-6 py-3 text-xs tracking-[0.2em] uppercase border border-white/30 text-white hover:bg-white hover:text-black transition-all"
                  >
                    Book a Shoot
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {images.slice(0, 2).map((img, i) => (
                  <div
                    key={i}
                    className={`aspect-[4/5] bg-cover bg-center ${i === 0 ? "row-span-2" : ""}`}
                    style={{ backgroundImage: `url(${img})` }}
                    role="img"
                    aria-label={`${category} photography example ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="px-6 md:px-12 py-16 bg-[#111]">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-3xl prose prose-invert prose-sm">
              <div
                className="text-[#A0A0A0] text-base leading-relaxed space-y-6 [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-light [&_h2]:mt-10 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-[#A0A0A0]"
                dangerouslySetInnerHTML={{ __html: meta.bodyContent }}
              />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-16">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-xl md:text-2xl font-light text-white mb-8">
              Featured {category} Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <Link
                  key={i}
                  href="/portfolio"
                  className="group image-zoom aspect-[4/5] bg-[#111] overflow-hidden"
                >
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${img})` }}
                    role="img"
                    aria-label={`${category} photography sample ${i + 1}`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-16 bg-[#111]">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Ready to Book Your {category} Shoot?
                </h2>
                <p className="text-[#A0A0A0] text-base leading-relaxed mb-2">
                  Tell us about your project and we&apos;ll respond within 24 hours.
                </p>
                <p className="text-sm text-[#666] mb-6">
                  Based in Worcester, MA — Available Worldwide
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/portfolio"
                    className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                  >
                    View Portfolio
                  </Link>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <BookingForm shootType={category} />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-16">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-xl font-light text-white mb-8">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(categoryMap)
                .filter(([k]) => k !== slug)
                .slice(0, 6)
                .map(([s, c]) => (
                  <Link
                    key={s}
                    href={`/seo/${s}`}
                    className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-white/10 text-[#A0A0A0] hover:text-white hover:border-white/30 transition-all"
                  >
                    {c} Photography
                  </Link>
                ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/5">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors group"
              >
                <span>View All Services</span>
                <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
