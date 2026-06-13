export interface Option {
  id: string;
  label: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  subtext?: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: "manufacturer_type",
    text: "What best describes your manufacturing environment?",
    subtext: "This helps us understand the complexity of your production context.",
    options: [
      { id: "hmlv", label: "High-mix, low-volume (custom or semi-custom parts)", score: 3 },
      { id: "oem", label: "OEM with multiple product lines", score: 3 },
      { id: "contract", label: "Contract manufacturer serving multiple customers", score: 2 },
      { id: "startup", label: "Hardware startup or pre-production", score: 2 },
      { id: "other", label: "Other / not sure", score: 1 },
    ],
  },
  {
    id: "primary_challenge",
    text: "What is your most pressing engineering challenge right now?",
    subtext: "Select the option that most closely matches your current situation.",
    options: [
      { id: "gdt", label: "GD&T or tolerance issues causing scrap / supplier disputes", score: 3 },
      { id: "dfm", label: "Parts are difficult to manufacture or require constant rework", score: 3 },
      { id: "launch", label: "New product or process launch that keeps slipping", score: 3 },
      { id: "supplier", label: "Supplier quality problems with no clear root cause", score: 2 },
      { id: "general", label: "General engineering backlog — no dedicated resource", score: 2 },
    ],
  },
  {
    id: "urgency",
    text: "How urgently do you need engineering support?",
    options: [
      { id: "now", label: "Immediately — active problem costing us money today", score: 3 },
      { id: "soon", label: "Within 1–4 weeks — escalating issue", score: 3 },
      { id: "quarter", label: "Within the next quarter — planning ahead", score: 2 },
      { id: "exploring", label: "Just exploring options for now", score: 1 },
    ],
  },
  {
    id: "internal_bandwidth",
    text: "How is your internal engineering capacity?",
    subtext: "Be candid — this determines how hands-on we'd need to be.",
    options: [
      { id: "none", label: "No internal manufacturing engineer on staff", score: 3 },
      { id: "stretched", label: "1–2 engineers stretched thin across too many programs", score: 3 },
      { id: "gaps", label: "Team exists but lacks specific expertise (GD&T, DFM, etc.)", score: 2 },
      { id: "full", label: "Full engineering team — need overflow or specialty support", score: 1 },
    ],
  },
  {
    id: "engagement_type",
    text: "What type of engagement would work best for you?",
    options: [
      { id: "project", label: "Project-based — defined scope with a clear deliverable", score: 3 },
      { id: "retainer", label: "Ongoing retainer — fractional engineering support", score: 3 },
      { id: "advisory", label: "Technical advisory — periodic expert review", score: 2 },
      { id: "unsure", label: "Not sure — open to recommendations", score: 2 },
    ],
  },
];
