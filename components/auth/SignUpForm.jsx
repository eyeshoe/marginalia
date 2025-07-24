import React, { useState } from "react";
import DotGrid from "../common/DotGrid";
import Card from "../common/Card";
import WashiTape from "../common/WashiTape";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import { authAPI } from "../../services/api/auth";
import { validateSignUp } from "../../services/validation/authValidation";
import usePasswordStrength from "../../hooks/usePasswordStrength";

const initialState = { name: "", email: "", username: "", password: "" };

const SignUpForm = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const passwordStrength = usePasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const validation = validateSignUp(form);
    setErrors(validation.errors);
    if (!validation.valid) return;
    setLoading(true);
    try {
      await authAPI.signup(form);
      setSuccess(true);
      setForm(initialState);
    } catch (err) {
      setApiError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DotGrid />
      <div className="container">
        <Card>
          <WashiTape variant="pink" />
          <WashiTape variant="yellow" />
          <div className="overlap-group">
            <div className="heading-join">join marginalia</div>
            <div className="text-wrapper">where thoughts find their margins</div>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <FormInput
              label="What should we call you?"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="enter name"
              required
            />
            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              required
            />
            <FormInput
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="username"
              required
            />
            <div className="overlap-2">
              <FormInput
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Make it memorable!"
                required
                helperText="8+ characters"
              />
              <div className="password-strength">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`strength-bar${passwordStrength > i ? " active" : ""}`}
                    style={passwordStrength > i ? { backgroundColor: ["#F2C4CE", "#F5E6A3", "#B5C7D9", "#C5D9C0"][passwordStrength - 1] } : {}}
                  />
                ))}
              </div>
            </div>
            {apiError && <span className="error-message">{apiError}</span>}
            {success && <span style={{ color: '#C5D9C0', fontWeight: 600 }}>Account created! Check your email.</span>}
            <Button type="submit" loading={loading}>
              Create Account
            </Button>
          </form>
          <div className="overlap">
            <div className="horizontal-divider"></div>
            <div className="text-wrapper-2">Already have an account?</div>
            <a href="/login" className="link-sign-in">Sign in</a>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SignUpForm; 