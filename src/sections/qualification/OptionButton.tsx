import { motion } from "framer-motion";

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "14px 18px",
        borderRadius: "12px",
        border: selected ? "1.5px solid #BF9F5A" : "1.5px solid rgba(255,255,255,0.12)",
        backgroundColor: selected ? "rgba(191,159,90,0.12)" : "rgba(255,255,255,0.04)",
        color: selected ? "#fff" : "rgba(255,255,255,0.75)",
        fontSize: "0.9375rem",
        fontWeight: selected ? 600 : 400,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: selected ? "2px solid #BF9F5A" : "2px solid rgba(255,255,255,0.25)",
          backgroundColor: selected ? "#BF9F5A" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#0F1B27" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </motion.button>
  );
}
