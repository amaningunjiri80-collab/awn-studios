import Link from "next/link";

const footerLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/">
              <span className="text-2xl font-light tracking-[0.3em] text-white">
                AWN
              </span>
              <span className="block text-[10px] tracking-[0.5em] text-[#A0A0A0] uppercase mt-1">
                Archive
              </span>
            </Link>
            <p className="mt-6 text-sm text-[#A0A0A0] max-w-md leading-relaxed">
              Stories Worth Remembering.
              <br />
              Premium photography and creative direction for those who demand
              more.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@awnarchive.com"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  hello@awnarchive.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/awn_studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <span className="text-sm text-white/60">
                  Massachusetts / Worldwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555]">
            &copy; {currentYear} AWN Archive. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-xs text-[#555] hover:text-white/30 transition-colors"
            >
              Admin
            </Link>
            <span className="text-xs text-[#333]">|</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#555]">
              Stories Worth Remembering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
