export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${baseUrl}images/blueprint.jpg)` }} // <-- make sure this matches your actual file
      >
        {/* Premium overlay stack */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1B27]/85 via-[#0F1B27]/70 to-[#0F1B27]/90" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Engineering Expertise for High-Mix Manufacturers
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          Senior manufacturing engineering support to reduce scrap, stabilize production, and accelerate launches without adding headcount.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-copper text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("results")}
            className="text-white border border-white/30 px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition-all"
          >
            View Outcomes
          </button>
        </div>
      </div>
    </section>
  );
}