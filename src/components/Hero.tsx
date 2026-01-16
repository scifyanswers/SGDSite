export default function Hero() {
  const baseUrl = import.meta.env.BASE_URL;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${baseUrl}images/blueprint-background.jpg)` }}
      >
        <div className="absolute inset-0 bg-navy opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Engineering Expertise for High-Mix Manufacturers
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          Reduce scrap. Accelerate launches. Get senior manufacturing engineering bandwidth when you need it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-copper text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg w-full sm:w-auto"
          >
            Book a Call
          </button>
          <button
            onClick={() => scrollToSection('results')}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-navy transition-all w-full sm:w-auto"
          >
            See Results
          </button>
        </div>
      </div>
    </section>
  );
}
