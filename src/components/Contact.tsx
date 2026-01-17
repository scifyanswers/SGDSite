import { useState, FormEvent } from "react";
import { Mail, Clock, Shield, ChevronDown } from "lucide-react";

const AIRTABLE_ENDPOINT_FALLBACK = "https://api.airtable.com/v0/appoZcE3LSbmki0aE/Table%201";
const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
];

export default function Contact() {
  const baseUrl = import.meta.env.BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const reason = (formData.get("reason") as string || "").trim();
    const fullName = (formData.get("fullName") as string || "").trim();
    const company = (formData.get("company") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const description = (formData.get("description") as string || "").trim();

    if (!reason) {
      setErrorMessage("Please select a reason for reaching out.");
      setIsSubmitting(false);
      return;
    }

    if (!fullName || fullName.length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      setIsSubmitting(false);
      return;
    }

    if (!email) {
      setErrorMessage("Please enter your work email address.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (emailDomain && PERSONAL_EMAIL_DOMAINS.includes(emailDomain)) {
      setErrorMessage("Please use a company email for this intake.");
      setIsSubmitting(false);
      return;
    }

    if (!description || description.length < 20) {
      setErrorMessage("Please provide a detailed description (at least 20 characters).");
      setIsSubmitting(false);
      return;
    }

    try {
      const airtableEndpoint = import.meta.env.VITE_AIRTABLE_ENDPOINT || AIRTABLE_ENDPOINT_FALLBACK;
      const airtableToken = import.meta.env.VITE_AIRTABLE_TOKEN;

      if (!airtableToken) {
        throw new Error("Airtable configuration is missing. Please contact support.");
      }

      const payload = {
        records: [
          {
            fields: {
              "Primary reason for reaching out": reason,
              "Name": fullName,
              "Company": company,
              "Work Email": email,
              "Technical Problem": description,
              "Page URL": window.location.href,
              "Submitted At": new Date().toISOString(),
            },
          },
        ],
      };

      const response = await fetch(airtableEndpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        result = { error: { message: responseText } };
      }

      if (!response.ok) {
        const errorMsg = result?.error?.message || result?.error || "Failed to submit form";
        throw new Error(errorMsg);
      }

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMsg = error instanceof Error ? error.message : "An error occurred";
      setErrorMessage(`Unable to submit form: ${errorMsg}. Please email sergioj@solidgeardesigns.com directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0F1B27] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Let's Confirm Fit Before We Engage
          </h2>
          <p className="mt-3 text-lg text-white/75">
            This intake helps us understand your technical challenge and determine whether we're the right engineering partner before scheduling time.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Trust / Identity card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-4">
                <img
                  src={`${baseUrl}images/logo-circular.png`}
                  alt="Solid Gear Designs"
                  className="h-14 w-14"
                />
                <div>
                  <div className="text-white font-semibold text-lg leading-tight">
                    Solid Gear Designs
                  </div>
                  <div className="text-white/70 text-sm">
                    Sergio Jorge — Founder & Senior Manufacturing Engineer
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Clock size={18} className="text-[#BF9F5A]" />
                  <span>
                    Typical response: <span className="text-white font-semibold">within 24 business hours</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Shield size={18} className="text-[#BF9F5A]" />
                  <span>Confidentiality respected. NDAs welcome</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Mail size={18} className="text-[#BF9F5A]" />
                  <span>Engagements structured around measurable manufacturing outcomes</span>
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-white/10">
                <p className="text-white/90 text-sm font-medium">
                  Direct email: sergioj@solidgeardesigns.com
                </p>
                <p className="mt-2 text-xs text-white/60">
                  For complex or sensitive programs, email is always acceptable.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Concierge intake */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-7 md:p-9 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0F1B27]">
                    Technical Intake
                  </h3>
                  <p className="mt-1 text-sm text-[#1A1A1A]/70">
                    Please be specific. Clear information allows us to assess fit and next steps quickly.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#0F1B27]">
                      Primary reason for reaching out
                    </label>
                    <div className="relative mt-2">
                      <select
                        name="reason"
                        defaultValue="GD&T / Tolerance Review"
                        className="w-full appearance-none rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-[#0F1B27]
                                   focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                      >
                        <option>GD&T / Tolerance Review</option>
                        <option>Design for Manufacturability (DFM)</option>
                        <option>Scrap or Rework Reduction</option>
                        <option>Supplier Quality or Disputes</option>
                        <option>Drawing or CAD Corrections</option>
                        <option>New Product or Process Launch Support</option>
                        <option>Not sure — need engineering guidance</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0F1B27]/50"
                        size={18}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F1B27]">
                      Your name
                    </label>
                    <input
                      name="fullName"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                                 focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F1B27]">
                      Company
                    </label>
                    <input
                      name="company"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                                 focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                      placeholder="Company (optional)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#0F1B27]">
                      Work email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                                 focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#0F1B27]">
                      Describe the technical problem you need resolved
                    </label>
                    <textarea
                      name="description"
                      rows={5}
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                                 focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                      placeholder="Example:&#10;Tolerance stack-up causing scrap at assembly. Supplier pushing back on true position callouts. Need drawing updates and DFM guidance to stabilize production."
                    />
                  </div>
                </div>

                <div className="mt-8">
                  {errorMessage && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-6 mb-4">
                      <p className="text-red-800 font-semibold text-sm">
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  {isSubmitted ? (
                    <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                      <p className="text-green-800 font-semibold">
                        Thank you for completing the technical intake. We typically reply within 24–48 business hours.
                      </p>
                    </div>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#BF9F5A] px-6 py-4 font-bold text-[#0F1B27]
                                   shadow-lg hover:brightness-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Technical Intake"}
                      </button>
                      <p className="mt-3 text-center text-xs text-[#1A1A1A]/50">
                        This does not obligate you to an engagement.
                      </p>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}