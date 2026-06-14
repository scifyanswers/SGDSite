import { useState } from "react";
import { motion } from "framer-motion";
import { LeadTier, tierConfig } from "./scoring";

interface AnswerSummary {
  questionId: number;
  label: string;
}

interface ScoreResultProps {
  tier: LeadTier;
  totalPoints: number;
  answers: AnswerSummary[];
  onRetake: () => void;
}

export default function ScoreResult({ tier, totalPoints, answers, onRetake }: ScoreResultProps) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const cfg = tierConfig[tier];

  if (totalPoints === 0 && answers.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#1C1F26",
          padding: "40px",
          borderRadius: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "#6B7280",
          }}
        >
          Something went wrong. Please refresh and try again.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        backgroundColor: "#1C1F26",
        padding: "40px",
        borderRadius: 0,
      }}
    >
      {/* Score readout */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "48px",
          fontWeight: 400,
          color: "#C8873A",
          margin: 0,
          lineHeight: 1,
        }}
      >
        {totalPoints} / 57 pts
      </p>

      {/* Tier headline */}
      <p
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "36px",
          color: cfg.color,
          margin: "16px 0 0",
          lineHeight: 1.15,
        }}
      >
        {cfg.headline}
      </p>

      {/* Body copy */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: "#F0EDE8",
          maxWidth: "540px",
          lineHeight: 1.6,
          marginTop: "16px",
          marginBottom: 0,
        }}
      >
        {cfg.body}
      </p>

      {/* CTA */}
      <a
        href={cfg.cta_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "52px",
          backgroundColor: cfg.color,
          color: "#F0EDE8",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          textDecoration: "none",
          borderRadius: 0,
          marginTop: "32px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {cfg.cta_label}
      </a>

      {/* Answer summary accordion */}
      {answers.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <button
            onClick={() => setAccordionOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "#6B7280",
              textDecoration: "underline",
            }}
          >
            {accordionOpen ? "Hide your answers" : "Review your answers"}
          </button>

          {accordionOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "14px",
              }}
            >
              {answers.map(({ questionId, label }) => (
                <p
                  key={questionId}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  Q{questionId} — {label}
                </p>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Retake */}
      <button
        onClick={onRetake}
        style={{
          display: "block",
          marginTop: "20px",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          color: "#6B7280",
          textDecoration: "underline",
        }}
      >
        Retake the assessment
      </button>
    </motion.div>
  );
}
