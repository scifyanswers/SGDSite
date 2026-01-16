import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <img
              src={`${baseUrl}images/logo-banner.png`}
              alt="Solid Gear Designs"
              className="h-12 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-copper transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="text-white hover:text-copper transition-colors font-medium"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-copper transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-copper transition-colors font-medium"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-copper text-navy px-6 py-3 rounded-md font-bold hover:bg-opacity-90 transition-all"
            >
              Book a Call
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-navy border-t border-gray-700">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => scrollToSection('services')}
              className="block text-white hover:text-copper transition-colors font-medium w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('results')}
              className="block text-white hover:text-copper transition-colors font-medium w-full text-left"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block text-white hover:text-copper transition-colors font-medium w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block text-white hover:text-copper transition-colors font-medium w-full text-left"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-copper text-navy px-6 py-3 rounded-md font-bold hover:bg-opacity-90 transition-all w-full"
            >
              Book a Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
