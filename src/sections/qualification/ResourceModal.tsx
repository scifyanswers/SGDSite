import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LeadTier, tierConfig } from "./scoring";

const AIRTABLE_ENDPOINT_FALLBACK = "https://api.airtable.com/v0/appoZcE3LSbmki0aE/Table%201";

// Known disposable / temporary email domains to reject
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "temp-mail.org", "guerrillamail.com", "10minutemail.com",
  "throwam.com", "yopmail.com", "trashmail.com", "fakeinbox.com",
  "maildrop.cc", "sharklasers.com", "guerrillamailblock.com", "grr.la",
  "guerrillamail.info", "guerrillamail.biz", "guerrillamail.de",
  "guerrillamail.net", "guerrillamail.org", "spam4.me", "getairmail.com",
  "dispostable.com", "mailnull.com", "spamgourmet.com", "spamgourmet.net",
  "spamgourmet.org", "spamspot.com", "tempr.email", "discard.email",
  "discardmail.com", "discardmail.de", "spamhereplease.com",
  "hartbot.de", "crap.handcrafted.jp", "objectmail.com", "obobbo.com",
  "mailsac.com", "mailnesia.com", "mytrashmail.com", "trashmail.at",
  "trashmail.io", "trashmail.me", "trashmail.net", "mintemail.com",
  "filzmail.com", "spamfree24.org", "spamfree24.de", "spamfree24.eu",
  "spamfree24.info", "spamfree24.net", "spamfree.eu", "spam.la",
  "getonemail.com", "tempemail.net", "throwam.com", "throwam.net",
  "tempail.com", "tempinbox.com", "tempomail.fr", "temporaryemail.net",
  "throwam.com", "trashdevil.com", "trashdevil.de",
]);

// Specific email addresses and patterns that are obviously fake/placeholder
const BLOCKED_EXACT_EMAILS = new Set([
  "test@test.com", "example@example.com", "abc@abc.com",
  "noemail@noemail.com", "user@user.com", "admin@admin.com",
  "email@email.com", "mail@mail.com", "name@name.com",
  "info@info.com", "none@none.com", "fake@fake.com",
  "hello@hello.com", "foo@foo.com", "bar@bar.com",
]);

// Domains that are clearly placeholder / test domains
const BLOCKED_DOMAINS = new Set([
  "test.com", "example.com", "example.net", "example.org",
  "abc.com", "noemail.com", "nomail.com", "fake.com",
  "notreal.com", "invalid.com", "domain.com",
]);

// Validate email format and quality. Returns an error string or null if valid.
function validateEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();

  // Basic format check: local@domain.tld
  const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!formatRegex.test(email)) {
    return "Please provide a valid business or personal email address. Temporary, fake, or invalid email addresses cannot be accepted and access to this resource will remain locked until a valid email is provided.";
  }

  const [, domain] = email.split("@");

  // Reject domains without at least one dot (no TLD)
  if (!domain.includes(".")) {
    return "Please provide a valid business or personal email address. Temporary, fake, or invalid email addresses cannot be accepted and access to this resource will remain locked until a valid email is provided.";
  }

  // Reject exact blocked emails
  if (BLOCKED_EXACT_EMAILS.has(email)) {
    return "Please provide a valid business or personal email address. Temporary, fake, or invalid email addresses cannot be accepted and access to this resource will remain locked until a valid email is provided.";
  }

  // Reject placeholder/test domains
  if (BLOCKED_DOMAINS.has(domain)) {
    return "Please provide a valid business or personal email address. Temporary, fake, or invalid email addresses cannot be accepted and access to this resource will remain locked until a valid email is provided.";
  }

  // Reject disposable email service domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return "Please provide a valid business or personal email address. Temporary, fake, or invalid email addresses cannot be accepted and access to this resource will remain locked until a valid email is provided.";
  }

  // Reject local parts that look like placeholders (e.g. "test", "abc", "noemail", "user")
  const [local] = email.split("@");
  const suspiciousLocals = new Set([
    "test", "abc", "noemail", "nomail", "fakeemail", "fake",
    "none", "null", "undefined", "user", "admin", "info",
    "hello", "foo", "bar", "name", "email", "mail",
  ]);
  if (suspiciousLocals.has(local) && BLOCKED_DOMAINS.has(domain)) {
    return "Please provide a valid business or personal email address. Temporary, fake, or invalid email addresses cannot be accepted and access to this resource will remain locked until a valid email is provided.";
  }

  // Check TLD has at least 2 characters
  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2) {
    return "Please provide a valid business or personal email address. Temporary, fake, or invalid email addresses cannot be accepted and access to this resource will remain locked until a valid email is provided.";
  }

  return null;
}

