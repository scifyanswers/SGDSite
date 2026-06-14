export type LeadTier = "HIGH" | "STANDARD" | "LOW" | "DISQUALIFIED";

export function scoreLead(totalPoints: number, hasDisqualifier: boolean): LeadTier {
  if (hasDisqualifier) return "DISQUALIFIED";
  if (totalPoints >= 45) return "HIGH";
  if (totalPoints >= 30) return "STANDARD";
  return "LOW";
}

export const tierConfig: Record<
  LeadTier,
  { headline: string; body: string; cta_label: string; cta_url: string; color: string }
> = {
  HIGH: {
    headline: "You're a Strong Fit.",
    body: "Your shop profile aligns closely with the First-Pass Precision System. You'll be directed to book a 45-minute discovery call, and your answers will be shared with the advisor in advance.",
    cta_label: "JOIN THE WAITLIST",
    cta_url: "https://chat.whatsapp.com/EPGAHDPjoi5AOkrPmgyVa1",
    color: "#2D6A4F",
  },
  STANDARD: {
    headline: "You May Be a Fit.",
    body: "Your operational challenges align with what we address, but one or more areas may need clarification. Our advisor will review your answers and reach out within 1 business day.",
    cta_label: "Submit for Review",
    cta_url: "[PLACEHOLDER — insert CRM form submit endpoint]",
    color: "#92400E",
  },
  LOW: {
    headline: "Not the Right Time — Yet.",
    body: "Your shop isn't quite at the stage where this program delivers its highest ROI. We've put together two free tools to help you get there: an FPY/RTY Calculator and a basic Setup Sheet Template.",
    cta_label: "Download Free Resources",
    cta_url: "[PLACEHOLDER — insert resource download link]",
    color: "#6B7280",
  },
  DISQUALIFIED: {
    headline: "This Program Isn't the Right Fit.",
    body: "Based on your answers, the First-Pass Precision System isn't structured for your current situation. We're sharing a free resource below that may still be useful.",
    cta_label: "Download Free Resource",
    cta_url: "[PLACEHOLDER — insert resource download link]",
    color: "#7F1D1D",
  },
};
