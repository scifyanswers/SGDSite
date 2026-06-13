import { motion } from "framer-motion";
import { LeadTier, tierConfig } from "./scoring";

interface ScoreResultProps {
  tier: LeadTier;
  totalPoints: number;
  onRetake: () => void;
}

const tierVisuals: Record<LeadTier, { bg: string; border: string; badge: string }> = {
  HIGH: {
    bg: "rgba(45,106,79,0.12)",
    border: "rgba(45,106,79,0.4)",
    badge: "Strong Fit",
  },
  STANDARD: {
    bg: "rgba(146,64,14,0.12)",
    border: "rgba(146,64,14,0.4)",
    badge: "Possible Fit",
  },
  LOW: {
    bg: "rgba(107,114,128,0.12)",
    border: "rgba(107,114,128,0.3)",
    badge: "Not Yet",
  },
  DISQUALIFIED: {
    bg: "rgba(127,29,29,0.12)",
    border: "rgba(127,29,29,0.35)",
    badge: "Not a Fit",
  },
};

export default function ScoreResult({ tier, totalPoints, onRetake }: ScoreResultProps) {
  const cfg = tierConfig[tier];
  const vis = tierVisuals[tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Tier indicator */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              border: `3px solid ${cfg.color}`,
              backgroundColor: vis.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: cfg.color, lineHeight: 1 }}>
              {totalPoints}
            </span>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              pts
            </span>
          </div>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: cfg.color,
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              padding: "3px 12px",
              borderRadius: "9999px",
              border: `1px solid ${vis.border}`,
              backgroundColor: vis.bg,
            }}
          >
            {vis.badge}
          </span>
        </div>
      </div>

      {/* Headline + body */}
      <div
        style={{
          backgroundColor: vis.bg,
          border: `1px solid ${vis.border}`,
          borderRadius: "14px",
          padding: "20px 22px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
          {cfg.headline}
        </p>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
          {cfg.body}
        </p>
      </div>

      {/* CTA */}
      <a
        href={cfg.cta_url}
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "14px 24px",
          borderRadius: "12px",
          backgroundColor: cfg.color,
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.9375rem",
          textDecoration: "none",
          marginBottom: "12px",
          transition: "filter 0.15s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.12)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1)")}
      >
        {cfg.cta_label}
      </a>

      <button
        onClick={onRetake}
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
  );
}
