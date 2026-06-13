import { motion, AnimatePresence } from "framer-motion";
import { Question } from "./questions";
import OptionButton from "./OptionButton";

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  direction: number;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

export default function QuestionCard({ question, selectedIndex, onSelect, direction }: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div style={{ marginBottom: "8px" }}>
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.4,
              marginBottom: question.subtext ? "8px" : "24px",
            }}
          >
            {question.text}
          </p>
          {question.subtext && (
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "24px",
                lineHeight: 1.5,
              }}
            >
              {question.subtext}
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              label={option.label}
              selected={selectedIndex === index}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
