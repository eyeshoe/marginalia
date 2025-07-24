"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  React.useEffect(() => {
    document.body.style.background = "#F5F5F5";
    return () => { document.body.style.background = ""; };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F5F5",
      }}
    >
      <section
        aria-label="Welcome to Marginalia"
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#FEFDFB",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "2.5rem 2rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: 0,
          animation: "fadeIn 1s ease forwards",
        }}
      >
        <h1
          style={{
            fontFamily: 'serif',
            fontWeight: 700,
            fontSize: 24,
            color: "#222",
            margin: 0,
            textTransform: "lowercase",
            letterSpacing: 1,
          }}
        >
          marginalia
        </h1>
        <p
          style={{
            fontSize: 12,
            color: "#888",
            margin: "0.5rem 0 2.5rem 0",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          filler text yes yes yes describe this in poignant engaging words
        </p>
        <button
          style={{
            width: "100%",
            padding: "0.75rem 0",
            background: "#E8B4B8",
            color: "#222",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 16,
            transition: "background 0.2s",
          }}
          onClick={() => router.push("/signup")}
          aria-label="Get Started"
        >
          Get Started
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#555",
            fontSize: 15,
            textDecoration: "underline",
            cursor: "pointer",
            width: "100%",
            textAlign: "center",
          }}
          onClick={() => router.push("/signin")}
          aria-label="Log in"
        >
          Log in
        </button>
      </section>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 500px) {
          section[aria-label="Welcome to Marginalia"] {
            max-width: 95vw;
            padding: 2rem 0.5rem 1.5rem 0.5rem;
          }
        }
      `}</style>
    </main>
  );
} 