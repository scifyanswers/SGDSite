import { motion } from "framer-motion";
import { ScoreResult as ScoreResultType, FitTier } from "./scoring";

interface ScoreResultProps {
  result: ScoreResultType;
  onRetake: () => void;
}

const tierConfig: Record<FitTier, { color: string; bg: string; border: string; badge: string }> = {
  strong: {
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    border: "rgba(74,222,128,0.25)",
    badge: "Strong Fit",
  },
  likely: {
    color: "#BF9F5A",
    bg: "rgba(191,159,90,0.08)",
    border: "rgba(191,159,90,0.3)",
    badge: "Likely Fit",
  },
  partial: {
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.25)",
    badge: "Partial Fit",
  },
  unclear: {
    color: "rgba(255,255,255,0.5)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.12)",
    badge: "Unclear Fit",
  },
};

const ctaHref: Record<FitTier, string> = {
  strong: "#contact",
  likely: "#contact",
  partial: "mailto:sergioj@solidgeardesigns.com",
  unclear: "mailto:sergioj@solidgeardesigns.com",
};

export default function ScoreResult({ result, onRetake }: ScoreResultProps) {
  const cfg = tierConfig[result.tier];
  const href = ctaHref[result.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Score meter */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              border: `3px solid ${cfg.color}`,
              backgroundColor: cfg.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: cfg.color, lineHeight: 1 }}>
              {result.percentage}%
            </span>
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              fit score
            </span>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: cfg.color,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "3px 10px",
              borderRadius: "9999px",
              border: `1px solid ${cfg.border}`,
              backgroundColor: cfg.bg,
            }}
          >
            {cfg.badge}
          </span>
        </div>
      </div>

      {/* Headline + body */}
      <div
        style={{
          backgroundColor: cfg.bg,
          border: `1px solid ${cfg.border}`,
          borderRadius: "14px",
          padding: "20px 22px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
          {result.headline}
        </p>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          {result.body}
        </p>
      </div>

      {/* CTA */}
      <a
        href={href}
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "14px 24px",
          borderRadius: "12px",
          backgroundColor: "#BF9F5A",
          color: "#0F1B27",
          fontWeight: 700,
          fontSize: "0.9375rem",
          textDecoration: "none",
          marginBottom: "12px",
          transition: "filter 0.15s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.08)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1)")}
      >
        {result.cta}
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
