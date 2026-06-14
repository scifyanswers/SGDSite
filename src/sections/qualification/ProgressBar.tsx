import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const pct = (currentStep / totalSteps) * 100;

  return (
    <div
      aria-label={`Question ${currentStep} of ${totalSteps}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      <div
        style={{
          height: "4px",
          width: "100%",
          backgroundColor: "#2D3139",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ width: `${pct}%` }}
          initial={{ width: "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            backgroundColor: "#C8873A",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#6B7280",
            letterSpacing: "0.02em",
          }}
        >
          Question {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
