import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "./questions";
import { scoreLead, LeadTier } from "./scoring";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import ScoreResult from "./ScoreResult";

type Phase = "intro" | "quiz" | "result";

interface AnswerEntry {
  questionId: number;
  label: string;
}

interface EvalResult {
  tier: LeadTier;
  totalPoints: number;
  answers: AnswerEntry[];
}

function evaluate(labelAnswers: Record<number, string>): EvalResult {
  let totalPoints = 0;
  let hasDisqualifier = false;
  const answers: AnswerEntry[] = [];

  for (const question of questions) {
    const selectedLabel = labelAnswers[question.id];
    if (selectedLabel !== undefined) {
      const option = question.options.find((o) => o.label === selectedLabel);
      if (option) {
        totalPoints += option.points;
        if (option.disqualify) hasDisqualifier = true;
        answers.push({ questionId: question.id, label: selectedLabel });
      }
    }
  }

  return { tier: scoreLead(totalPoints, hasDisqualifier), totalPoints, answers };
}

export default function QualificationSection() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<EvalResult | null>(null);

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion?.id] ?? null;
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  function handleSelect(label: string) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: label }));
  }

  function handleNext() {
    if (selectedOption === null) return;
    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    if (isLastQuestion) {
      setResult(evaluate(updatedAnswers));
      setPhase("result");
    } else {
      setAnswers(updatedAnswers);
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (currentIndex === 0) {
      setPhase("intro");
      return;
    }
    setCurrentIndex((i) => i - 1);
  }

  function handleRetake() {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setPhase("intro");
  }

  return (
    <section
      style={{
        backgroundColor: "#0F1B27",
        padding: "80px 24px",
        fontFamily: "'Inter', 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#BF9F5A",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            First-Pass Precision System
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            Is Your Shop a Fit?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Answer six questions about your operation and we'll tell you honestly whether this program will deliver measurable ROI for your shop.
          </p>
        </div>

        {/* Card */}
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "clamp(24px, 4vw, 40px)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 32px 80px -20px rgba(0,0,0,0.6)",
            }}
          >
            <AnimatePresence mode="wait">
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "14px",
                        backgroundColor: "rgba(191,159,90,0.12)",
                        border: "1px solid rgba(191,159,90,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#BF9F5A" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>
                      Takes less than 3 minutes
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: "28px" }}>
                      Six questions about your shop's size, complexity, and readiness. We'll score your answers and give you a straight answer on fit.
                    </p>
                    <ul style={{ textAlign: "left", listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        "6 multiple-choice questions",
                        "Instant result with specific next step",
                        "No email required to see your result",
                      ].map((item) => (
                        <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
                          <span style={{ color: "#BF9F5A", flexShrink: 0 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setPhase("quiz")}
                      style={{
                        width: "100%",
                        padding: "14px 24px",
                        borderRadius: "12px",
                        backgroundColor: "#BF9F5A",
                        color: "#0F1B27",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        border: "none",
                        cursor: "pointer",
                        transition: "filter 0.15s ease",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)")}
                    >
                      Start the Assessment
                    </button>
                  </div>
                </motion.div>
              )}

              {phase === "quiz" && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ marginBottom: "28px" }}>
                    <ProgressBar currentStep={currentIndex + 1} totalSteps={questions.length} />
                  </div>

                  <QuestionCard
                    question={currentQuestion}
                    selectedOption={selectedOption}
                    onSelect={handleSelect}
                  />

                  <div style={{ display: "flex", gap: "10px", marginTop: "28px" }}>
                    <button
                      onClick={handleBack}
                      style={{
                        flex: "0 0 auto",
                        padding: "13px 18px",
                        borderRadius: "12px",
                        backgroundColor: "transparent",
                        border: "1.5px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.55)",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        transition: "color 0.15s, border-color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={selectedOption === null}
                      style={{
                        flex: 1,
                        padding: "13px 24px",
                        borderRadius: "12px",
                        backgroundColor: selectedOption !== null ? "#BF9F5A" : "rgba(255,255,255,0.08)",
                        color: selectedOption !== null ? "#0F1B27" : "rgba(255,255,255,0.3)",
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        border: "none",
                        cursor: selectedOption !== null ? "pointer" : "not-allowed",
                        transition: "background-color 0.2s ease, color 0.2s ease, filter 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedOption !== null) (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
                      }}
                    >
                      {isLastQuestion ? "See My Results" : "Next Question"}
                    </button>
                  </div>

                  {answeredCount > 0 && answeredCount < questions.length && (
                    <p style={{ textAlign: "center", marginTop: "14px", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                      {questions.length - answeredCount} question{questions.length - answeredCount !== 1 ? "s" : ""} remaining
                    </p>
                  )}
                </motion.div>
              )}

              {phase === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <ScoreResult
                    tier={result.tier}
                    totalPoints={result.totalPoints}
                    answers={result.answers}
                  />
                  <button
                    onClick={handleRetake}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      padding: "11px 24px",
                      borderRadius: "12px",
                      backgroundColor: "transparent",
                      border: "1.5px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      marginTop: "12px",
                      transition: "color 0.15s ease, border-color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                  >
                    Retake the assessment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
