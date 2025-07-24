import React from "react";

const Card = ({ children, tilt = -1 }) => (
  <div className="background-shadow" style={{ transform: `rotate(${tilt}deg)` }}>
    {children}
  </div>
);

export default Card; 