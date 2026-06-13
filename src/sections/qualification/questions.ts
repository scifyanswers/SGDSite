export interface Option {
  label: string;
  points: number;
  disqualify: boolean;
}

export interface Question {
  id: number;
  text: string;
  subtext: string | null;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What is the current headcount of your machine shop?",
    subtext: null,
    options: [
      { label: "Fewer than 10 employees", points: 0, disqualify: true },
      { label: "10 to 75 employees", points: 10, disqualify: false },
      { label: "76 to 150 employees", points: 7, disqualify: false },
      { label: "More than 150 employees", points: 0, disqualify: true },
    ],
  },
  {
    id: 2,
    text: "What percentage of your monthly revenue comes from parts with tolerances of ±0.001\" or tighter, or difficult alloys?",
    subtext: null,
    options: [
      { label: "Less than 10%", points: 0, disqualify: true },
      { label: "10% to 49%", points: 5, disqualify: false },
      { label: "50% to 100%", points: 10, disqualify: false },
    ],
  },
  {
    id: 3,
    text: "If your lead programmer or hero engineer were out for a month, what would happen to your ability to run critical jobs correctly on the first setup?",
    subtext: null,
    options: [
      { label: "Nothing. Setups and inspection plans are fully documented.", points: 2, disqualify: false },
      { label: "Minor delays, but other operators would eventually figure it out.", points: 5, disqualify: false },
      { label: "Complete disruption. We would struggle to run critical jobs.", points: 10, disqualify: false },
    ],
  },
  {
    id: 4,
    text: "What is your estimated average First-Pass Yield (FPY) on your most challenging or high-risk parts?",
    subtext: "First-Pass Yield = parts accepted at final inspection without any rework or secondary operations.",
    options: [
      { label: "Over 95% (Excellent)", points: 2, disqualify: false },
      { label: "90% to 94% (Stable, but needs improvement)", points: 5, disqualify: false },
      { label: "Under 90% (Experiencing regular scrap/rework)", points: 10, disqualify: false },
      { label: "We do not actively track first-pass yield.", points: 10, disqualify: false },
    ],
  },
  {
    id: 5,
    text: "Who on your leadership team is responsible for driving process standardization and executing weekly change initiatives on the floor?",
    subtext: null,
    options: [
      { label: "The owner or operations leader directly.", points: 10, disqualify: false },
      { label: "A dedicated plant or quality manager.", points: 7, disqualify: false },
      { label: "We rely on external contractors.", points: 2, disqualify: false },
      { label: "There is no clear owner of process standardization.", points: 5, disqualify: false },
    ],
  },
  {
    id: 6,
    text: "This program requires an investment of $5,800–$6,000 and 2–3 hours per week of shop-floor work over 12 weeks. How would you describe your readiness?",
    subtext: null,
    options: [
      { label: "We have both the budget and the internal capacity to execute.", points: 10, disqualify: false },
      { label: "We have the budget, but we lack internal capacity.", points: 5, disqualify: false },
      { label: "We have the time, but the budget is currently constrained.", points: 0, disqualify: true },
      { label: "We are not ready to commit at this level.", points: 0, disqualify: true },
    ],
  },
];
