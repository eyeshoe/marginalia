import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}

const initialState: FormData = { name: "", email: "", username: "", password: "" };

// Simple validation function (we'll move this here for now)
const validateSignUp = (form: FormData) => {
  const errors: FormErrors = {};
  
  if (!form.name || form.name.length < 2) {
    errors.name = 'Name is required (2+ letters)';
  }
  
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!form.username || form.username.length < 3) {
    errors.username = 'Username is required (3+ chars)';
  }
  
  if (!form.password || form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return { valid: Object.keys(errors).length === 0, errors };
};

// Simple password strength hook
const usePasswordStrength = (password: string): number => {
  let strength = 0;
  if (!password) return 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength;
};

const SignUpForm: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const passwordStrength = usePasswordStrength(form.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const validation = validateSignUp(form);
    setErrors(validation.errors);
    if (!validation.valid) return;
    
    setLoading(true);
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setForm(initialState);
    } catch (err: any) {
      setApiError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-shadow">
      {/* Washi tape */}
      <div className="gradient" />
      <div className="gradient-2" />
      
      <div className="overlap-group">
        <div className="heading-join">join marginalia</div>
        <div className="text-wrapper">where thoughts find their margins</div>
      </div>
      
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Name field */}
        <div className="form-field">
          <label>What should we call you?</label>
          <div className={`input-wrapper ${errors.name ? "error" : ""}`}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="enter name"
              required
            />
          </div>
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        {/* Email field */}
        <div className="form-field">
          <label>Email address</label>
          <div className={`input-wrapper ${errors.email ? "error" : ""}`}>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        {/* Username field */}
        <div className="form-field">
          <label>Username</label>
          <div className={`input-wrapper ${errors.username ? "error" : ""}`}>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="username"
              required
            />
          </div>
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        
        {/* Password field */}
        <div className="overlap-2">
          <div className="form-field">
            <label>Password</label>
            <div className={`input-wrapper ${errors.password ? "error" : ""}`}>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Make it memorable!"
                required
              />
            </div>
            <span className="helper-text">8+ characters</span>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="password-strength">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`strength-bar${passwordStrength > i ? " active" : ""}`}
                style={passwordStrength > i ? { 
                  backgroundColor: ["#F2C4CE", "#F5E6A3", "#B5C7D9", "#90C695"][passwordStrength - 1] 
                } : {}}
              />
            ))}
          </div>
        </div>
        
        {apiError && <div className="api-error">{apiError}</div>}
        {success && <div className="success-message">Account created! Check your email.</div>}
        
        <button type="submit" disabled={loading} className={`button ${loading ? "loading" : ""}`}>
          {loading && <span className="loading-spinner" />}
          <span style={{ opacity: loading ? 0 : 1 }}>Create Account</span>
        </button>
      </form>
      
      <div className="overlap">
        <div className="horizontal-divider"></div>
        <div className="text-wrapper-2">Already have an account?</div>
        <a href="/login" className="link-sign-in">Sign in</a>
      </div>
    </div>
  );
};

export default SignUpForm;