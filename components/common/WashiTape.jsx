import React from "react";

const WashiTape = ({ variant = "pink" }) => {
  if (variant === "yellow") {
    return <div className="gradient-2" />;
  }
  return <div className="gradient" />;
};

export default WashiTape; 