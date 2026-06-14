import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const pct = (currentStep / totalSteps) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemax={totalSteps}
      style={{ width: "100%" }}
    >
      <div
        style={{
          height: "4px",
          backgroundColor: "#1C1F26",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            height: "100%",
            backgroundColor: "#C8873A",
            width: `${pct}%`,
          }}
        />
      </div>
      <div style={{ textAlign: "right", marginTop: "6px" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          Question {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
