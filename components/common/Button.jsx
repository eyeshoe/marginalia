import React from "react";

const Button = ({
  children,
  variant = "primary",
  loading = false,
  type = "button",
  ...props
}) => (
  <button
    className={`button${variant === "secondary" ? " button-secondary" : ""}${loading ? " loading" : ""}`}
    type={type}
    disabled={loading}
    {...props}
  >
    {loading ? <span className="loading-spinner" /> : <div className="div">{children}</div>}
  </button>
);

export default Button; 