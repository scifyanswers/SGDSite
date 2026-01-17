export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-12">
          <a href="/" className="text-copper hover:text-navy transition font-medium">
            ← Back to Home
          </a>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-sm text-gray-500 mb-8">
            Last updated: January 17, 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Introduction</h2>
            <p className="leading-relaxed mb-4">
              Solid Gear Designs ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or contact us for our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              When you contact us through our website intake form, we collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your name</li>
              <li>Company name (if provided)</li>
              <li>Work email address</li>
              <li>Your inquiry or technical problem description</li>
              <li>The reason for your contact</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information you provide solely for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Responding to your inquiries about our services</li>
              <li>Evaluating whether we are a good fit for your technical needs</li>
              <li>Communicating with you about potential engagements</li>
              <li>Providing the services you request</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Data Sharing and Disclosure</h2>
            <p className="leading-relaxed mb-4">
              We do not sell, rent, or share your personal information with third parties. Your information is used exclusively for the purposes stated above. We will never use your data for marketing to other parties or share it without your explicit consent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Data Retention</h2>
            <p className="leading-relaxed mb-4">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. If you decide not to engage our services, we will retain your information only for a reasonable period in case you wish to contact us again in the future.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Data Security</h2>
            <p className="leading-relaxed mb-4">
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Your Rights</h2>
            <p className="leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of any inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of future communications</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Contact Us</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:
            </p>
            <p className="leading-relaxed">
              <strong>Email:</strong> sergio@solidgeardesigns.com
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Changes to This Policy</h2>
            <p className="leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
