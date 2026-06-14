import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LeadTier, tierConfig } from "./scoring";

interface ResourceModalProps {
  tier: LeadTier;
  onClose: () => void;
}

export default function ResourceModal({ tier, onClose }: ResourceModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cfg = tierConfig[tier];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
    window.open("/First_Pass_CNC_Tolerance_Short_Ebook.pdf", "_blank", "noopener,noreferrer");
  }

  return (
    <motion.div
      ref={overlayRef}
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-label="Download free resource"
        style={{
          backgroundColor: "#1C1F26",
          border: "1px solid #2D3139",
          borderRadius: "0",
          width: "100%",
          maxWidth: "460px",
          padding: "40px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6B7280",
            padding: "4px",
            lineHeight: 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: cfg.color,
                marginBottom: "12px",
              }}
            >
              Free Resource
            </p>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                color: "#F0EDE8",
                lineHeight: 1.15,
                marginBottom: "8px",
              }}
            >
              Where to send your download?
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#6B7280",
                lineHeight: 1.6,
                marginBottom: "28px",
              }}
            >
              Enter your details and we'll open the resource for you right away.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label
                    htmlFor="resource-name"
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "6px",
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="resource-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 16px",
                      backgroundColor: "#0F1117",
                      border: "1px solid #2D3139",
                      borderRadius: "0",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      color: "#F0EDE8",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#C8873A")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#2D3139")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="resource-email"
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "6px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="resource-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourshop.com"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 16px",
                      backgroundColor: "#0F1117",
                      border: "1px solid #2D3139",
                      borderRadius: "0",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      color: "#F0EDE8",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#C8873A")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#2D3139")}
                  />
                </div>
              </div>

              {error && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    color: "#F87171",
                    marginTop: "12px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                style={{
                  display: "block",
                  width: "100%",
                  height: "52px",
                  marginTop: "24px",
                  backgroundColor: cfg.color,
                  color: "#F0EDE8",
                  border: "none",
                  borderRadius: "0",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "18px",
                  cursor: "pointer",
                  transition: "filter 150ms ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)")}
              >
                Send My Resource
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ textAlign: "center", padding: "16px 0" }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "rgba(45,106,79,0.15)",
                border: "1px solid rgba(45,106,79,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#F0EDE8",
                marginBottom: "8px",
              }}
            >
              Your download is ready.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#6B7280",
                lineHeight: 1.6,
                marginBottom: "28px",
              }}
            >
              The resource should have opened in a new tab. Check your browser if it didn't appear.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#6B7280",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
