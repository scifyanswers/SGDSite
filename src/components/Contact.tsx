import { useMemo, useState } from "react";
import { Mail, Clock, Shield, ChevronDown } from "lucide-react";

export default function Contact() {
  const baseUrl = import.meta.env.BASE_URL;

  // ✅ Your booking method (email for now)
  const TO_EMAIL = "sergioj@solidgeardesigns.com";

  const [reason, setReason] = useState("GD&T / Tolerance Review");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = `Solid Gear Designs — ${reason}`;
    const bodyLines = [
      `Reason: ${reason}`,
      name ? `Name: ${name}` : `Name:`,
      company ? `Company: ${company}` : `Company:`,
      email ? `Email: ${email}` : `Email:`,
      ``,
      `Project / Pain:`,
      message || ``,
      ``,
      `Helpful details (if available):`,
      `• Part/material/process`,
      `• Tightest tolerance(s) and feature(s) at risk`,
      `• Current scrap/rework symptom`,
      `• Supplier or inspection constraints`,
    ];

    const body = bodyLines.join("\n");

    return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
  }, [TO_EMAIL, reason, name, company, email, message]);

  return (
    <section id="contact" className="bg-[#0F1B27] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Book a Call
          </h2>
          <p className="mt-3 text-lg text-white/75">
            Send a short intake and we’ll reply with the best next step (call link or clarifying questions).
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
                  <span>Confidentiality respected. NDAs welcome.</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Mail size={18} className="text-[#BF9F5A]" />
                  <span className="break-all">{TO_EMAIL}</span>
                </div>
              </div>

              <a
                href={mailtoHref}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#BF9F5A] px-6 py-3 font-bold text-[#0F1B27]
                           shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] hover:brightness-105 transition"
              >
                <Mail size={18} />
                Email to Book
              </a>

              <p className="mt-3 text-xs text-white/55">
                This opens your email app with a pre-filled intake. You can edit before sending.
              </p>
            </div>
          </div>

          {/* Right: Concierge intake */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-7 md:p-9 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0F1B27]">
                    Quick Intake
                  </h3>
                  <p className="mt-1 text-sm text-[#1A1A1A]/70">
                    The more specific you are, the faster we can confirm fit.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#0F1B27]">
                    Reason for booking
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 text-[#0F1B27]
                                 focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                    >
                      <option>GD&T / Tolerance Review</option>
                      <option>DFM + Manufacturing Drawing Support</option>
                      <option>Scrap / Rework Root Cause</option>
                      <option>Supplier Quality / Defect Reduction</option>
                      <option>Inspection / Gauge Strategy</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0F1B27]/50"
                      size={18}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F1B27]">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                               focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F1B27]">
                    Company
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                               focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                    placeholder="Company (optional)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#0F1B27]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                               focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#0F1B27]">
                    What’s the problem you want solved?
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0F1B27]
                               focus:outline-none focus:ring-2 focus:ring-[#BF9F5A]/40"
                    placeholder="Example: Tolerance stack is causing scrap at assembly. Supplier pushing back on true position callouts. Need DFM + drawing update."
                  />
                  <p className="mt-2 text-xs text-[#1A1A1A]/55">
                    We typically respond within <span className="font-semibold">24 business hours</span>.
                  </p>
                </div>
              </div>

              {/* Primary action: email (no fake submit) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={mailtoHref}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F1B27] px-6 py-3 font-semibold text-white
                             hover:brightness-105 transition"
                >
                  <Mail size={18} />
                  Send Intake via Email
                </a>
                <a
                  href={`mailto:${TO_EMAIL}`}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 px-6 py-3 font-semibold text-[#0F1B27]
                             hover:bg-black/5 transition"
                >
                  Or email directly
                </a>
              </div>

              <p className="mt-4 text-xs text-[#1A1A1A]/55">
                By reaching out, you agree we may use your message to respond. We do not sell your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}