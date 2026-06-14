import { CSSProperties, useState } from "react";

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  const [hovered, setHovered] = useState(false);

  const style: CSSProperties = {
    display: "block",
    width: "100%",
    minHeight: "56px",
    padding: "0 20px",
    borderRadius: 0,
    textAlign: "left",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 200ms ease",
    border: selected
      ? "2px solid #C8873A"
      : hovered
      ? "1px solid #C8873A"
      : "1px solid #2D3139",
    backgroundColor: selected ? "#1A1200" : hovered ? "#22262F" : "#1C1F26",
    color: selected ? "#C8873A" : "#F0EDE8",
  };

  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
    >
      {label}
    </button>
  );
}
