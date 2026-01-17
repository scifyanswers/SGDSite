import { AlertCircle, Clock, FileX, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function PainPoints() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const challenges = [
    {
      icon: AlertCircle,
      text: "Scrap, rework, repeat inspections"
    },
    {
      icon: Clock,
      text: "Delayed production launches"
    },
    {
      icon: FileX,
      text: "Supplier disputes over quality"
    },
    {
      icon: Users,
      text: "No senior manufacturing engineering support"
    }
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-light-grey transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            You're Facing These Challenges Right Now
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0">
                  <Icon className="w-8 h-8 text-copper" />
                </div>
                <p className="text-lg text-charcoal font-medium">
                  {challenge.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
