import { TrendingDown, Clock, CheckCircle } from 'lucide-react';

export default function Results() {
  const metrics = [
    {
      icon: TrendingDown,
      stat: "Up to 85%",
      label: "Reduction in Scrap"
    },
    {
      icon: Clock,
      stat: "6 Weeks",
      label: "Faster Launch Time"
    },
    {
      icon: CheckCircle,
      stat: "90%",
      label: "Supplier Defects Down"
    }
  ];

  return (
    <section id="results" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Results Our Clients See
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg text-center border border-copper border-opacity-30"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-copper" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-copper mb-2">
                  {metric.stat}
                </div>
                <div className="text-lg text-white">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
