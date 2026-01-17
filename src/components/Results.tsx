import { TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Results() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const metrics = [
    {
      icon: TrendingDown,
      stat: "Up to 85%",
      label: "reduction in scrap"
    },
    {
      icon: Clock,
      stat: "~6 weeks",
      label: "Launch timelines shortened"
    },
    {
      icon: CheckCircle,
      stat: "Up to 90%",
      label: "Supplier defects reduced"
    }
  ];

  return (
    <section
      id="results"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-navy transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Measured Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="group bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg text-center border border-copper border-opacity-30
                           cursor-pointer transition-all duration-300
                           hover:bg-opacity-15 hover:border-opacity-60 hover:shadow-2xl hover:shadow-copper/20 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-copper transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-copper mb-2 transition-all duration-300 group-hover:scale-105">
                  {metric.stat}
                </div>
                <div className="text-lg text-white transition-all duration-300 group-hover:text-white/90">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Results vary by program, but our focus is always measurable manufacturing improvement.
          </p>
        </div>
      </div>
    </section>
  );
}
