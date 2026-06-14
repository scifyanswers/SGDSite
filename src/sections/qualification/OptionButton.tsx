interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: "56px",
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: "0",
        textAlign: "left",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        transition: "all 200ms ease",
        border: selected ? "2px solid #C8873A" : "1px solid #2D3139",
        backgroundColor: selected ? "#1A1200" : "#1C1F26",
        color: selected ? "#C8873A" : "#F0EDE8",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#C8873A";
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#22262F";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#2D3139";
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1C1F26";
        }
      }}
    >
      {label}
    </button>
  );
}
