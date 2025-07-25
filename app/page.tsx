"use client";
import "./landing-page.css";
import React from "react";
import { useRouter } from "next/navigation";
import DotGrid from "../components/common/DotGrid";  

export default function WelcomePage() {
  const router = useRouter();

  return (
    <>
      {/* Default dot grid - same as before */}
      <DotGrid />
      
      <div className="landing-container">
        <h1>marginalia</h1>
        <p className="landing-tagline">
          filler text yes yes yes describe this in poignant engaging words
        </p>
        
        <div className="landing-buttons">
          <button
            className="landing-btn-primary"
            onClick={() => router.push("/signup")}
            aria-label="Sign Up"
          >
            SIGN UP
          </button>
          <button
            className="landing-btn-secondary"
            onClick={() => router.push("/signin")}
            aria-label="Log In"
          >
            LOG IN
          </button>
        </div>
      </div>
    </>
  );
}