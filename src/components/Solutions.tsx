import { Ruler, FileText, TrendingDown, Rocket } from 'lucide-react';

export default function Solutions() {
  const baseUrl = import.meta.env.BASE_URL;

  const services = [
    {
      icon: Ruler,
      title: "GD&T & Tolerance Validation",
      description: "Clear interpretation of design intent to prevent scrap, rework, and supplier disputes."
    },
    {
      icon: FileText,
      title: "CAD & DFM Review",
      description: "Manufacturing-focused design reviews to improve buildability and process capability."
    },
    {
      icon: TrendingDown,
      title: "Scrap & Rework Reduction",
      description: "Root-cause analysis and corrective action at the engineering level—not band-aids."
    },
    {
      icon: Rocket,
      title: "Supplier Quality & Launch Support",
      description: "Engineering support during new product or process introductions to stabilize production."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            How We Support Manufacturing Teams
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We work alongside internal teams to resolve technical constraints that impact quality, cost, and delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
