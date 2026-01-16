import { Cog, Ruler, TrendingUp } from 'lucide-react';

export default function Solutions() {
  const baseUrl = import.meta.env.BASE_URL;

  const services = [
    {
      icon: Cog,
      title: "Fractional Senior Manufacturing Engineering",
      description: "Get senior-level manufacturing engineering expertise on demand without the overhead of a full-time hire."
    },
    {
      icon: Ruler,
      title: "GD&T & Tolerance Consultation",
      description: "Eliminate ambiguity in drawings and ensure your parts are manufacturable with proper geometric dimensioning and tolerancing."
    },
    {
      icon: TrendingUp,
      title: "Process Optimization & Root-Cause Resolution",
      description: "Systematically identify and eliminate the sources of scrap, rework, and production delays."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            How Solid Gear Designs Helps You Win
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-copper rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative">
            <img
              src={`${baseUrl}images/cad-computer.jpg`}
              alt="Manufacturing Engineering in Action"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
