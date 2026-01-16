import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="flex items-center"
          >
            <img
              src={`${baseUrl}images/logo-banner.png`}
              alt="Solid Gear Designs"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-white/90 hover:text-white transition-colors text-sm font-semibold tracking-wide"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("results")}
              className="text-white/90 hover:text-white transition-colors text-sm font-semibold tracking-wide"
            >
              Results
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="text-white/90 hover:text-white transition-colors text-sm font-semibold tracking-wide"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-white/90 hover:text-white transition-colors text-sm font-semibold tracking-wide"
            >
              Contact
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-copper text-navy px-5 py-2.5 rounded-xl font-bold text-sm
                         shadow-lg shadow-black/25 hover:brightness-110 transition"
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white/90 hover:text-white transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 space-y-3">
            <button
              onClick={() => scrollToSection("services")}
              className="w-full text-left rounded-xl px-4 py-3
                         text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("results")}
              className="w-full text-left rounded-xl px-4 py-3
                         text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
            >
              Results
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="w-full text-left rounded-xl px-4 py-3
                         text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="w-full text-left rounded-xl px-4 py-3
                         text-white/90 hover:text-white hover:bg-white/5 transition font-semibold"
            >
              Contact
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-copper text-navy px-6 py-3 rounded-xl font-bold
                         shadow-lg shadow-black/25 hover:brightness-110 transition w-full"
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
<img
  src={`${baseUrl}images/logo-banner.png`}
  alt="Solid Gear Designs"
  className="h-16 w-auto border-2 border-red-500"
/>
