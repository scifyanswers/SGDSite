interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span style={{ fontSize: "0.75rem", color: "#BF9F5A", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Question {current} of {total}
        </span>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
          {pct}% complete
        </span>
      </div>
      <div style={{ height: "4px", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: "9999px",
            backgroundColor: "#BF9F5A",
            width: `${pct}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}