interface ResourceModalProps {
  tier: LeadTier;
  onClose: () => void;
}

export default function ResourceModal({ tier, onClose }: ResourceModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
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

  // Clear email error as the user types so they get immediate feedback when fixed
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (emailError) {
      const err = validateEmail(e.target.value);
      if (!err) setEmailError(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGeneralError(null);
    setNameError(null);
    setEmailError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // Validate name
    if (!trimmedName || trimmedName.length < 2) {
      setNameError("Please enter your full name (at least 2 characters).");
      return;
    }

    // Validate email — must pass before any resource access
    const emailValidationError = validateEmail(trimmedEmail);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      // Set focus back to the email field
      setTimeout(() => emailInputRef.current?.focus(), 0);
      return;
    }

    setIsSubmitting(true);

    try {
      const airtableEndpoint = import.meta.env.VITE_AIRTABLE_ENDPOINT || AIRTABLE_ENDPOINT_FALLBACK;
      const airtableToken = import.meta.env.VITE_AIRTABLE_TOKEN;

      if (!airtableToken) {
        throw new Error("Airtable configuration is missing. Please contact support.");
      }

      const payload = {
        records: [
          {
            fields: {
              "Your name": trimmedName,
              "Work email": trimmedEmail,
            },
          },
        ],
      };

      const response = await fetch(airtableEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { error: { message: responseText } };
      }

      if (!response.ok) {
        const errorMsg = result?.error?.message || result?.error || "Failed to submit";
        throw new Error(errorMsg);
      }

      // Only reveal/deliver the resource after successful submission with a valid email
      setSubmitted(true);
      window.open("/First_Pass_CNC_Tolerance_Short_Ebook.pdf", "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Resource modal submission error:", err);
      const msg = err instanceof Error ? err.message : "An error occurred";
      setGeneralError(`Unable to submit: ${msg}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const emailHasError = !!emailError;

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
                {/* Name field */}
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
                    onChange={(e) => { setName(e.target.value); if (nameError) setNameError(null); }}
                    placeholder="Your full name"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 16px",
                      backgroundColor: "#0F1117",
                      border: `1px solid ${nameError ? "#EF4444" : "#2D3139"}`,
                      borderRadius: "0",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      color: "#F0EDE8",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease",
                    }}
                    onFocus={(e) => { if (!nameError) e.currentTarget.style.borderColor = "#C8873A"; }}
                    onBlur={(e) => { if (!nameError) e.currentTarget.style.borderColor = "#2D3139"; }}
                  />
                  {nameError && (
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: "#F87171",
                        marginTop: "6px",
                        lineHeight: 1.4,
                      }}
                    >
                      {nameError}
                    </p>
                  )}
                </div>

                {/* Email field */}
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
                    ref={emailInputRef}
                    id="resource-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="you@yourshop.com"
                    aria-invalid={emailHasError}
                    aria-describedby={emailHasError ? "email-error-msg" : undefined}
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 16px",
                      backgroundColor: "#0F1117",
                      border: `1px solid ${emailHasError ? "#EF4444" : "#2D3139"}`,
                      borderRadius: "0",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "15px",
                      color: "#F0EDE8",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease",
                    }}
                    onFocus={(e) => { if (!emailHasError) e.currentTarget.style.borderColor = "#C8873A"; }}
                    onBlur={(e) => { if (!emailHasError) e.currentTarget.style.borderColor = "#2D3139"; }}
                  />
                  {emailHasError && (
                    <p
                      id="email-error-msg"
                      role="alert"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: "#F87171",
                        marginTop: "6px",
                        lineHeight: 1.5,
                      }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              {generalError && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    color: "#F87171",
                    marginTop: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  {generalError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
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
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.6 : 1,
                  transition: "filter 150ms ease, opacity 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)")}
              >
                {isSubmitting ? "Submitting..." : "Send My Resource"}
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
