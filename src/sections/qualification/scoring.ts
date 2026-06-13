import { questions } from "./questions";

export type FitTier = "strong" | "likely" | "partial" | "unclear";

export interface ScoreResult {
  raw: number;
  max: number;
  percentage: number;
  tier: FitTier;
  headline: string;
  body: string;
  cta: string;
}

const MAX_SCORE = questions.reduce((sum, q) => {
  const best = Math.max(...q.options.map((o) => o.score));
  return sum + best;
}, 0);

export function calculateScore(answers: Record<string, string>): ScoreResult {
  let raw = 0;

  for (const question of questions) {
    const selectedId = answers[question.id];
    if (selectedId) {
      const option = question.options.find((o) => o.id === selectedId);
      if (option) raw += option.score;
    }
  }

  const percentage = Math.round((raw / MAX_SCORE) * 100);

  let tier: FitTier;
  let headline: string;
  let body: string;
  let cta: string;

  if (percentage >= 80) {
    tier = "strong";
    headline = "Strong Fit — Let's Talk";
    body =
      "Your situation aligns closely with the work we do. You have an active, well-defined challenge and the context for hands-on engineering support to make a measurable difference quickly.";
    cta = "Submit the Technical Intake";
  } else if (percentage >= 60) {
    tier = "likely";
    headline = "Likely a Good Fit";
    body =
      "There's meaningful overlap between your challenge and our expertise. A brief intake conversation will help confirm scope and determine the right engagement structure.";
    cta = "Complete the Intake Form";
  } else if (percentage >= 40) {
    tier = "partial";
    headline = "Partial Fit — Worth a Conversation";
    body =
      "Some aspects of your situation align with our work, but we'd want to understand more before committing either side's time. Reach out directly and we'll be candid about fit.";
    cta = "Send a Direct Email";
  } else {
    tier = "unclear";
    headline = "Unclear Fit at This Stage";
    body =
      "Based on your responses, it's not immediately clear that we're the right match — but manufacturing challenges can be complex. If something resonated, reach out and explain your situation.";
    cta = "Reach Out Directly";
  }

  return { raw, max: MAX_SCORE, percentage, tier, headline, body, cta };
}
