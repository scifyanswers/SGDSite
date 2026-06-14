import { motion } from "framer-motion";
import { Question } from "./questions";
import OptionButton from "./OptionButton";

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (label: string) => void;
}

export default function QuestionCard({ question, selectedOption, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        backgroundColor: "#1C1F26",
        padding: "40px",
        borderRadius: 0,
      }}
    >
      <p
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "13px",
          fontWeight: 400,
          color: "#C8873A",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        Q{question.id} / 06
      </p>

      <p
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "28px",
          color: "#F0EDE8",
          lineHeight: 1.15,
          marginTop: "12px",
          marginBottom: 0,
        }}
      >
        {question.text}
      </p>

      {question.subtext && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "#6B7280",
            fontStyle: "italic",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          {question.subtext}
        </p>
      )}

      <fieldset
        style={{
          border: "none",
          padding: 0,
          margin: 0,
          marginTop: "28px",
        }}
      >
        <legend
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {question.text}
        </legend>
        <div
          role="radiogroup"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              label={option.label}
              selected={selectedOption === option.label}
              onClick={() => onSelect(option.label)}
            />
          ))}
        </div>
      </fieldset>
    </motion.div>
  );
}
