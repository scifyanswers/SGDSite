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
    <nav className="sticky top-0 z-50 bg-navy border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

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
            <div className="bg-white rounded-md px-3 py-2 shadow-sm">
              <img
                src={`${baseUrl}images/logo-banner.png`}
                alt="Solid Gear Designs"
                className="h-10 w-10 md:h-11 md:w-11"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-white/80 hover:text-white transition text-sm font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("results")}
              className="text-white/80 hover:text-white transition text-sm font-medium"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white/80 hover:text-white transition text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white/80 hover:text-white transition text-sm font-medium"
            >
              Contact
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white/90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10">
          <div className="px-6 py-4 space-y-2">
            {["services", "results", "about", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-3 rounded-md
                           text-white/80 hover:text-white hover:bg-white/5 transition"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}