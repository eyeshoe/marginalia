import React from "react";

interface DotGridProps {
  dotSize?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 1.5,
  spacing = 24,
  color = "#E8E6E3",
  opacity = 0.6
}) => {
  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        opacity: opacity,
        zIndex: 0,  // Changed from -1 to 0
        pointerEvents: "none"
      }}
    />
  );
};

export default DotGrid;