"use client";
import "./signup.css";
import React from "react";
import DotGrid from "../../components/common/DotGrid";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <DotGrid />
      <div className="signup-container">
        <SignUpForm />
      </div>
    </>
  );
}