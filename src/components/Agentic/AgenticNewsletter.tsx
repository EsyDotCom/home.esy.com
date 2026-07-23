"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface AgenticNewsletterProps {
  emailInputRef: React.RefObject<HTMLInputElement | null>;
  handleNewsletterSubmit: (e: React.FormEvent) => void;
  onInputChange: () => void;
  isMobile: boolean;
  isTablet: boolean;
  subscribeStatus?: string;
  errorMessage?: string | null;
}

export default function AgenticNewsletter({
  emailInputRef,
  handleNewsletterSubmit,
  onInputChange,
  isMobile,
  isTablet,
  subscribeStatus = "idle",
  errorMessage = null,
}: AgenticNewsletterProps) {
  const isError = subscribeStatus === "error";
  const isSuccess = subscribeStatus === "success";
  const isLoading = subscribeStatus === "loading";

  return (
    <section
      style={{
        position: "relative",
        paddingTop: isMobile ? "3rem" : isTablet ? "4rem" : "5rem",
        paddingBottom: "0",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: isMobile ? "5%" : "15%",
          width: isMobile ? "150px" : "200px",
          height: isMobile ? "150px" : "200px",
          background:
            "radial-gradient(circle, rgba(0, 168, 150, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: -1,
          filter: isMobile ? "blur(30px)" : "blur(40px)",
        }}
      />

      {/* Newsletter container */}
      <div style={{ width: "100%", margin: "0", padding: "0", position: "relative" }}>
        <div
          style={{
            position: "relative",
            padding: isMobile ? "1.5rem" : isTablet ? "2rem" : "2.5rem",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "0",
            overflow: "hidden",
          }}
        >
          {/* Inner content */}
          <div
            style={{
              position: "relative",
              padding: isMobile
                ? "2rem 1.5rem"
                : isTablet
                  ? "3rem 2.5rem"
                  : "3.5rem 3rem",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 168, 150, 0.1)",
              borderRadius: isMobile ? "8px" : "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {/* Header */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: isMobile ? "2rem" : isTablet ? "2.5rem" : "3rem",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobile ? "48px" : "56px",
                    height: isMobile ? "48px" : "56px",
                    background:
                      "linear-gradient(135deg, rgba(0, 168, 150, 0.08) 0%, rgba(0, 168, 150, 0.04) 100%)",
                    borderRadius: "50%",
                    border: "2px solid rgba(0, 168, 150, 0.15)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span style={{ fontSize: isMobile ? "20px" : "24px" }}>
                    {isSuccess ? "" : "\u{1F4EC}"}
                  </span>
                  {isSuccess && (
                    <CheckCircle2
                      size={isMobile ? 20 : 24}
                      color="#10b981"
                      strokeWidth={2}
                    />
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: isMobile
                      ? "1.75rem"
                      : isTablet
                        ? "2.25rem"
                        : "2.5rem",
                    fontWeight: "300",
                    lineHeight: "1.2",
                    letterSpacing: "-0.025em",
                    marginBottom: "0.75rem",
                    fontFamily: "Literata, Georgia, serif",
                    color: "#0f172a",
                  }}
                >
                  {isSuccess ? "You\u2019re in!" : "The Agentic Engineer"}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: isMobile ? "0.875rem" : "0.9375rem",
                    color: "rgba(15, 23, 42, 0.7)",
                    margin: "0 auto 1.5rem auto",
                    maxWidth: isMobile ? "100%" : "520px",
                    lineHeight: "1.6",
                  }}
                >
                  {isSuccess
                    ? "Check your inbox for a welcome email. If you don\u2019t see it, check your spam or promotions folder and mark us as safe."
                    : "One agentic workflow per week: the output first, then the system design behind it, the business it serves, and the engineering depth to build it yourself."}
                </p>

                {/* Trust indicators */}
                {!isSuccess && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      fontSize: "0.75rem",
                      color: "rgba(15, 23, 42, 0.6)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        background: "rgba(0, 168, 150, 0.04)",
                        borderRadius: "20px",
                        border: "1px solid rgba(0, 168, 150, 0.08)",
                        whiteSpace: "nowrap",
                        color: "rgba(15, 23, 42, 0.7)",
                        fontWeight: "500",
                      }}
                    >
                      Free every week
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        background: "rgba(0, 168, 150, 0.04)",
                        borderRadius: "20px",
                        border: "1px solid rgba(0, 168, 150, 0.08)",
                        whiteSpace: "nowrap",
                        color: "rgba(15, 23, 42, 0.7)",
                        fontWeight: "500",
                      }}
                    >
                      Unsubscribe anytime
                    </span>
                  </div>
                )}
              </div>

              {/* Form */}
              {!isSuccess && (
                <div style={{ width: "100%", maxWidth: "500px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: "1rem",
                      alignItems: "stretch",
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      ref={emailInputRef}
                      onChange={onInputChange}
                      style={{
                        flex: 1,
                        padding: isMobile ? "1rem 1.25rem" : "1rem 1.5rem",
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)",
                        border: isError
                          ? "2px solid #ef4444"
                          : "2px solid rgba(0, 168, 150, 0.1)",
                        borderRadius: "10px",
                        color: "#0f172a",
                        fontSize: "0.9375rem",
                        outline: "none",
                        minHeight: "48px",
                        fontFamily: "inherit",
                        boxShadow: isError
                          ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
                          : "none",
                        transition: "all 0.2s ease",
                      }}
                      onFocus={(e) => {
                        if (!isError) {
                          e.target.style.borderColor = "#00A896";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(0, 168, 150, 0.08)";
                        }
                      }}
                      onBlur={(e) => {
                        if (!isError) {
                          e.target.style.borderColor =
                            "rgba(0, 168, 150, 0.1)";
                          e.target.style.boxShadow = "none";
                        }
                      }}
                    />
                    <button
                      onClick={handleNewsletterSubmit}
                      disabled={isLoading}
                      style={{
                        padding: isMobile
                          ? "1rem 1.5rem"
                          : "1rem 1.75rem",
                        backgroundColor: "#00A896",
                        border: "none",
                        borderRadius: "10px",
                        color: "white",
                        fontSize: isMobile ? "0.875rem" : "0.9375rem",
                        fontWeight: "600",
                        cursor: isLoading ? "default" : "pointer",
                        transition: "all 0.2s ease",
                        minHeight: "48px",
                        whiteSpace: "nowrap",
                        minWidth: isMobile ? "auto" : "180px",
                        opacity: isLoading ? 0.7 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          const target = e.target as HTMLButtonElement;
                          target.style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.transform = "translateY(0)";
                      }}
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>

                  {isError && errorMessage && (
                    <p
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.8125rem",
                        color: "#ef4444",
                        textAlign: "center",
                        lineHeight: "1.4",
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
