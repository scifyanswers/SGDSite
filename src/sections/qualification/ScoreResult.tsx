import { useState } from "react";
import { motion } from "framer-motion";
import { LeadTier, tierConfig } from "./scoring";

interface AnswerEntry {
  questionId: number;
  label: string;
}

interface ScoreResultProps {
  tier: LeadTier;
  totalPoints: number;
  answers: AnswerEntry[];
}

export default function ScoreResult({ tier, totalPoints, answers }: ScoreResultProps) {
  const [reviewOpen, setReviewOpen] = useState(false);

  if (answers.length === 0) {
    return (
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          color: "#6B7280",
        }}
      >
        Something went wrong. Please refresh and try again.
      </p>
    );
  }

  const cfg = tierConfig[tier];

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: "#1C1F26",
        padding: "40px",
        borderRadius: "0",
      }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "48px",
          color: "#C8873A",
          lineHeight: 1,
        }}
      >
        {totalPoints} / 57 pts
      </p>

      <p
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "36px",
          color: cfg.color,
          marginTop: "16px",
        }}
      >
        {cfg.headline}
      </p>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: "#F0EDE8",
          lineHeight: 1.6,
          maxWidth: "540px",
          marginTop: "16px",
        }}
      >
        {cfg.body}
      </p>

      <a
        href={cfg.cta_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cfg.cta_label} — ${tier} tier`}
        style={{
          display: "block",
          width: "100%",
          height: "52px",
          lineHeight: "52px",
          textAlign: "center",
          borderRadius: "0",
          backgroundColor: cfg.color,
          color: "#F0EDE8",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: "18px",
          textDecoration: "none",
          marginTop: "32px",
        }}
      >
        {cfg.cta_label}
      </a>

      <button
        onClick={() => setReviewOpen((v) => !v)}
        style={{
          display: "block",
          background: "none",
          border: "none",
          padding: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#6B7280",
          textDecoration: "underline",
          cursor: "pointer",
          marginTop: "24px",
        }}
      >
        {reviewOpen ? "Hide your answers" : "Review your answers"}
      </button>

      {reviewOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
          {answers.map((a) => (
            <span
              key={a.questionId}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                color: "#6B7280",
              }}
            >
              Q{a.questionId} — {a.label}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
