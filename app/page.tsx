"use client";
import "../components/ui/base-styles.css";
import React from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  // Ripple effect for buttons
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";
    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  return (
    <>
      <div className="dot-grid" />
      <div className="decoration decoration-1" />
      <div className="decoration decoration-2" />
      <div className="decoration decoration-3" />
      <div className="container">
        <h1>marginalia</h1>
        <p className="tagline">filler text yes yes yes describe this in poignant engaging words</p>
        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={e => { handleRipple(e); setTimeout(() => router.push("/signup"), 200); }}
            aria-label="Sign up"
            type="button"
          >
            SIGN UP
          </button>
          <button
            className="btn btn-secondary"
            onClick={e => { handleRipple(e); setTimeout(() => router.push("/signin"), 200); }}
            aria-label="Log in"
            type="button"
          >
            LOG IN
          </button>
        </div>
      </div>
    </>
  );
} 