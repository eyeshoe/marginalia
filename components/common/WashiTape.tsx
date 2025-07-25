import React from 'react';

interface WashiTapeProps {
  variant?: 'pink' | 'yellow';
  rotation?: number;
  className?: string;
}

export default function WashiTape({ 
  variant = 'pink', 
  rotation = 0,
  className = ''
}: WashiTapeProps) {
  const baseClasses = 'washi-tape absolute';
  const variantClass = variant === 'pink' ? 'washi-pink' : 'washi-yellow';

  return (
    <div 
      className={`${baseClasses} ${variantClass} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}