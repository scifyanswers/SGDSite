import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "./questions";
import { scoreLead, LeadTier } from "./scoring";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import ScoreResult from "./ScoreResult";

type Phase = "intro" | "quiz" | "result";

interface EvalResult {
  tier: LeadTier;
  totalPoints: number;
}

function evaluate(answers: Record<number, string>): EvalResult {
  let totalPoints = 0;
  let hasDisqualifier = false;

  for (const question of questions) {
    const selectedLabel = answers[question.id];
    if (selectedLabel) {
      const option = question.options.find((o) => o.label === selectedLabel);
      if (option) {
        totalPoints += option.points;
        if (option.disqualify) hasDisqualifier = true;
      }
    }
  }

  return { tier: scoreLead(totalPoints, hasDisqualifier), totalPoints };
}

export default function QualificationSection() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<EvalResult | null>(null);

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion?.id] ?? null;
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleSelect(label: string) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: label }));
  }

  function handleNext() {
    if (!selectedOption) return;
    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    if (isLastQuestion) {
      setResult(evaluate(updatedAnswers));
      setAnswers(updatedAnswers);
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

  const answersArray = questions
    .filter((q) => answers[q.id] !== undefined)
    .map((q) => ({ questionId: q.id, label: answers[q.id] }));

  return (
    <section
      style={{
        backgroundColor: "#0F1B27",
        padding: "72px 24px 96px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "#C8873A",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "10px",
            }}
          >
            First-Pass Precision System
          </p>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#F0EDE8",
              lineHeight: 1.1,
              marginBottom: "12px",
            }}
          >
            Is Your Shop a Fit?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#6B7280",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Six questions. We'll score your operation and give you a direct answer on whether this program will deliver ROI for your shop.
          </p>
        </div>

        {/* Content area */}
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <AnimatePresence mode="wait">

            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  backgroundColor: "#1C1F26",
                  padding: "40px",
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {[
                    "6 multiple-choice questions",
                    "Instant result with specific next step",
                    "No email required to see your score",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        color: "#F0EDE8",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#C8873A",
                          borderRadius: "50%",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPhase("quiz")}
                  style={{
                    width: "100%",
                    height: "52px",
                    backgroundColor: "#C8873A",
                    color: "#F0EDE8",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    border: "none",
                    borderRadius: 0,
                    cursor: "pointer",
                  }}
                >
                  Start the Assessment
                </button>
              </motion.div>
            )}

            {phase === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ marginBottom: "24px" }}>
                  <ProgressBar
                    currentStep={currentIndex + 1}
                    totalSteps={questions.length}
                  />
                </div>

                <QuestionCard
                  question={currentQuestion}
                  selectedOption={selectedOption}
                  onSelect={handleSelect}
                />

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "16px",
                  }}
                >
                  <button
                    onClick={handleBack}
                    style={{
                      flex: "0 0 auto",
                      height: "52px",
                      padding: "0 20px",
                      backgroundColor: "transparent",
                      border: "1px solid #2D3139",
                      color: "#6B7280",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      cursor: "pointer",
                      borderRadius: 0,
                      transition: "border-color 200ms ease, color 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#C8873A";
                      (e.currentTarget as HTMLButtonElement).style.color = "#F0EDE8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#2D3139";
                      (e.currentTarget as HTMLButtonElement).style.color = "#6B7280";
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    style={{
                      flex: 1,
                      height: "52px",
                      backgroundColor: selectedOption ? "#C8873A" : "#2D3139",
                      color: selectedOption ? "#F0EDE8" : "#6B7280",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      border: "none",
                      borderRadius: 0,
                      cursor: selectedOption ? "pointer" : "not-allowed",
                      transition: "background-color 200ms ease, color 200ms ease",
                    }}
                  >
                    {isLastQuestion ? "See My Results" : "Next Question"}
                  </button>
                </div>
              </motion.div>
            )}

            {phase === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ScoreResult
                  tier={result.tier}
                  totalPoints={result.totalPoints}
                  answers={answersArray}
                  onRetake={handleRetake}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
