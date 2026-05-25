import { CheckCircle } from 'lucide-react';

export default function About() {
  const baseUrl = import.meta.env.BASE_URL;

  const highlights = [
    "Senior manufacturing engineering leadership",
    "Deep experience with GD&T, CAD, and DFM",
    "Proven impact on quality, cost, and launch performance"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            About Solid Gear Designs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <img
              src="/images/sergio-jorge-v3.jpg"
              alt="Sergio Jorge, Founder & Senior Manufacturing Engineer"
              className="rounded-lg shadow-xl w-full"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Solid Gear Designs provides senior manufacturing engineering support to organizations that lack internal bandwidth but require experienced judgment.
            </p>
            <h3 className="text-2xl font-bold text-charcoal mb-4">
              Sergio Jorge — Founder & Senior Manufacturing Engineer
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sergio Jorge is a senior manufacturing engineer with over 20 years of hands-on experience supporting high-mix, low-volume manufacturing environments. His work focuses on resolving tolerance ambiguity, improving manufacturability, and stabilizing production through practical, engineering-driven solutions.
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
