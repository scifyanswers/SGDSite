import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * Elite Navigation (High-trust B2B)
 * - Not sticky (no fixed positioning)
 * - No CTA button in nav
 * - Designed to sit cleanly over a dark hero (or any dark top section)
 * - Vite-safe asset path via import.meta.env.BASE_URL
 */
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  // Premium touch: prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const LinkButton = ({
    id,
    label,
  }: {
    id: string;
    label: string;
  }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="text-white/85 hover:text-white transition-colors text-sm font-semibold tracking-wide"
    >
      {label}
    </button>
  );

  return (
    <header className="relative z-50">
      {/* Non-sticky top bar (elite, low-pressure) */}
      <div className="bg-navy backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* Brand */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMenuOpen(false);
              }}
              className="flex items-center"
              aria-label="Solid Gear Designs Home"
            >
              {/* Logo fills the bar height; avoids 'tiny' look */}
              <div className="h-14 md:h-16 flex items-center">
                <img
                  src={`${baseUrl}images/logo-banner.png`}
                  alt="Solid Gear Designs"
                  className="h-full w-auto max-h-none object-contain"
                />
              </div>
            </a>

            {/* Desktop nav (text links only; no CTA button) */}
            <nav className="hidden md:flex items-center gap-10">
              <LinkButton id="services" label="Services" />
              <LinkButton id="results" label="Results" />
              <LinkButton id="about" label="About" />
              <LinkButton id="contact" label="Contact" />
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white/90 hover:text-white transition"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay + drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          />

          {/* Drawer */}
          <aside className="absolute top-0 right-0 h-full w-[86%] max-w-sm bg-navy/95 border-l border-white/10 shadow-2xl">
            <div className="px-6 py-6 flex items-center justify-between border-b border-white/10">
              <div className="h-12 flex items-center">
                <img
                  src={`${baseUrl}images/logo-banner.png`}
                  alt="Solid Gear Designs"
                  className="h-full w-auto max-h-none object-contain"
                />
              </div>

              <button
                className="text-white/85 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-2">
              <button
                onClick={() => scrollToSection("services")}
                className="w-full text-left rounded-2xl px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("results")}
                className="w-full text-left rounded-2xl px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
              >
                Results
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="w-full text-left rounded-2xl px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full text-left rounded-2xl px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
              >
                Contact
              </button>

              {/* No CTA button here either—keep it elite/low-pressure */}
              <p className="text-white/55 text-xs mt-4 leading-relaxed">
                Senior manufacturing engineering support for high-mix teams—clear decisions, fewer iterations,
                faster launches.
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-white/10">
              <p className="text-white/50 text-xs">
                © {new Date().getFullYear()} Solid Gear Designs
              </p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}