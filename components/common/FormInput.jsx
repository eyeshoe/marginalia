import React from "react";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  helperText,
  ...props
}) => (
  <div className="form-field">
    {label && <label className={`label-${name}`}>{label}</label>}
    <div className={`input-wrapper ${error ? "error" : ""}`}>
      <input
        className="container"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default FormInput; 