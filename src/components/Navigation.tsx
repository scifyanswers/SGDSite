import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
<nav className="sticky top-0 z-50 bg-[#0F1B27]/75 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">

         {/* Brand */}
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="flex items-center gap-3"
>
  <div className="rounded-full ring-1 ring-white/20 p-1.5">
    <img
      src={`${baseUrl}images/logo-circular.png`}
      alt="Solid Gear Designs"
      className="h-14 w-14"
    />
  </div>

  <span className="hidden sm:block text-white font-semibold tracking-wide text-base">
    Solid Gear Designs
  </span>
</button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["services", "results", "about", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-white/80 hover:text-white transition text-sm font-medium"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10">
          <div className="px-6 py-4 space-y-2">
            {["services", "results", "about", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="block w-full text-left px-4 py-3 rounded-md
                           text-white/80 hover:text-white hover:bg-white/5 transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}