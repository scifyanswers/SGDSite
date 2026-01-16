import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitMessage('Thank you for your inquiry. We will contact you within 24 hours.');
    setFormData({ name: '', company: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-navy">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book a Call
          </h2>
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
              <label htmlFor="message" className="block text-sm font-bold text-charcoal mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-copper focus:border-transparent resize-none"
              />
            </div>

            {submitMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-copper text-navy px-8 py-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Book a Call'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            We typically respond within 24 business hours.
          </p>
        </div>
      </div>
    </section>
  );
}
