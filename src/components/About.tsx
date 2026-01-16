import { CheckCircle } from 'lucide-react';

export default function About() {
  const baseUrl = import.meta.env.BASE_URL;

  const highlights = [
    "20+ years hands-on manufacturing experience",
    "Deep CAD, GD&T, high-mix expertise",
    "Senior engineering leadership without hiring full-time"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Why Work With Solid Gear Designs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <img
              src={`${baseUrl}images/sergio-jorge.jpg`}
              alt="Sergio Jorge, Founder & Senior Manufacturing Engineer"
              className="rounded-lg shadow-xl w-full"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-charcoal mb-6">
              Sergio Jorge — Founder & Senior Manufacturing Engineer
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sergio Jorge brings over two decades of hands-on manufacturing engineering experience to high-mix, low-volume manufacturers who need senior-level technical expertise without the commitment of a full-time hire.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Specializing in GD&T, CAD design, and process optimization, Sergio helps engineering-constrained teams eliminate scrap, resolve tolerance failures, and accelerate product launches through systematic root-cause analysis and proven manufacturing best practices.
            </p>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-copper flex-shrink-0 mt-1" />
                  <p className="text-lg text-charcoal font-medium">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
