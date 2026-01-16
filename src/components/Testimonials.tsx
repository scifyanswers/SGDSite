import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Sergio helped develop my product's design and manufacturing drawing, ensuring all features and tolerances were met by my manufacturer. Real professional. Honest conversations. I love his work.",
      author: "Derek Donohue",
      title: "President, Box Scientific"
    },
    {
      text: "If you need tough designs made efficiently and professionally, then Sergio is your guy. Will definitely be working with him on more projects.",
      author: "Tad Lostlen",
      title: "Cabinet Manufacturer"
    },
    {
      text: "Sergio contributed directly to lowering our production costs by improving supplier relations and reducing scrap through process improvement. His communication was clear and consistent, and he delivered exactly as promised.",
      author: "Bob D.",
      title: "Manufacturing Engineering Manager"
    }
  ];

  return (
    <section className="py-20 bg-light-grey">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md relative"
            >
              <Quote className="w-10 h-10 text-copper mb-4 opacity-50" />
              <p className="text-charcoal leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-charcoal">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
