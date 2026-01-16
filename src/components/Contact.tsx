import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    challenge: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitMessage('Thank you for your inquiry. We will contact you within 24 hours.');
    setFormData({ name: '', company: '', email: '', challenge: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-navy">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Engineering Bandwidth Without Hiring?
          </h2>
          <p className="text-xl text-gray-300">
            Book a call to discuss how we can help solve your manufacturing challenges.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-bold text-charcoal mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="challenge" className="block text-sm font-bold text-charcoal mb-2">
                Primary Manufacturing Challenge
              </label>
              <select
                id="challenge"
                name="challenge"
                value={formData.challenge}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent"
              >
                <option value="">Select a challenge</option>
                <option value="scrap-rework">Scrap and Rework Issues</option>
                <option value="tolerance-failures">Tolerance Failures</option>
                <option value="supplier-disputes">Supplier Quality Disputes</option>
                <option value="delayed-launches">Delayed Product Launches</option>
                <option value="engineering-bandwidth">Need Engineering Bandwidth</option>
                <option value="other">Other</option>
              </select>
            </div>

            {submitMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-copper text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Book a Call'}
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
